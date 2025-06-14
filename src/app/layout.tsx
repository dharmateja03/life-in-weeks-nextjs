import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life in Weeks",
  description: "A visual map of my life, where each week I've been alive is a little box.",
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
