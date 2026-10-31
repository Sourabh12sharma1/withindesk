import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://withindesk-private-ai.workspace-831295.chatgpt.site"),
  title: {
    default: "WithinDesk — Private institutional intelligence",
    template: "%s | WithinDesk",
  },
  description: "A private AI workspace for institutional knowledge, governed agents and policy-aware model routing.",
  openGraph: {
    title: "WithinDesk — Institutional intelligence, kept within.",
    description: "Private AI for regulated teams. Finance-first and available by whitelist.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
