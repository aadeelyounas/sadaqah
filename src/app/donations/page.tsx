"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DonationsPageContent() {
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [donorId, setDonorId] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setDonorId(parsedUser.id);
      setDonorName(parsedUser.email); // Default donor name to email
      loadDonations(parsedUser.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          donorId, 
          recipientId, 
          amount: parseFloat(amount),
          donorName,
          location
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Donation recorded successfully!");
        setRecipientId("");
        setAmount("");
        setLocation("");
        // Refresh donations list
        loadDonations(user.id);
      } else {
        setMessage(data.error || "Failed to record donation");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const loadDonations = async (userId: string) => {
    try {
      const response = await fetch(`/api/donations?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setDonations(data.donations);
      }
    } catch (error) {
      console.error("Failed to load donations:", error);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Donation Management</h1>
          <p className="text-gray-600">Record and track your charitable giving</p>
        </div>

        {/* Record New Donation */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center">
              <span className="mr-2">💰</span>
              Record New Donation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donorId">Your ID (Donor)</Label>
                <Input
                  id="donorId"
                  type="text"
                  value={donorId}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="donorName">Your Name</Label>
                <Input
                  id="donorName"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientId">Recipient ID</Label>
                <Input
                  id="recipientId"
                  type="text"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  placeholder="Enter recipient's ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="amount">Amount (PKR)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="1"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? "Recording..." : "Record Donation"}
                </Button>
              </div>
            </form>
            {message && (
              <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Donation History */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center">
              <span className="mr-2">📋</span>
              Your Donation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🌟</div>
                <p className="text-gray-500 text-lg">No donations recorded yet</p>
                <p className="text-gray-400 mt-2">Start your giving journey by recording your first donation above</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {donations.map((donation: any) => (
                  <div key={donation.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-emerald-600">
                          {formatPKR(parseFloat(donation.amount))}
                        </p>
                        
                        {/* Show different info based on whether it's given or received */}
                        {donation.donorId === user?.id ? (
                          // This is a donation given by the user
                          <>
                            <p className="text-gray-600">
                              <strong>Given to:</strong> {donation.recipientId?.substring(0, 8)}...
                            </p>
                            {donation.location && (
                              <p className="text-gray-600">
                                <strong>Location:</strong> {donation.location}
                              </p>
                            )}
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                              Given
                            </span>
                          </>
                        ) : (
                          // This is a donation received by the user
                          <>
                            <p className="text-gray-600">
                              <strong>Received from:</strong> {donation.donor_name || donation.donorId?.substring(0, 8) + '...'}
                            </p>
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                              Received
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {new Date(donation.donatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DonationsPage() {
  return (
    <ProtectedRoute>
      <DonationsPageContent />
    </ProtectedRoute>
  );
}
