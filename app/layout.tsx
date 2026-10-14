import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import { publicPageUrl } from "@/lib/publicContent";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const siteRoot = publicPageUrl("/");

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: {
    default: "Brain Builders Youth Development Initiative (BBYDI)",
    template: "%s | BBYDI",
  },
  description: "BBYDI, A non-partisan, not-for-profit civic organisation with a decade-long record of advocating for inclusive policies that prioritise women and youth.",
  applicationName: "Brain Builders Youth Development Initiative",
  keywords: [
    "Brain Builders Youth Development Initiative",
    "BBYDI",
    "Nigeria youth development",
    "inclusive governance Nigeria",
    "gender equality Nigeria",
    "civic engagement Nigeria",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    siteName: "Brain Builders Youth Development Initiative",
    locale: "en_NG",
    title: "Brain Builders Youth Development Initiative (BBYDI)",
    description: "A Nigerian civic organisation advancing inclusive governance, youth empowerment and gender equality.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Builders Youth Development Initiative (BBYDI)",
    description: "A Nigerian civic organisation advancing inclusive governance, youth empowerment and gender equality.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", dmSans.variable, "font-sans tracking-wide")}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Brain Builders Youth Development Initiative",
              alternateName: "BBYDI",
              description: "A Nigerian civic organisation advancing inclusive governance, youth empowerment and gender equality.",
              url: siteRoot,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <TooltipProvider>
          <Toaster />
          {children}
          <AccessibilityWidget />
        </TooltipProvider>
      </body>
    </html>
  );
}
