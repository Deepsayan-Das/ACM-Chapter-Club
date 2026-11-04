import nodemailer from "nodemailer";

export interface RegistrationData {
  name: string;
  email: string;
  acmMemberNumber: string;
  studyYear: string;
  department: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function createEmailTransporter() {
  const user =
    process.env.EMAIL_USER ||
    process.env.SMTP_USER ||
    process.env.NODEMAILER_EMAIL;

  const pass =
    process.env.EMAIL_PASS ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_APP_PASSWORD ||
    process.env.NODEMAILER_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing email credentials. Please configure EMAIL_USER and EMAIL_PASS in your environment (.env.local)."
    );
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : undefined;

  if (host) {
    return nodemailer.createTransport({
      host,
      port: port || 587,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Default to standard Gmail service
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function generateRegistrationEmailHtml(data: RegistrationData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMemberNumber = escapeHtml(data.acmMemberNumber);
  const safeStudyYear = escapeHtml(data.studyYear);
  const safeDepartment = escapeHtml(data.department);
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New ACM Chapter Registration</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%); padding: 32px 28px; text-align: center;">
              <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #c7d2fe; margin-bottom: 8px;">
                JU ACM Student Chapter
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                New Registration Received
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #e0e7ff;">
                A student has registered for the ACM Student Chapter.
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                      Applicant Name
                    </span>
                    <div style="font-size: 17px; font-weight: 600; color: #0f172a; margin-top: 4px;">
                      ${safeName}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                      Email Address
                    </span>
                    <div style="font-size: 15px; margin-top: 4px;">
                      <a href="mailto:${safeEmail}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">
                        ${safeEmail}
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                      ACM Member Number
                    </span>
                    <div style="margin-top: 6px;">
                      <span style="display: inline-block; background-color: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; font-family: monospace;">
                        ${safeMemberNumber}
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                      Year of Study
                    </span>
                    <div style="font-size: 15px; font-weight: 500; color: #0f172a; margin-top: 4px;">
                      ${safeStudyYear}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 12px;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
                      Department
                    </span>
                    <div style="font-size: 15px; font-weight: 500; color: #0f172a; margin-top: 4px;">
                      ${safeDepartment}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Call to Action / Info Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-top: 8px;">
                <div style="font-size: 12px; color: #64748b;">
                  <strong style="color: #334155;">Submitted at:</strong> ${submittedAt}
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                This is an automated notification from the <strong>JU ACM Student Chapter</strong> web portal.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendRegistrationEmail(data: RegistrationData) {
  const destination =
    process.env.DESTINATION_EMAIL ||
    process.env.EMAIL_TO ||
    process.env.RECIPIENT_EMAIL ||
    process.env.EMAIL_USER;

  if (!destination) {
    throw new Error(
      "Missing destination email. Please configure DESTINATION_EMAIL in your environment (.env.local)."
    );
  }

  const sender =
    process.env.EMAIL_USER ||
    process.env.SMTP_USER ||
    process.env.NODEMAILER_EMAIL;

  const transporter = createEmailTransporter();

  const mailOptions = {
    from: `"JU ACM Chapter Portal" <${sender}>`,
    to: destination,
    replyTo: data.email,
    subject: `New ACM Chapter Registration: ${data.name} (${data.acmMemberNumber})`,
    text: `
New ACM Student Chapter Registration

Name: ${data.name}
Email: ${data.email}
ACM Member Number: ${data.acmMemberNumber}
Year of Study: ${data.studyYear}
Department: ${data.department}
    `.trim(),
    html: generateRegistrationEmailHtml(data),
  };

  return await transporter.sendMail(mailOptions);
}

