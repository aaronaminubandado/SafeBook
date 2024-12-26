"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfiguration";

export function SearchBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch businesses from Firestore
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const businessesRef = collection(db, "users");
        const q = query(businessesRef, where("role", "==", "business"));
        const querySnapshot = await getDocs(q);

        const fetchedBusinesses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBusinesses(fetchedBusinesses);
        setSearchResults(fetchedBusinesses);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = businesses.filter(
      (business) =>
        business.businessName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        business.businessType.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      // business.services.some((service: string) =>
      //   service.toLowerCase().includes(searchTerm.toLowerCase())
      // )
    );
    setSearchResults(filteredResults);
  };

  // Select business for booking
  const handleSelectBusiness = (business: any) => {
    setSelectedBusiness(business);
  };

  // Back to search results
  const handleBackToSearch = () => {
    setSelectedBusiness(null);
  };

  if (loading) {
    return <p>Loading businesses...</p>;
  }

  if (selectedBusiness) {
    return (
      <div className="space-y-4">
        <Button onClick={handleBackToSearch} variant="ghost" className="mb-4">
          <X className="h-4 w-4 mr-2" />
          Back to search
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selectedBusiness.businessName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {selectedBusiness.businessType}
            </p>
            <p className="text-sm font-bold">Services:</p>
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
          placeholder="Search for a business, service, or category"
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
              <CardTitle>{business.businessName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {business.businessType}
              </p>
              <p className="text-sm font-bold mt-2">Services:</p>
              <ul className="list-disc pl-5">
                {business.services
                  ?.slice(0, 3)
                  .map((service: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      {service}
                    </li>
                  ))}
              </ul>
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
