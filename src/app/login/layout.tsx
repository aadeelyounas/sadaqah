import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Access Your Donation Dashboard",
  description: "Secure login to access your Islamic donation management dashboard. Track your sadaqah, zakat, and charity contributions with complete privacy and security.",
  keywords: [
    "login",
    "secure access",
    "donation dashboard",
    "Islamic finance login",
    "sadaqah tracker login",
    "charity management access"
  ],
  openGraph: {
    title: "Login - Sadaqah Donation Management",
    description: "Access your secure donation management dashboard to track Islamic contributions.",
    type: "website",
  },
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
