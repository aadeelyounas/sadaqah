import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Donation Management Overview",
  description: "Comprehensive dashboard for managing Islamic donations. View donation summaries, recent transactions, and quick actions for sadaqah and charity contributions in Pakistani Rupees.",
  keywords: [
    "donation dashboard",
    "Islamic finance dashboard",
    "sadaqah overview",
    "charity summary",
    "donation statistics",
    "PKR donations dashboard",
    "Islamic contribution tracking"
  ],
  openGraph: {
    title: "Dashboard - Sadaqah Donation Management",
    description: "Access your complete donation management dashboard with summaries and recent activity.",
    type: "website",
  },
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false, // Don't index private dashboard pages
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
