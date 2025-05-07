export const getWaitlistEmailTemplate = (name: string): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Xerion</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
                <h1 style="color: #333; text-align: center;">Welcome to Xerion! 🎉</h1>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    Dear ${name},
                </p>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    Thank you for joining our waitlist! We're excited to have you on board and can't wait to share our product with you.
                </p>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    We'll keep you updated on our progress and let you know as soon as we're ready to launch. In the meantime, if you have any questions, feel free to reach out to us.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #666; font-size: 14px;">
                        Best regards,<br>
                        The Xerion Team
                    </p>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; text-align: center;">
                    <p style="color: #999; font-size: 12px;">
                        This is an automated message, please do not reply directly to this email.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}; 