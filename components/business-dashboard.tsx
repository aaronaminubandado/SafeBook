"use client";

import { useState } from "react";
import { Calendar, Clock, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleManager } from "@/components/schedule-manager";
import { BusinessInfo } from "@/components/business-info";
import { AppointmentList } from "@/components/appointment-list";

export function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Business Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Slots
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">For the next 7 days</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
               Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            {/* <p className="text-xs text-muted-foreground">
              In the next 24 hours
            </p> */}
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              13 out of 15 fields completed
            </p>
          </CardContent>
        </Card> */}
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="info">Business Info</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Manage Schedule</CardTitle>
              <CardDescription>
                Set your availability and manage your business hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleManager />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessInfo />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Bookings</CardTitle>
              <CardDescription>
                View and manage your upcoming appointments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
