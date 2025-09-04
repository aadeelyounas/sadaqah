import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Create Your Donation Management Account",
  description: "Create a secure account to start managing your Islamic donations. Join our platform to track sadaqah, zakat, and charity contributions with complete record keeping in Pakistani Rupees.",
  keywords: [
    "register",
    "signup",
    "create account",
    "Islamic donation account",
    "sadaqah tracker registration",
    "charity management signup",
    "Muslim donation platform"
  ],
  openGraph: {
    title: "Register - Join Sadaqah Donation Management",
    description: "Create your account to start tracking and managing Islamic donations securely.",
    type: "website",
  },
  alternates: {
    canonical: "/register",
  },
  robots: {
    index: false, // Don't index registration pages
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
