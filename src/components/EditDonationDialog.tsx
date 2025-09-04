"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Donation } from "@/types";

interface EditDonationDialogProps {
  donation: Donation | null;
  open: boolean;
  onClose: () => void;
  onDonationUpdated: () => void;
}

export default function EditDonationDialog({ donation, open, onClose, onDonationUpdated }: EditDonationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<'GIVEN' | 'RECEIVED'>('GIVEN');
  const [donorName, setDonorName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [location, setLocation] = useState("");
  const [donatedAt, setDonatedAt] = useState("");

  useEffect(() => {
    if (donation) {
      setAmount(donation.amount?.toString() || "");
      setType(donation.type || 'GIVEN');
      setDonorName(donation.donor_name || "");
      setRecipientName(donation.recipientName || "");
      setLocation(donation.location || "");
      
      // Format date for input (YYYY-MM-DD)
      if (donation.donatedAt) {
        const date = new Date(donation.donatedAt);
        setDonatedAt(date.toISOString().split('T')[0]);
      }
    }
  }, [donation]);

  const resetForm = () => {
    setAmount("");
    setType('GIVEN');
    setDonorName("");
    setRecipientName("");
    setLocation("");
    setDonatedAt("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donation) return;
    
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/donations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: donation.id,
          amount: parseFloat(amount),
          type,
          donorName,
          recipientName,
          location,
          donatedAt: donatedAt || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Donation updated successfully!");
        onDonationUpdated();
        setTimeout(() => {
          onClose();
          setMessage("");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to update donation");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Edit Donation</DialogTitle>
        </DialogHeader>
        
        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.includes('success') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'GIVEN' | 'RECEIVED')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="GIVEN">Given</option>
              <option value="RECEIVED">Received</option>
            </select>
          </div>

          {type === 'GIVEN' ? (
            <>
              <div>
                <Label htmlFor="recipientName">Recipient's Name</Label>
                <Input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who received this donation?"
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
                  placeholder="Where was this donation given?"
                />
              </div>
            </>
          ) : (
            <div>
              <Label htmlFor="donorName">Donor's Name</Label>
              <Input
                id="donorName"
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Who gave this donation?"
                required
              />
            </div>
          )}

          <div>
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

          <div>
            <Label htmlFor="donatedAt">Date</Label>
            <Input
              id="donatedAt"
              type="date"
              value={donatedAt}
              onChange={(e) => setDonatedAt(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "Updating..." : "Update Donation"}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
