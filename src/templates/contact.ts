export const getContactTemplate = (message: string): string => {
    return `
        <h2>🎉 New Contact Message</h2>
        <ul>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Check your dashboard for more details.</p>
      `;
};