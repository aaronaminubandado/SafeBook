"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebaseConfiguration";

interface BusinessUser {
  id: string;
  businessName: string;
  businessType: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  role: string;
  created_At: Timestamp;
}

interface CustomerUser {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  created_At: Timestamp;
}

export default function AdminDashboard() {
  const [businessData, setBusinessData] = useState<BusinessUser[]>([]);
  const [customerData, setCustomerData] = useState<CustomerUser[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from Firestore
  const viewDB = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      // Separate users into businesses and customers
      const businesses: BusinessUser[] = [];
      const customers: CustomerUser[] = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();

        if (data.role === "business") {
          businesses.push({
            id: doc.id,
            businessName: data.businessName,
            businessType: data.businessType,
            contactPerson: data.contactPerson,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
            created_At: data.created_At,
          });
        } else if (data.role === "customer") {
          customers.push({
            id: doc.id,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
            created_At: data.created_At,
          });
        }
      });

      setBusinessData(businesses);
      setCustomerData(customers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    viewDB();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* Businesses Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Businesses</h2>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border p-2">Business Name</th>
                  <th className="border p-2">Business Type</th>
                  <th className="border p-2">Contact Person</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {businessData.length > 0 ? (
                  businessData.map((business) => (
                    <tr key={business.id}>
                      <td className="border p-2">{business.businessName}</td>
                      <td className="border p-2">{business.businessType}</td>
                      <td className="border p-2">{business.contactPerson}</td>
                      <td className="border p-2">{business.email}</td>
                      <td className="border p-2">{business.phoneNumber}</td>
                      <td className="border p-2">{business.role}</td>
                      <td className="border p-2">{business.created_At.toDate().toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center border p-2">
                      No businesses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Customers Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Customers</h2>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {customerData.length > 0 ? (
                  customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="border p-2">{customer.email}</td>
                      <td className="border p-2">{customer.phoneNumber}</td>
                      <td className="border p-2">{customer.role}</td>
                      <td className="border p-2">{customer.created_At.toDate().toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center border p-2">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
