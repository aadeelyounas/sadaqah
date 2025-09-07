"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddDonationDialog from "@/components/AddDonationDialog";
import { User, DonationSummary, RecentDonations } from "@/types";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DonationSummary | null>(null);
  const [recentDonations, setRecentDonations] = useState<RecentDonations | null>(null);
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Load summary and recent donations
    loadDashboardData(parsedUser.id);
    setLoading(false);
  }, [router]);

  const loadDashboardData = async (userId: string) => {
    try {
      // Load summary
      const summaryResponse = await fetch(`/api/donations?userId=${userId}&type=summary`);
      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary);

      // Load recent donations
      const recentResponse = await fetch(`/api/donations?userId=${userId}&type=recent`);
      const recentData = await recentResponse.json();
      setRecentDonations(recentData.recentDonations);
      
      // Load total donations count
      const countResponse = await fetch(`/api/donations?userId=${userId}&type=count`);
      const countData = await countResponse.json();
      setTotalDonations(countData.totalCount || 0);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-emerald-800">
            Sadaqah Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.email?.substring(0, 6)}...</span>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and track all charitable donations</p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📈</span>
                </div>
                <CardTitle className="text-green-800">Total Received</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatPKR(summary.totalReceived)}
                </div>
                <p className="text-gray-600">Total donations received</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📤</span>
                </div>
                <CardTitle className="text-blue-800">Total Given</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatPKR(summary.totalGiven)}
                </div>
                <p className="text-gray-600">Total donations given</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-emerald-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚖️</span>
                </div>
                <CardTitle className="text-emerald-800">Net Balance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-3xl font-bold mb-2 ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPKR(Math.abs(summary.balance))}
                </div>
                <p className="text-gray-600">
                  {summary.balance >= 0 ? 'More received than given' : 'More given than received'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Donations - Two Column Layout */}
        {recentDonations && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Recent Given */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <span className="mr-2">📤</span>
                  Recent Given
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentDonations.given && recentDonations.given.length > 0 ? (
                  <div className="space-y-3">
                    {recentDonations.given.map((donation: any) => (
                      <div key={donation.id} className="border rounded-lg p-3 bg-blue-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-blue-600">
                              {formatPKR(parseFloat(donation.amount))}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>To:</strong> {donation.recipientName || donation.recipientId?.substring(0, 8) + '...'}
                            </p>
                            {donation.location && (
                              <p className="text-xs text-gray-500">
                                <strong>Location:</strong> {donation.location}
                              </p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(donation.donatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <span className="text-2xl block mb-2">📤</span>
                    <p>No donations given yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Received */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <span className="mr-2">📥</span>
                  Recent Received
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentDonations.received && recentDonations.received.length > 0 ? (
                  <div className="space-y-3">
                    {recentDonations.received.map((donation: any) => (
                      <div key={donation.id} className="border rounded-lg p-3 bg-green-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-green-600">
                              {formatPKR(parseFloat(donation.amount))}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>From:</strong> {donation.donor_name || donation.donorId?.substring(0, 8) + '...'}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(donation.donatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <span className="text-2xl block mb-2">📥</span>
                    <p>No donations received yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* View More Link - Show when more than 10 donations */}
        {totalDonations > 10 && (
          <div className="text-center mb-8">
            <Link 
              href="/reporting" 
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">📊</span>
              View All Records & Reports
              <span className="ml-2">→</span>
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          <AddDonationDialog 
            user={user} 
            onDonationAdded={() => loadDashboardData(user.id)} 
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Donations Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <CardTitle className="text-emerald-800">Manage Donations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Add, edit and manage all donation records
              </p>
              <Link href="/donations">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Manage Donations
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Reports Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <CardTitle className="text-emerald-800">Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                View detailed analytics and generate reports
              </p>
              <Link href="/reporting">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <CardTitle className="text-emerald-800">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Update your profile and account settings
              </p>
              <Button className="w-full bg-gray-500 hover:bg-gray-600" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Floating Add Donation Button */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl font-light z-50 group"
        title="Add New Donation"
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          +
        </span>
      </button>
      
      {/* Hidden Add Donation Dialog for Floating Button */}
      <AddDonationDialog 
        user={user} 
        onDonationAdded={() => loadDashboardData(user?.id || '')}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        hideButton={true}
      />
    </div>
  );
}
