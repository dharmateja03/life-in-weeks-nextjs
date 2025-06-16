import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life in Weeks",
  description: "A visual map of my life, where each week I've been alive is a little box.",
  openGraph: {
    title: "Life in Weeks",
    description: "A visual map of my life, where each week I've been alive is a little box.",
    images: [
      {
        url: "/screencapture-localhost-3001-2025-06-15-20_26_45.png",
        width: 1200,
        height: 630,
        alt: "Life in Weeks - Visual timeline of Ran Ding's life",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life in Weeks",
    description: "A visual map of my life, where each week I've been alive is a little box.",
    images: ["/screencapture-localhost-3001-2025-06-15-20_26_45.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
