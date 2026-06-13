import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0E1426; color: #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #00D4FF, #8B5CF6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-family: 'Space Grotesk', sans-serif;">New Contact Message</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Corexoquest Contact Form</p>
        </div>
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748B; width: 120px;">Name</td><td style="padding: 8px 0; color: #E2E8F0; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748B;">Email</td><td style="padding: 8px 0; color: #00D4FF;">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #64748B;">Phone</td><td style="padding: 8px 0; color: #E2E8F0;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 8px 0; color: #64748B;">Company</td><td style="padding: 8px 0; color: #E2E8F0;">${data.company}</td></tr>` : ""}
            ${data.service ? `<tr><td style="padding: 8px 0; color: #64748B;">Service</td><td style="padding: 8px 0; color: #8B5CF6;">${data.service}</td></tr>` : ""}
            ${data.budget ? `<tr><td style="padding: 8px 0; color: #64748B;">Budget</td><td style="padding: 8px 0; color: #F59E0B;">${data.budget}</td></tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #141E35; border-radius: 8px; border-left: 4px solid #00D4FF;">
            <p style="color: #64748B; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="color: #E2E8F0; margin: 0; line-height: 1.7;">${data.message}</p>
          </div>
          <p style="color: #64748B; font-size: 12px; margin-top: 24px; text-align: center;">This message was sent from the Corexoquest website contact form.</p>
        </div>
      </div>
    `,
  });
}

export async function sendBookingEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `New Booking Request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0E1426; color: #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #8B5CF6, #00D4FF); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Booking Request</h1>
        </div>
        <div style="padding: 30px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
          ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ""}
          ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ""}
          ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ""}
          ${data.message ? `<p><strong>Notes:</strong> ${data.message}</p>` : ""}
        </div>
      </div>
    `,
  });
}

export async function sendQuoteEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  paymentMethod?: string;
}): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `New Quote Request: ${data.service} from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0E1426; color: #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #F59E0B, #8B5CF6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
        </div>
        <div style="padding: 30px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
          <p><strong>Service:</strong> ${data.service}</p>
          ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
          ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
          ${data.paymentMethod ? `<p><strong>Payment Method:</strong> ${data.paymentMethod}</p>` : ""}
          <p><strong>Description:</strong> ${data.description}</p>
        </div>
      </div>
    `,
  });
}

export async function sendAutoReply(to: string, name: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "We received your message — Corexoquest",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0E1426; color: #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #00D4FF, #8B5CF6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">COREXOQUEST</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Your Quest for Digital Excellence Starts Here.</p>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #00D4FF; margin-bottom: 16px;">Thank you, ${name}!</h2>
          <p style="color: #94A3B8; line-height: 1.7; margin-bottom: 20px;">We've received your message and will get back to you within <strong style="color: #E2E8F0;">24 hours</strong>. Our team is excited to learn about your project!</p>
          <p style="color: #94A3B8; line-height: 1.7;">In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_APP_URL}/portfolio" style="color: #00D4FF;">portfolio</a> or check our <a href="${process.env.NEXT_PUBLIC_APP_URL}/services" style="color: #8B5CF6;">services</a>.</p>
          <div style="margin-top: 30px; padding: 20px; background: #141E35; border-radius: 8px;">
            <p style="color: #64748B; margin: 0; font-size: 13px;">📱 WhatsApp: +977 9716390682<br>✉️ Email: info.corexoquest@gmail.com</p>
          </div>
        </div>
        <div style="padding: 16px; text-align: center; background: #080C1A;">
          <p style="color: #475569; font-size: 12px; margin: 0;">© 2026 Corexoquest. Nepal • Worldwide.</p>
        </div>
      </div>
    `,
  });
}
