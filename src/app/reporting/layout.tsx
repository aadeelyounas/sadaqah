import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Analytics - Donation Insights",
  description: "Comprehensive reports and analytics for your Islamic donations. View detailed statistics, filter records, and analyze your sadaqah, zakat, and charity contributions with advanced filtering and pagination.",
  keywords: [
    "donation reports",
    "Islamic finance analytics",
    "sadaqah statistics",
    "charity analytics",
    "donation insights",
    "PKR donation reports",
    "Islamic contribution analysis"
  ],
  openGraph: {
    title: "Reports & Analytics - Donation Insights",
    description: "Advanced reporting and analytics for comprehensive Islamic donation tracking and analysis.",
    type: "website",
  },
  alternates: {
    canonical: "/reporting",
  },
  robots: {
    index: false, // Don't index private reporting pages
    follow: false,
  },
};

export default function ReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
