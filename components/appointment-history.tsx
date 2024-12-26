"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
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
import { collection, getDocs, query, getDoc, doc, deleteDoc, DocumentReference, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebaseConfiguration";


interface AppointmentData {
    id: string;
    business: DocumentReference;
    service: string;
    date: Timestamp;
    time:string;
    businessName?: string;
  }

export function AppointmentHistory() {
  const [date, setDate] = useState<Date>();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  

  const filteredAppointments = date
    ? appointments.filter(
        (appointment) =>
        appointment.date.toDate().getDate() === date.getDate() &&
        appointment.date.toDate().getMonth() === date.getMonth() &&
        appointment.date.toDate().getFullYear() === date.getFullYear()
      )
    : [];


    useEffect(() => {
        const fetchAppointments = async () => {
          setLoading(true);
          try {
            const appointmentsRef = collection(db, "Appointments");
            const q = query(appointmentsRef);
            const querySnapshot = await getDocs(q);
            
            // Fetch all appointments first
            const appointmentsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as AppointmentData[];
            
            console.log("Initial appointments data:", appointmentsData[1]);
    
            // Fetch business details for each appointment
            const appointmentsWithBusinesses = await Promise.all(
              appointmentsData.map(async (appointment) => {
                try {
                  const businessDoc = await getDoc(appointment.business);
                  if (businessDoc.exists()) {
                    const businessData = businessDoc.data();
                    return {
                      ...appointment,
                      businessName: businessData.businessName || "Unknown Business",
                    };
                  }
                  return {
                    ...appointment,
                    businessName: "Unknown Business",
                  };
                } catch (error) {
                  console.error("Error fetching business details:", error);
                  return {
                    ...appointment,
                    businessName: "Unknown Business",
                  };
                }
              })
            );
    
            console.log("Appointments with business details:", appointmentsWithBusinesses);
            setAppointments(appointmentsWithBusinesses);
          } catch (error) {
            console.error("Error fetching appointments:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAppointments();
      }, []);

  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment History</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
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
              className="bg-white dark:bg-gray-800"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="text-gray-900 dark:text-white">Business</TableHead>
              <TableHead className="text-gray-900 dark:text-white">Service</TableHead>
              <TableHead className="text-gray-900 dark:text-white">Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id} className="border-b border-gray-200 dark:border-gray-700">
                <TableCell className="text-gray-900 dark:text-white">{appointment.businessName}</TableCell>
                <TableCell className="text-gray-900 dark:text-white">{appointment.service}</TableCell>
                <TableCell className="text-gray-900 dark:text-white">{appointment.date.toDate().toLocaleTimeString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

