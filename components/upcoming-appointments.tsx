"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for upcoming appointments
const mockUpcomingAppointments = [
  {
    id: 1,
    businessName: "Stylish Cuts",
    service: "Haircut",
    date: new Date(2023, 5, 20, 14, 0),
  },
  {
    id: 2,
    businessName: "Zen Massage",
    service: "Swedish Massage",
    date: new Date(2023, 5, 22, 10, 30),
  },
  {
    id: 3,
    businessName: "Nail Paradise",
    service: "Manicure",
    date: new Date(2023, 5, 25, 16, 0),
  },
];

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState(mockUpcomingAppointments);
  const [date, setDate] = useState<Date>();

  const filteredAppointments = date
    ? appointments.filter(
        (appointment) =>
          appointment.date.getDate() === date.getDate() &&
          appointment.date.getMonth() === date.getMonth() &&
          appointment.date.getFullYear() === date.getFullYear()
      )
    : appointments;

  const handleCancel = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.businessName}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{format(appointment.date, "PPP p")}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
