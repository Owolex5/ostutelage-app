// app/(site)/api/career/apply/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    
    // Extract and validate form fields with TypeScript safety
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || "Not provided";
    const role = formData.get('role')?.toString().trim() || "General Application";
    const experience = formData.get('experience')?.toString().trim();
    const coverLetter = formData.get('coverLetter')?.toString().trim() || "Not provided";
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    if (!name || !email || !resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { 
          message: "Missing required fields: name, email, and resume are required" 
        }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" }, 
        { status: 400 }
      );
    }

    // Validate resume file
    const allowedTypes = [
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    // File size limit: 5MB for resumes
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { 
          message: "Resume file too large. Please upload a file smaller than 5MB" 
        },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { 
          message: "Please upload a PDF or Word document (.doc, .docx) for your resume" 
        },
        { status: 400 }
      );
    }

    // Process resume file as buffer (no temp files)
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resumeFileName = resumeFile.name || `resume-${Date.now()}.pdf`;

    // Determine application type
    const isFaculty = !!experience;
    const applicationType = isFaculty ? 'Faculty' : role;
    const subject = `New ${applicationType} Application: ${name}`;

    // Create transporter (same config as working forms)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      pool: true,
      auth: {
        user: process.env.SMTP_USER, // Brevo SMTP Relay ID
        pass: process.env.SMTP_PASS, // Brevo SMTP Key
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });

    // Verify connection (skip in dev)
    if (process.env.NODE_ENV !== "development") {
      await transporter.verify();
      console.log("Brevo SMTP connection verified for career application");
    }

    // CRITICAL: Use verified sender
    const verifiedSender = "info@ostutelage.tech"; // Must be verified in Brevo

    // HTML escape utility
    const escapeHtml = (unsafe?: string): string => {
      if (typeof unsafe !== 'string') return '';
      return unsafe.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'': '&#39;',
      }[m] || m));
    };

    // Admin notification email
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`, // FIXED: Verified sender
      to: "info@ostutelage.tech",
      replyTo: email, // Allow direct reply to applicant
      subject,
      headers: {
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New ${applicationType} Application</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 15px; margin-bottom: 15px;">
              <p style="color: #6b7280; margin: 0;"><strong>Name:</strong></p>
              <p style="color: #4b5563; margin: 0; font-weight: 500;">${escapeHtml(name)}</p>
              
              <p style="color: #6b7280; margin: 0;"><strong>Email:</strong></p>
              <p style="color: #4b5563; margin: 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              
              <p style="color: #6b7280; margin: 0;"><strong>Phone:</strong></p>
              <p style="color: #4b5563; margin: 0;">${escapeHtml(phone)}</p>
            </div>

            ${isFaculty ? `
              <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 15px;">
                <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">🎓 Faculty Experience</h3>
                <p style="color: #1e3a8a; margin: 0; line-height: 1.5;">${escapeHtml(experience).replace(/\n/g, '<br>')}</p>
              </div>
            ` : `
              <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a; margin-bottom: 15px;">
                <h3 style="color: #166534; margin-top: 0; font-size: 16px;">📋 Application Details</h3>
                <p style="color: #065f46; margin-bottom: 8px;"><strong>Role:</strong> ${escapeHtml(role)}</p>
                ${coverLetter !== "Not provided" ? `
                  <p style="color: #065f46; margin-bottom: 0;"><strong>Cover Letter:</strong><br>${escapeHtml(coverLetter).replace(/\n/g, '<br>')}</p>
                ` : ''}
              </div>
            `}

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #d97706;">
              <strong>📎 Resume Attached:</strong> ${escapeHtml(resumeFileName)}<br>
              <small style="color: #92400e;">Type: ${escapeHtml(resumeFile.type)} | Size: ${(resumeFile.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <em>Application received: ${new Date().toLocaleString()}</em><br>
              Review this candidate's qualifications and resume for the ${applicationType} position.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
            Sent from OsTutelage Academy Careers Portal
          </p>
        </div>
      `,
      attachments: [
        {
          filename: resumeFileName,
          content: buffer, // FIXED: Use buffer directly
          contentType: resumeFile.type,
        },
      ],
    });

    // Auto-reply to applicant
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`, // FIXED: Verified sender
      to: email,
      subject: `Thank You for Your ${applicationType} Application, ${name}!`,
      headers: {
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="text-align: center; margin-bottom: 30px; padding: 30px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; color: white;">
            <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 10px 0;">Welcome to the Team, ${escapeHtml(name)}! 👋</h1>
            <p style="font-size: 16px; margin: 0; opacity: 0.95;">Your ${applicationType} Application Has Been Received</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); margin-bottom: 25px;">
            <h2 style="color: #1e293b; font-size: 22px; margin-bottom: 15px;">🎯 Application Status</h2>
            <div style="background: linear-gradient(90deg, #10b981 0%, #34d399 100%); color: white; padding: 12px 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <strong>✅ Received & Under Review</strong>
            </div>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for applying for the <strong>${escapeHtml(applicationType)} position</strong> at OsTutelage Academy! 
              Our hiring team has received your application and resume. We're excited to review your qualifications.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
              <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">⏱️ Next Steps</h3>
              <ul style="color: #475569; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li><strong>Review:</strong> Our team will review your application within <strong>5-7 business days</strong></li>
                <li><strong>Screening:</strong> Selected candidates will be contacted for interviews</li>
                <li><strong>Timeline:</strong> We'll keep you updated throughout the process</li>
              </ul>
            </div>

            ${isFaculty ? `
              <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; border-left: 4px solid #eab308; margin-bottom: 20px;">
                <h3 style="color: #a16207; margin-top: 0;">🎓 Faculty-Specific Info</h3>
                <p style="color: #a16207; line-height: 1.6;">Your teaching experience and qualifications look promising! We're particularly interested in your background in tech education and curriculum development.</p>
              </div>
            ` : ''}

            <p style="color: #475569; line-height: 1.6;">
              Feel free to <a href="https://ostutelage.tech" style="color: #3b82f6; font-weight: 500;">explore our platform</a> or 
              learn more about our <a href="https://ostutelage.tech/schools" style="color: #3b82f6; font-weight: 500;">educational programs</a>.
            </p>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://wa.me/2349036508361" 
               style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Questions? Chat with Our Team
            </a>
          </div>

          <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
              OsTutelage Academy | Building Tomorrow's Tech Leaders
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              <a href="mailto:info@ostutelage.tech" style="color: #3b82f6;">info@ostutelage.tech</a> | 
              <a href="https://ostutelage.tech" style="color: #3b82f6;">ostutelage.tech</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        message: `Your ${applicationType} application has been submitted successfully! Check your email for confirmation.` 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Career Application Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // Specific error handling
    if (error.code === "EAUTH") {
      return NextResponse.json(
        { message: "Email service authentication failed. Please try again later." },
        { status: 503 }
      );
    }

    if (error.code?.startsWith('E')) {
      return NextResponse.json(
        { message: "Email sending failed. Please try again or contact us directly." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        message: "Failed to process application. Please try again or email us at info@ostutelage.tech",
        ...(process.env.NODE_ENV === 'development' && { 
          error: error instanceof Error ? error.message : String(error) 
        })
      }, 
      { status: 500 }
    );
  }
}