import { Metadata } from "next";
import { CustomerDashboard } from "@/components/customer-dashboard";

export const metadata: Metadata = {
  title: "Customer Dashboard | SafeBook",
  description: "Book appointments and manage your bookings",
};

export default function CustomerPage() {
  return <CustomerDashboard />;
}
