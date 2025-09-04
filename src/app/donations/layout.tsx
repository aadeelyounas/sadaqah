import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donations - Complete Record Management",
  description: "Manage all your Islamic donation records in one place. Add, edit, and track sadaqah, zakat, and charity contributions with detailed record keeping in Pakistani Rupees.",
  keywords: [
    "donation records",
    "Islamic donation management",
    "sadaqah tracking",
    "charity records",
    "zakat management",
    "PKR donation tracking",
    "Muslim charity records"
  ],
  openGraph: {
    title: "Donations - Complete Record Management",
    description: "Comprehensive donation record management for Islamic contributions and charity tracking.",
    type: "website",
  },
  alternates: {
    canonical: "/donations",
  },
  robots: {
    index: false, // Don't index private donation pages
    follow: false,
  },
};

export default function DonationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
