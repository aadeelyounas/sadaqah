"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddDonationDialogProps {
  user: any;
  onDonationAdded: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideButton?: boolean;
}

export default function AddDonationDialog({ 
  user, 
  onDonationAdded, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  hideButton = false 
}: AddDonationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Use external control if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  // Given donation form state
  const [givenRecipientName, setGivenRecipientName] = useState("");
  const [givenAmount, setGivenAmount] = useState("");
  const [givenLocation, setGivenLocation] = useState("");
  const [givenDate, setGivenDate] = useState("");

  // Received donation form state
  const [receivedDonorName, setReceivedDonorName] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [receivedDate, setReceivedDate] = useState("");

  const resetForms = () => {
    setGivenRecipientName("");
    setGivenAmount("");
    setGivenLocation("");
    setGivenDate("");
    setReceivedDonorName("");
    setReceivedAmount("");
    setReceivedDate("");
    setMessage("");
  };

  const handleGivenDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(givenAmount),
          type: 'GIVEN',
          donorName: user?.email || "Admin",
          recipientName: givenRecipientName,
          location: givenLocation,
          donatedAt: givenDate || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Donation given recorded successfully!");
        resetForms();
        onDonationAdded();
        setTimeout(() => {
          setOpen(false);
          setMessage("");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to record donation");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReceivedDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(receivedAmount),
          type: 'RECEIVED',
          donorName: receivedDonorName,
          recipientName: user?.email || "Admin",
          location: null,
          donatedAt: receivedDate || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Donation received recorded successfully!");
        resetForms();
        onDonationAdded();
        setTimeout(() => {
          setOpen(false);
          setMessage("");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to record donation");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideButton && (
        <DialogTrigger asChild>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <span className="mr-2">➕</span>
            Add Donation
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Add Donation Record</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="given" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="given" className="text-blue-700">
              <span className="mr-2">📤</span>
              Given
            </TabsTrigger>
            <TabsTrigger value="received" className="text-green-700">
              <span className="mr-2">📥</span>
              Received
            </TabsTrigger>
          </TabsList>

          {/* Given Donation Tab */}
          <TabsContent value="given" className="space-y-4">
            <div className="text-center text-blue-700 font-medium mb-4">
              Record a donation that was given to someone
            </div>
            <form onSubmit={handleGivenDonation} className="space-y-4">
              <div>
                <Label htmlFor="givenRecipientName">Recipient's Name</Label>
                <Input
                  id="givenRecipientName"
                  type="text"
                  value={givenRecipientName}
                  onChange={(e) => setGivenRecipientName(e.target.value)}
                  placeholder="Who received this donation?"
                  required
                />
              </div>
              <div>
                <Label htmlFor="givenLocation">Location</Label>
                <Input
                  id="givenLocation"
                  type="text"
                  value={givenLocation}
                  onChange={(e) => setGivenLocation(e.target.value)}
                  placeholder="Where was this donation given?"
                  required
                />
              </div>
              <div>
                <Label htmlFor="givenAmount">Amount (PKR)</Label>
                <Input
                  id="givenAmount"
                  type="number"
                  step="1"
                  min="1"
                  value={givenAmount}
                  onChange={(e) => setGivenAmount(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="givenDate">Date (Optional)</Label>
                <Input
                  id="givenDate"
                  type="date"
                  value={givenDate}
                  onChange={(e) => setGivenDate(e.target.value)}
                  placeholder="Leave empty for current date"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Recording..." : "Record Given Donation"}
              </Button>
            </form>
          </TabsContent>

          {/* Received Donation Tab */}
          <TabsContent value="received" className="space-y-4">
            <div className="text-center text-green-700 font-medium mb-4">
              Record a donation that was received from someone
            </div>
            <form onSubmit={handleReceivedDonation} className="space-y-4">
              <div>
                <Label htmlFor="receivedDonorName">Donor's Name</Label>
                <Input
                  id="receivedDonorName"
                  type="text"
                  value={receivedDonorName}
                  onChange={(e) => setReceivedDonorName(e.target.value)}
                  placeholder="Who gave this donation?"
                  required
                />
              </div>
              <div>
                <Label htmlFor="receivedAmount">Amount (PKR)</Label>
                <Input
                  id="receivedAmount"
                  type="number"
                  step="1"
                  min="1"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="receivedDate">Date (Optional)</Label>
                <Input
                  id="receivedDate"
                  type="date"
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e.target.value)}
                  placeholder="Leave empty for current date"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? "Recording..." : "Record Received Donation"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {message && (
          <div className={`text-center p-3 rounded ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
