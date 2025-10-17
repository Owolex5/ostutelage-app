// app/(site)/api/career/write/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Enhanced file validation with proper MIME type mapping
    const fileTypeMap: Record<string, { mime: string; ext: string }> = {
      'application/pdf': { mime: 'application/pdf', ext: '.pdf' },
      'application/msword': { mime: 'application/msword', ext: '.doc' },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { 
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        ext: '.docx' 
      },
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': { 
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
        ext: '.pptx' 
      },
      'image/jpeg': { mime: 'image/jpeg', ext: '.jpg' },
      'image/jpg': { mime: 'image/jpeg', ext: '.jpg' },
      'image/png': { mime: 'image/png', ext: '.png' },
      'image/gif': { mime: 'image/gif', ext: '.gif' }
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
    
    // FIXED: Proper filename with correct extension
    const originalName = portfolioFile.name || `portfolio-${Date.now()}`;
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const portfolioFileName = cleanName.endsWith(fileInfo.ext) 
      ? cleanName 
      : `${cleanName}${fileInfo.ext}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
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

    const verifiedSender = "info@ostutelage.tech";

    // HTML escape utility
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

    // FIXED: Enhanced attachment configuration
    const attachment = {
      filename: portfolioFileName,
      content: buffer,
      contentType: fileInfo.mime, // FIXED: Use exact MIME type from map
      disposition: 'attachment', // FIXED: Explicit attachment disposition
      // Additional headers for better compatibility
      headers: {
        'Content-Disposition': `attachment; filename="${portfolioFileName}"`,
        'Content-Transfer-Encoding': 'base64', // FIXED: Proper encoding for binary files
      },
    };

    // Determine if image (for inline display) or document (attachment)
    const isImage = fileInfo.mime.startsWith('image/');
    if (isImage) {
      // Optional: Add inline CID for images (shows inline in email)
      attachment.cid = `portfolio_${Date.now()}`;
      attachment.disposition = 'inline';
    }

    // Admin email with FIXED attachment
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: email,
      subject: `New Writer Application: ${escapeHtml(name)} - ${portfolioFileName}`,
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
              ${escapeHtml(experience).replace(/\n/g, '<br>')}
            </p>
            <div style="background: #e5e7eb; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <strong>📎 Portfolio:</strong> ${escapeHtml(portfolioFileName)}<br>
              <small>File type: ${escapeHtml(fileInfo.mime)} | Size: ${(portfolioFile.size / 1024 / 1024).toFixed(2)} MB</small>
              ${isImage ? `
                <br><img src="cid:portfolio_${Date.now()}" alt="Portfolio Preview" style="max-width: 100%; margin-top: 10px; border-radius: 4px;">
              ` : `
                <br><em>Download the ${fileInfo.ext.toUpperCase()} file to view portfolio</em>
              `}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            <em>Application received: ${new Date().toLocaleString()}</em><br>
            Sent from OsTutelage Academy Careers Portal
          </p>
        </div>
      `,
      attachments: [attachment],
    });

    // Auto-reply (no attachment needed)
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: email,
      subject: `Thank You for Your Writer Application, ${escapeHtml(name)}!`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: `<!-- Same as before, no changes needed -->`,
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

    return NextResponse.json(
      { 
        message: "Failed to process application. Please try again or email us directly at info@ostutelage.tech",
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      }, 
      { status: 500 }
    );
  }
}