"use client";

import { useEffect, useState } from "react";
import { BookingForm } from "@/components/booking-form";
import { Edit, Trash } from "lucide-react";
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

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleCancel = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Appointments", id));
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handleEdit = (appointment: AppointmentData) => {
    setEditingAppointment(appointment);
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Upcoming Appointments
      </h2>
      {editingAppointment ? (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Edit Appointment
          </h3>
          <BookingForm 
            businessId={editingAppointment.business.id} 
            existingBooking={editingAppointment} 
          />
          <button
            onClick={() => setEditingAppointment(null)}
            className="mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {appointment.businessName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {appointment.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {appointment.date.toDate().toLocaleDateString()} {appointment.date.toDate().toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="text-gray-900 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 mr-2"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}