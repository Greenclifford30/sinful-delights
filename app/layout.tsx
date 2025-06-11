import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Sinful Delights",
  description: "Indulge in our chef's daily creations, featuring fresh, seasonal ingredients and innovative flavors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${notoSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-plus-jakarta), var(--font-noto-sans), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
