"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditDonationDialog from "@/components/EditDonationDialog";

function ReportingPageContent() {
  const [report, setReport] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingDonation, setEditingDonation] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [filters, setFilters] = useState({
    type: 'ALL', // ALL, GIVEN, RECEIVED
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });
  
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('Loading reporting data...');
      
      // Get current user
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.push("/login");
        return;
      }
      const currentUser = JSON.parse(userData);
      
      // Load report summary
      const reportRes = await fetch("/api/reporting");
      if (!reportRes.ok) {
        throw new Error(`Reporting API failed: ${reportRes.status}`);
      }
      const reportData = await reportRes.json();
      console.log('Report data loaded:', reportData);
      setReport(reportData);

      // Load all donations for the current user
      const donationsRes = await fetch(`/api/donations?userId=${currentUser.id}&type=all`);
      if (!donationsRes.ok) {
        throw new Error(`Donations API failed: ${donationsRes.status}`);
      }
      const donationsData = await donationsRes.json();
      console.log('Donations data loaded:', donationsData);
      setDonations(donationsData.donations || []);
      setFilteredDonations(donationsData.donations || []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set some fallback data so the page doesn't appear completely broken
      setReport({ totalAmount: 0, topDonors: [], topReceivers: [] });
      setDonations([]);
      setFilteredDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, donations]);

  const applyFilters = () => {
    let filtered = [...donations];

    // Filter by type
    if (filters.type !== 'ALL') {
      filtered = filtered.filter(donation => donation.type === filters.type);
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(donation => 
        new Date(donation.donatedAt) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(donation => 
        new Date(donation.donatedAt) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Filter by search term (donor name, recipient name, location)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(donation => 
        (donation.donor_name && donation.donor_name.toLowerCase().includes(searchLower)) ||
        (donation.recipientName && donation.recipientName.toLowerCase().includes(searchLower)) ||
        (donation.location && donation.location.toLowerCase().includes(searchLower))
      );
    }

    setFilteredDonations(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleEditDonation = (donation: any) => {
    setEditingDonation(donation);
    setShowEditDialog(true);
  };

  const handleDeleteDonation = async (donation: any) => {
    if (!confirm(`Are you sure you want to delete this ${donation.type.toLowerCase()} donation of ${formatPKR(donation.amount)}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/donations?id=${donation.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Reload data after successful deletion
        await loadData();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete donation');
      }
    } catch (error) {
      alert('An error occurred while deleting the donation');
    }
  };

  const handleDonationUpdated = async () => {
    // Reload data after successful update
    await loadData();
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-2xl font-bold text-emerald-800">
              Sadaqah Reports
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-800">
              ← Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.email?.substring(0, 6)}...</span>
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
        {/* Summary Cards */}
        {report && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-gray-600">{filteredDonations.length} records</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-emerald-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📤</span>
                </div>
                <CardTitle className="text-blue-800">Given Donations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {donations.filter(d => d.type === 'GIVEN').length}
                </div>
                <p className="text-gray-600">Total given</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-emerald-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📥</span>
                </div>
                <CardTitle className="text-green-800">Received Donations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {donations.filter(d => d.type === 'RECEIVED').length}
                </div>
                <p className="text-gray-600">Total received</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center">
              <span className="mr-2">🔍</span>
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <select
                  id="type-filter"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="ALL">All Types</option>
                  <option value="GIVEN">Given</option>
                  <option value="RECEIVED">Received</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <Label htmlFor="date-from">Date From</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Date To */}
              <div>
                <Label htmlFor="date-to">Date To</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Search Term */}
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Donor, recipient, location..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => setFilters({ type: 'ALL', dateFrom: '', dateTo: '', searchTerm: '' })}
                variant="outline"
                className="border-gray-300"
              >
                Clear All Filters
              </Button>
              <span className="text-sm text-gray-600">
                Showing {filteredDonations.length} of {donations.length} records
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Donations Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center justify-between">
              <span className="flex items-center">
                <span className="mr-2">📋</span>
                All Records
              </span>
              {totalPages > 1 && (
                <span className="text-sm font-normal text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentDonations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-emerald-200 p-3 text-left">Date</th>
                      <th className="border border-emerald-200 p-3 text-left">Type</th>
                      <th className="border border-emerald-200 p-3 text-left">Amount</th>
                      <th className="border border-emerald-200 p-3 text-left">From/To</th>
                      <th className="border border-emerald-200 p-3 text-left">Location</th>
                      <th className="border border-emerald-200 p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonations.map((donation, index) => (
                      <tr key={donation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 p-3">
                          {new Date(donation.donatedAt).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-200 p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            donation.type === 'GIVEN' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {donation.type === 'GIVEN' ? '📤 Given' : '📥 Received'}
                          </span>
                        </td>
                        <td className="border border-gray-200 p-3 font-semibold">
                          {formatPKR(parseFloat(donation.amount))}
                        </td>
                        <td className="border border-gray-200 p-3">
                          {donation.type === 'GIVEN' 
                            ? `To: ${donation.recipientName || 'Anonymous'}`
                            : `From: ${donation.donor_name || 'Anonymous'}`
                          }
                        </td>
                        <td className="border border-gray-200 p-3">
                          {donation.location || '-'}
                        </td>
                        <td className="border border-gray-200 p-3">
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleEditDonation(donation)}
                              size="sm"
                              variant="outline"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            >
                              ✏️ Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteDonation(donation)}
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              🗑️ Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <span className="text-6xl mb-4 block">📊</span>
                <p className="text-xl mb-2">No donations found</p>
                <p>Try adjusting your filters or add some donation records</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className={currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inspirational Quote */}
        <Card className="shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white mt-8">
          <CardContent className="p-8 text-center">
            <blockquote className="text-xl italic mb-4">
              "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills."
            </blockquote>
            <cite className="text-emerald-100">- Quran 2:261</cite>
          </CardContent>
        </Card>
      </main>

      {/* Edit Donation Dialog */}
      <EditDonationDialog
        donation={editingDonation}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onDonationUpdated={handleDonationUpdated}
      />
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
