import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The OpenArtist Program | OpenArt",
  description:
    "Invitation-only creator program for the best AI content creators. Early model access, paid per post, full creative freedom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @font-face {
            font-family: 'Mondwest';
            src: url('/fonts/Mondwest-Regular.otf') format('opentype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0D0B0A",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}