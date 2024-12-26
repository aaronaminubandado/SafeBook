'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { doc, setDoc, updateDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/config/firebaseConfiguration';
// Mock data for available services
const services = [
'Haircut', 
 'Hair Coloring',
  'Manicure',
    'Pedicure' 
];

// Mock function to get available timeslots
const getAvailableTimeslots = (date: Date, serviceId: number) => {
  const timeslots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  ];
  return timeslots;
};

type BookingFormProps = {
  businessId: string; // Updated to string to match Firestore document IDs
  existingBooking?: {
    id: string;
    service: string;
    date: Timestamp;
    time: string;
  } | null;
};

export function BookingForm({ businessId, existingBooking = null }: BookingFormProps) {
  const [service, setService] = useState(existingBooking?.service || '');
  const [date, setDate] = useState(existingBooking?.date.toDate() || new Date());
  const [time, setTime] = useState(existingBooking?.time || '');
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get the currently authenticated user's ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCustomerId(user.uid);
      } else {
        setCustomerId(null);
        alert('You need to be logged in to book an appointment.');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (date && service) {
      const timeslots = getAvailableTimeslots(date, parseInt(service));
      setAvailableTimeslots(timeslots);
    }
  }, [date, service]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!service) newErrors.service = 'Please select a service';
    if (!date) newErrors.date = 'Please select a date';
    if (!time) newErrors.time = 'Please select a time';
    if (!customerId) newErrors.customerId = 'You must be logged in to book an appointment';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create Firestore document references
      const customerRef = doc(db, 'Customers', customerId as string);
      const businessRef = doc(db, 'Businesses', businessId);

      const bookingData = {
        business: businessRef, // Firestore reference to the business document
        customer: customerRef, // Firestore reference to the customer document
        service,
        date: date,
        time,
      };

      try {
        if (existingBooking) {
          // Update existing booking
          const bookingRef = doc(db, 'Appointments', existingBooking.id);
          await updateDoc(bookingRef, bookingData);
          alert('Booking updated successfully!');
        } else {
          // Create new booking
          const bookingRef = doc(collection(db, 'Appointments'));
          await setDoc(bookingRef, bookingData);
          alert('Booking created successfully!');
        }
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Failed to save booking. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Service
        </label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s} 
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={(e) => setDate(new Date(e.target.value))}
          min={format(new Date(), 'yyyy-MM-dd')}
          max={format(new Date(new Date().setMonth(new Date().getMonth() + 2)), 'yyyy-MM-dd')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Time
        </label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a time</option>
          {availableTimeslots.map((timeslot) => (
            <option key={timeslot} value={timeslot}>
              {timeslot}
            </option>
          ))}
        </select>
        {errors.time && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.time}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {existingBooking ? 'Update Booking' : 'Book Appointment'}
      </button>
    </form>
  );
}
