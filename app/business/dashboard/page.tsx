import { Metadata } from "next";
import { BusinessDashboard } from "@/components/business-dashboard";
import RequireAuth from "@/components/RequireAuth";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Business Dashboard | SafeBook",
  description:
    "Manage your business schedules, information, and appointment bookings",
};

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header userType="business" />
        <BusinessDashboard />
      </div>
    </RequireAuth>
  );
}
