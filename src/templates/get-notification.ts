export const getAdminNotificationTemplate = (data: {
  name: string;
  email: string;
  country: string;
  role?: string;
  userType?: string;
}): string => {
  return `
      <h2>🎉 New Waitlist Signup</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Country:</strong> ${data.country}</li>
        <li><strong>Role:</strong> ${data.role || 'N/A'}</li>
        <li><strong>User Type:</strong> ${data.userType || 'N/A'}</li>
      </ul>
      <p>Check your dashboard for more details.</p>
    `;
};