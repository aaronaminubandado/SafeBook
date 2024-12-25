import { Metadata } from "next";
import { BusinessDashboard } from "@/components/business-dashboard";
import RequireAuth from "@/components/RequireAuth";

export const metadata: Metadata = {
  title: "Business Dashboard | SafeBook",
  description:
    "Manage your business schedules, information, and appointment bookings",
};

export default function DashboardPage() {
  return (
    <RequireAuth>
  <BusinessDashboard />
  </RequireAuth>
);
}
