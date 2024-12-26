"use client";

import { useEffect, useState } from "react";
import { 
  collection, 
  getDocs, 
  Timestamp, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc,
  writeBatch
} from "firebase/firestore";
import { db } from "@/config/firebaseConfiguration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  created_At: Timestamp;
}

export default function AdminDashboard() {
  const [businessData, setBusinessData] = useState<BusinessUser[]>([]);
  const [customerData, setCustomerData] = useState<CustomerUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [backupData, setBackupData] = useState<string>("");

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
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
            created_At: data.created_At,
          });
        }
      });

      setBusinessData(businesses);
      setCustomerData(customers);
      alert("Database viewed successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to view database");
    }

    setLoading(false);
  };

  // Initialize the database with sample data
  const initializeDB = async () => {
    setLoading(true);

    try {
      const batch = writeBatch(db);

      // Sample business data
      const businessSample = {
        businessName: "Sample Business",
        businessType: "Retail",
        contactPerson: "John Doe",
        email: "john@samplebusiness.com",
        phoneNumber: "1234567890",
        role: "business",
        created_At: Timestamp.now(),
      };

      // Sample customer data
      const customerSample = {
        name: "Jane Smith",
        email: "jane@example.com",
        phoneNumber: "9876543210",
        role: "customer",
        created_At: Timestamp.now(),
      };

      const businessRef = doc(collection(db, "users"));
      const customerRef = doc(collection(db, "users"));

      batch.set(businessRef, businessSample);
      batch.set(customerRef, customerSample);

      await batch.commit();

      alert("Database initialized with sample data");
      viewDB(); // Refresh the view
    } catch (error) {
      console.error("Error initializing database:", error);
      alert("Failed to initialize database");
    }

    setLoading(false);
  };

  // Reset the database by removing all documents
  const resetDB = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const batch = writeBatch(db);

      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      setBusinessData([]);
      setCustomerData([]);
      alert("Database reset successfully");
    } catch (error) {
      console.error("Error resetting database:", error);
      alert("Failed to reset database");
    }

    setLoading(false);
  };

  // Backup the database
  const backupDB = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const backupData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const backupJSON = JSON.stringify(backupData, null, 2);
      setBackupData(backupJSON);

      // In a real-world scenario, you might want to save this to a file or another storage solution
      console.log("Backup data:", backupJSON);

      alert("Database backed up successfully");
    } catch (error) {
      console.error("Error backing up database:", error);
      alert("Failed to backup database");
    }

    setLoading(false);
  };

  // Modify a user in the database
  const modifyUser = async (id: string, newData: Partial<BusinessUser | CustomerUser>) => {
    setLoading(true);

    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, newData);

      alert("User modified successfully");
      viewDB(); // Refresh the view
    } catch (error) {
      console.error("Error modifying user:", error);
      alert("Failed to modify user");
    }

    setLoading(false);
  };

  useEffect(() => {
    viewDB();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex space-x-2 mb-4">
        <Button onClick={initializeDB} disabled={loading}>Initialize DB</Button>
        <Button onClick={resetDB} disabled={loading}>Reset DB</Button>
        <Button onClick={backupDB} disabled={loading}>Backup DB</Button>
        <Button onClick={viewDB} disabled={loading}>View DB</Button>
      </div>

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
                  <th className="border p-2">Actions</th>
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
                      <td className="border p-2">
                        <Button onClick={() => modifyUser(business.id, { businessName: "Modified Business" })}>
                          Modify
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center border p-2">
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
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Created At</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerData.length > 0 ? (
                  customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="border p-2">{customer.name}</td>
                      <td className="border p-2">{customer.email}</td>
                      <td className="border p-2">{customer.phoneNumber}</td>
                      <td className="border p-2">{customer.role}</td>
                      <td className="border p-2">{customer.created_At.toDate().toLocaleDateString()}</td>
                      <td className="border p-2">
                        <Button onClick={() => modifyUser(customer.id, { name: "Modified Customer" })}>
                          Modify
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center border p-2">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {backupData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Backup Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {backupData}
          </pre>
        </div>
      )}
    </div>
  );
}
