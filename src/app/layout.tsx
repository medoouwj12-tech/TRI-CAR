import './globals.css';

export const metadata = {
  title: 'فرست كار | First Car',
  description: 'Luxury Car Rental Egypt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
