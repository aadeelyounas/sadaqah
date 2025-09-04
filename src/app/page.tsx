import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamic Donation Management - Track Sadaqah & Charity",
  description: "Professional Islamic donation management system for tracking sadaqah, zakat, and charity contributions. Secure platform for Muslim community to manage donations in Pakistani Rupees with complete record keeping.",
  keywords: [
    "Islamic donations",
    "Sadaqah tracker",
    "Zakat management",
    "Muslim charity",
    "Donation records",
    "Islamic finance",
    "PKR donations",
    "Charity tracking"
  ],
  openGraph: {
    title: "Sadaqah - Islamic Donation Management System",
    description: "Track and manage your Islamic donations with our comprehensive platform designed for the Muslim community.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-800">Sadaqah - Islamic Donation Management</h1>
          <nav className="space-x-4" role="navigation">
            <Link href="/login">
              <Button variant="outline" aria-label="Login to your donation dashboard">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700" aria-label="Create new donation management account">Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Manage Islamic Donations with <span className="text-emerald-600">Sadaqah</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Professional Islamic donation management system for tracking sadaqah, zakat, and charity contributions in Pakistani Rupees (PKR). Secure platform designed for the Muslim community.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3" aria-label="Start managing your donations">
                Start Managing Donations
              </Button>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Complete Islamic Donation Management Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">📊 Comprehensive Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track all your sadaqah, zakat, and charity contributions with detailed records. 
                  Manage donations given and received with complete transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">💰 PKR Currency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Native Pakistani Rupees (PKR) support with proper formatting. 
                  Designed specifically for Pakistani Muslim community donation tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">🔒 Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your donation records are completely private and secure. 
                  Islamic-compliant platform with admin-only access for personal record keeping.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">📈 Advanced Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate detailed reports with filtering and pagination. 
                  Analyze your charitable giving patterns and Islamic contribution history.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">✏️ Edit & Manage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full CRUD operations - create, read, update, and delete donation records. 
                  Complete control over your Islamic donation management.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">📅 Date Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Record donations with specific dates or use current timestamp. 
                  Historical tracking for better Islamic financial record keeping.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hadith Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Wisdom from the Sunnah
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "The believer's shade on the Day of Resurrection will be his charity."
                </blockquote>
                <cite className="text-emerald-600 font-semibold">- Prophet Muhammad (ﷺ)</cite>
                <p className="text-sm text-gray-500 mt-2">Hadith: Tirmidhi</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "Charity does not decrease wealth."
                </blockquote>
                <cite className="text-emerald-600 font-semibold">- Prophet Muhammad (ﷺ)</cite>
                <p className="text-sm text-gray-500 mt-2">Hadith: Muslim</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "Give charity without delay, for it stands in the way of calamity."
                </blockquote>
                <cite className="text-emerald-600 font-semibold">- Prophet Muhammad (ﷺ)</cite>
                <p className="text-sm text-gray-500 mt-2">Hadith: Tirmidhi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle>Track Your Giving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Keep a detailed record of all your charitable donations and their impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <CardTitle>Connect & Give</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with verified recipients and make direct charitable contributions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  View detailed analytics of your charitable giving patterns and impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Sadaqah - Islamic Donation Management Platform. Made with ❤️ for the Muslim Ummah.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Track Sadaqah, Zakat & Charity Contributions | PKR Currency Support | Secure & Private
          </p>
        </div>
      </footer>
    </div>
  );
}
