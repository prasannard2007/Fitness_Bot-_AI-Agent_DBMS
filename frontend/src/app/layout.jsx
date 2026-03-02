import Script from 'next/script';

export const metadata = {
  title: 'Fitness Bot',
  description: 'Agentic AI fitness assistant'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
