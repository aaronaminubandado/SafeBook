"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";

// Mock data for businesses
const mockBusinesses = [
  { id: 1, name: "Stylish Cuts", category: "Hair Salon", rating: 4.5 },
  { id: 2, name: "Zen Massage", category: "Massage Therapy", rating: 4.8 },
  { id: 3, name: "Nail Paradise", category: "Nail Salon", rating: 4.2 },
];

export function SearchBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(mockBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState<
    (typeof mockBusinesses)[0] | null
  >(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = mockBusinesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSelectBusiness = (business: (typeof mockBusinesses)[0]) => {
    setSelectedBusiness(business);
  };

  const handleBackToSearch = () => {
    setSelectedBusiness(null);
  };

  if (selectedBusiness) {
    return (
      <div className="space-y-4">
        <Button onClick={handleBackToSearch} variant="ghost" className="mb-4">
          <X className="h-4 w-4 mr-2" />
          Back to search
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selectedBusiness.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {selectedBusiness.category}
            </p>
            <BookingForm businessId={selectedBusiness.id} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search for a business or service"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {business.category}
              </p>
              <p className="text-sm">Rating: {business.rating}/5</p>
              <Button
                className="mt-4 w-full"
                onClick={() => handleSelectBusiness(business)}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
