"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBooking } from "@/components/search-booking";
import { AppointmentHistory } from "@/components/appointment-history";
import { UpcomingAppointments } from "@/components/upcoming-appointments";

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome, Customer
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search & Book</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="search" className="space-y-4">
          <SearchBooking />
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingAppointments />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <AppointmentHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
