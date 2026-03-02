export const metadata = {
  title: 'Fitness Bot',
  description: 'Agentic AI fitness assistant'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#0f172a', color: '#e2e8f0' }}>
        <main style={{ maxWidth: 980, margin: '0 auto', padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
