"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ReportingPageContent() {
  const [report, setReport] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetch("/api/reporting")
      .then((res) => res.json())
      .then(setReport);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-emerald-800">
            Sadaqah
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Insights into charitable giving across the platform</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <CardTitle className="text-emerald-800">Total Donations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {formatPKR(parseFloat(report.totalAmount || 0))}
              </div>
              <p className="text-gray-600">Platform total</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <CardTitle className="text-emerald-800">Active Donors</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {report.topDonors?.length || 0}
              </div>
              <p className="text-gray-600">Contributing users</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <CardTitle className="text-emerald-800">Recipients</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {report.topReceivers?.length || 0}
              </div>
              <p className="text-gray-600">Helped individuals</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Donors */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center">
                <span className="mr-2">🏆</span>
                Top Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              {report.topDonors && report.topDonors.length > 0 ? (
                <div className="space-y-3">
                  {report.topDonors.map((donor: any, index: number) => (
                    <div key={donor.donorId} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-emerald-800">#{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-700">
                          {donor.donorId.substring(0, 8)}...
                        </span>
                      </div>
                      <span className="font-bold text-emerald-600">
                        {formatPKR(parseFloat(donor.total_given || 0))}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">📊</span>
                  <p>No donations recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Recipients */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center">
                <span className="mr-2">🎁</span>
                Top Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              {report.topReceivers && report.topReceivers.length > 0 ? (
                <div className="space-y-3">
                  {report.topReceivers.map((receiver: any, index: number) => (
                    <div key={receiver.recipientId} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-emerald-800">#{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-700">
                          {receiver.recipientId ? receiver.recipientId.substring(0, 8) + '...' : 'Anonymous'}
                        </span>
                      </div>
                      <span className="font-bold text-emerald-600">
                        {formatPKR(parseFloat(receiver.total_received || 0))}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">🎁</span>
                  <p>No recipients recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Inspirational Quote */}
        <Card className="shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-8 text-center">
            <blockquote className="text-xl italic mb-4">
              "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills."
            </blockquote>
            <cite className="text-emerald-100">- Quran 2:261</cite>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ReportingPage() {
  return (
    <ProtectedRoute>
      <ReportingPageContent />
    </ProtectedRoute>
  );
}
