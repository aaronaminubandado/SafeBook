"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

// Mock data for appointment history
const mockAppointmentHistory = [
  {
    id: 1,
    businessName: "Stylish Cuts",
    service: "Haircut",
    date: new Date(2023, 4, 15, 14, 0),
  },
  {
    id: 2,
    businessName: "Zen Massage",
    service: "Deep Tissue Massage",
    date: new Date(2023, 4, 20, 11, 30),
  },
  {
    id: 3,
    businessName: "Nail Paradise",
    service: "Pedicure",
    date: new Date(2023, 5, 1, 16, 0),
  },
];

export function AppointmentHistory() {
  const [date, setDate] = useState<Date>();

  const filteredAppointments = date
    ? mockAppointmentHistory.filter(
        (appointment) =>
          appointment.date.getDate() === date.getDate() &&
          appointment.date.getMonth() === date.getMonth() &&
          appointment.date.getFullYear() === date.getFullYear()
      )
    : mockAppointmentHistory;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointment History</h2>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.businessName}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{format(appointment.date, "PPP p")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
