import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Corexoquest | Your Quest for Digital Excellence Starts Here",
    template: "%s | Corexoquest",
  },
  description:
    "Corexoquest is a full-service digital agency based in Nepal, serving global clients with web development, mobile apps, SEO, PPC, social media management, branding, and more.",
  keywords: [
    "digital agency Nepal",
    "web development Nepal",
    "SEO Nepal",
    "digital marketing Nepal",
    "mobile app development",
    "Corexoquest",
    "web design Nepal",
    "e-commerce development",
  ],
  authors: [{ name: "Corexoquest" }],
  creator: "Corexoquest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Corexoquest",
    title: "Corexoquest | Your Quest for Digital Excellence Starts Here",
    description:
      "Full-service digital agency in Nepal. We build stunning websites, mobile apps, and powerful digital marketing campaigns that drive real results.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Corexoquest Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corexoquest | Digital Agency Nepal",
    description: "Your Quest for Digital Excellence Starts Here.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: prevents flash of light mode on first load */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('corexoquest-theme');document.documentElement.classList.add(t||'dark');}catch(e){document.documentElement.classList.add('dark');}})();`
        }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0E1426",
                color: "#E2E8F0",
                border: "1px solid #1E293B",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
              },
              success: {
                iconTheme: { primary: "#00D4FF", secondary: "#0E1426" },
              },
              error: {
                iconTheme: { primary: "#EF4444", secondary: "#0E1426" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
