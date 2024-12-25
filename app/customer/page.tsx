import { Metadata } from "next";
import { CustomerDashboard } from "@/components/customer-dashboard";
import RequireAuth from "@/components/RequireAuth";

export const metadata: Metadata = {
  title: "Customer Dashboard | SafeBook",
  description: "Book appointments and manage your bookings",
};

export default function CustomerPage() {
  return (
    <RequireAuth>
    <CustomerDashboard />
    </RequireAuth>
);
}
