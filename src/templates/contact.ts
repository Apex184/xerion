export const getContactTemplate = (data: {
    message: string;
}): string => {
    return `
        <h2>🎉 New Contact Message</h2>
        <ul>
          <li><strong>Name:</strong> ${data.message}</li>
        </ul>
        <p>Check your dashboard for more details.</p>
      `;
};