// app/(site)/api/career/write/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// FIXED: Move escapeHtml to top level (before POST function)
const escapeHtml = (unsafe?: string): string => {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m] || m));
};

export async function POST(request: Request) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    
    // Extract and validate form fields
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || "Not provided";
    const experience = formData.get('experience')?.toString().trim();
    const portfolioFile = formData.get('portfolio') as File | null;

    // Validate required fields
    if (!name || !email || !experience || !portfolioFile || portfolioFile.size === 0) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, experience, and portfolio are required" }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Enhanced MIME type mapping with isImage flag
    const fileTypeMap: Record<string, { mime: string; ext: string; isImage: boolean }> = {
      'application/pdf': { mime: 'application/pdf', ext: '.pdf', isImage: false },
      'application/msword': { mime: 'application/msword', ext: '.doc', isImage: false },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { 
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        ext: '.docx', isImage: false 
      },
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': { 
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
        ext: '.pptx', isImage: false 
      },
      'image/jpeg': { mime: 'image/jpeg', ext: '.jpg', isImage: true },
      'image/png': { mime: 'image/png', ext: '.png', isImage: true },
      'image/gif': { mime: 'image/gif', ext: '.gif', isImage: true }
    };

    const fileInfo = fileTypeMap[portfolioFile.type];
    if (!fileInfo) {
      return NextResponse.json(
        { 
          message: "Please upload a PDF, Word document, PowerPoint, or image file (JPEG, PNG, GIF) for your portfolio" 
        },
        { status: 400 }
      );
    }

    // File size limit: 10MB
    const maxFileSize = 10 * 1024 * 1024;
    if (portfolioFile.size > maxFileSize) {
      return NextResponse.json(
        { message: "File size too large. Please upload a file smaller than 10MB" },
        { status: 400 }
      );
    }

    // Process file as buffer
    const bytes = await portfolioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Proper filename with correct extension
    const originalName = portfolioFile.name || `portfolio-${Date.now()}`;
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const portfolioFileName = cleanName.endsWith(fileInfo.ext) 
      ? cleanName 
      : `${cleanName}${fileInfo.ext}`;

    // FIXED: Now escapeHtml is available for subject line
    const subject = `New Writer Application: ${escapeHtml(name)} - ${portfolioFileName}`;

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      pool: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });

    // Skip verify in production to avoid timeouts
    if (process.env.NODE_ENV === "development") {
      await transporter.verify();
      console.log("SMTP connection verified for writer application");
    }

    const verifiedSender = "info@ostutelage.tech";

    // Type-safe attachment configuration
    const createAttachment = (
      fileBuffer: Buffer, 
      fileName: string, 
      mimeType: string, 
      isImage: boolean
    ): nodemailer.AttachmentOptions => {
      const baseConfig: nodemailer.AttachmentOptions = {
        filename: fileName,
        content: fileBuffer,
        contentType: mimeType,
      };

      if (isImage) {
        // Images: inline disposition (email clients auto-display)
        return {
          ...baseConfig,
          disposition: 'inline',
        };
      } else {
        // Documents: attachment with proper headers
        return {
          ...baseConfig,
          disposition: 'attachment',
          headers: {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Transfer-Encoding': 'base64',
          },
        };
      }
    };

    const attachment = createAttachment(buffer, portfolioFileName, fileInfo.mime, fileInfo.isImage);

    // Email to OsTutelage (with attachment)
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: email,
      subject,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New Writer Application</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #4b5563; margin-bottom: 10px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="color: #4b5563; margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="color: #4b5563; margin-bottom: 10px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p style="color: #4b5563; margin-bottom: 15px;">
              <strong>Writing Experience:</strong><br>
              ${escapeHtml(experience || '').replace(/\n/g, '<br>')}
            </p>
            <div style="background: #e5e7eb; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <strong>📎 Portfolio:</strong> ${escapeHtml(portfolioFileName)}<br>
              <small>
                File type: ${escapeHtml(fileInfo.mime)} | 
                Extension: ${fileInfo.ext} | 
                Size: ${(portfolioFile.size / 1024 / 1024).toFixed(2)} MB
              </small>
              ${fileInfo.isImage ? `
                <br><em>Image preview will appear inline (if supported by your email client)</em>
              ` : `
                <br><em style="color: #374151;">Click to download the ${fileInfo.ext.toUpperCase()} file</em>
              `}
            </div>
          </div>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <em>Application received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}</em>
            </p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
            Sent from OsTutelage Academy Careers Portal
          </p>
        </div>
      `,
      attachments: [attachment],
    });

    // Auto-reply to applicant (no attachment)
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: email,
      subject: `Thank You for Your Writer Application, ${escapeHtml(name)}!`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
            <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 10px 0;">Thank You, ${escapeHtml(name)}! ✍️</h1>
            <p style="font-size: 16px; margin: 0; opacity: 0.9;">Your Writer Application Has Been Received</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
            <h2 style="color: #1e293b; font-size: 22px; margin-bottom: 15px;">What's Next?</h2>
            <div style="background: linear-gradient(90deg, #10b981 0%, #34d399 100%); color: white; padding: 12px 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <strong>✅ Under Review</strong>
            </div>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              We're excited about your interest in writing for OsTutelage Academy! Our editorial team is reviewing your application and portfolio. 
              You'll hear back from us within <strong>3-5 business days</strong> with next steps.
            </p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-top: 0;">📋 What We Review</h3>
              <ul style="color: #475569; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Your writing samples and portfolio quality</li>
                <li>Relevance to tech education and career development topics</li>
                <li>Writing style, clarity, and engagement</li>
                <li>Consistency with OsTutelage's voice and standards</li>
              </ul>
            </div>

            <p style="color: #475569; line-height: 1.6;">
              In the meantime, feel free to <a href="https://ostutelage.tech" style="color: #3b82f6;">explore our platform</a> or check out our 
              <a href="https://ostutelage.tech/schools" style="color: #3b82f6;">current programs</a>.
            </p>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://wa.me/2349036508361" 
               style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Questions? Chat with Us
            </a>
          </div>

          <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              OsTutelage Academy | Empowering Tech Careers<br />
              <a href="mailto:info@ostutelage.tech" style="color: #3b82f6;">info@ostutelage.tech</a> | 
              <a href="https://ostutelage.tech" style="color: #3b82f6;">ostutelage.tech</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        message: "Writer application sent successfully! Check your email for confirmation." 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Writer Application Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.message,
      stack: error.stack,
    });

    // Enhanced error handling
    if (error.code === "EAUTH") {
      return NextResponse.json(
        { message: "Email service authentication failed. Please try again later." },
        { status: 503 }
      );
    }

    if (error.code?.includes('attachment') || error.message.includes('file')) {
      return NextResponse.json(
        { message: "File processing failed. Please try a smaller file or different format." },
        { status: 400 }
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
        message: "Failed to process application. Please try again or email us directly at info@ostutelage.tech",
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      }, 
      { status: 500 }
    );
  }
}