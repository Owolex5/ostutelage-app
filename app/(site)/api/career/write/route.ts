// app/(site)/api/career/write/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    // Parse multipart form data using native Web APIs
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || "Not provided";
    const experience = formData.get('experience') as string;
    const portfolioFile = formData.get('portfolio') as File;

    // Validate required fields
    if (!name || !email || !experience || !portfolioFile) {
      return NextResponse.json(
        { 
          message: "Missing required fields: name, email, experience, and portfolio are required" 
        }, 
        { status: 400 }
      );
    }

    // Validate portfolio file
    const portfolio = portfolioFile as File;
    const allowedTypes = [
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg', 'image/png', 'image/gif'
    ];
    
    if (!allowedTypes.includes(portfolio.type)) {
      return NextResponse.json(
        { 
          message: "Please upload a PDF, Word document, PowerPoint, or image file for your portfolio" 
        },
        { status: 400 }
      );
    }

    // Create temporary file for portfolio
    const bytes = await portfolio.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const portfolioFileName = portfolio.name || `portfolio-${Date.now()}.pdf`;
    const tempFilePath = path.join(
      process.cwd(), 
      'tmp', 
      `portfolio-${Date.now()}-${path.extname(portfolioFileName)}`
    );
    
    // Ensure tmp directory exists
    await fs.mkdir(path.dirname(tempFilePath), { recursive: true });
    
    // Write portfolio to temporary file
    await fs.writeFile(tempFilePath, buffer);

  
 const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // uses Vercel variable
  port: Number(process.env.SMTP_PORT),// uses Vercel variable
  secure: false,                       // STARTTLS
  auth: {
    user: process.env.SMTP_USER,       // uses Vercel variable
    pass: process.env.SMTP_PASS,       // uses Vercel variable
  },
  tls: {
    rejectUnauthorized: false,
  },
});



    // Email to info@ostutelage.tech
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${process.env.SMTP_USER}>`,
      to: "info@ostutelage.tech",
      subject: `New Writer Application from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New Writer Application</h2>
          <p style="color: #4b5563; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
          <p style="color: #4b5563; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="color: #4b5563; margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</p>
          <p style="color: #4b5563; margin-bottom: 10px;"><strong>Writing Experience:</strong> ${experience}</p>
          <p style="color: #4b5563; margin-bottom: 20px;">
            <strong>Portfolio:</strong> ${portfolioFileName}<br>
            Please find the applicant's portfolio or sample work attached.
          </p>
          <p style="color: #4b5563; font-size: 14px; margin-top: 20px;">
            Sent from OsTutelage Academy Careers
          </p>
        </div>
      `,
      attachments: [
        {
          filename: portfolioFileName,
          path: tempFilePath,
          contentType: portfolio.type,
        },
      ],
    });

    // Auto-reply email to applicant
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Writer Application",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0;">Thank You, ${name}!</h1>
            <p style="color: #4b5563; font-size: 16px; margin: 10px 0;">Your Writer Application Has Been Received</p>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 10px;">
              We're excited to receive your application to write for OsTutelage Academy! Our team is reviewing your submission, including your portfolio or sample work. We'll get back to you soon with the next steps.
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 10px;">
              Your writing samples help us understand your style and expertise. We're looking forward to potentially collaborating with you!
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
              In the meantime, explore our <a href="https://ostutelage.tech/schools" style="color: #3b82f6; text-decoration: none; font-weight: 600;">programs</a> or reach out with any questions.
            </p>
          </div>
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="https://wa.me/2349036508361" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Contact Us via WhatsApp
            </a>
          </div>
          <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              OsTutelage Academy<br />
              <a href="mailto:info@ostutelage.tech" style="color: #3b82f6; text-decoration: none;">info@ostutelage.tech</a> | 
              <a href="https://ostutelage.tech" style="color: #3b82f6; text-decoration: none;">ostutelage.tech</a>
            </p>
          </div>
        </div>
      `,
    });

    // Clean up temporary file
    await fs.unlink(tempFilePath).catch(console.error);

    return NextResponse.json(
      { 
        message: "Writer application sent successfully! You'll receive a confirmation email shortly." 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing writer application:", error);
    
    // Clean up temp file on error
    try {
      const tempDir = path.join(process.cwd(), 'tmp');
      if (await fs.access(tempDir).then(() => true).catch(() => false)) {
        const tempFiles = await fs.readdir(tempDir);
        for (const file of tempFiles) {
          if (file.startsWith('portfolio-')) {
            await fs.unlink(path.join(tempDir, file)).catch(() => {});
          }
        }
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    return NextResponse.json(
      { 
        message: "Failed to process writer application. Please try again or contact us directly.",
        ...(process.env.NODE_ENV === 'development' && { 
          error: error instanceof Error ? error.message : String(error) 
        })
      }, 
      { status: 500 }
    );
  }
}