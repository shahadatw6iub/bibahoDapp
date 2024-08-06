"use client";
import React, { useState, useEffect } from "react";

// Define the structure of an appointment
interface Appointment {
  id: number;
  name: string;
  date: string;
  country: string;
  city: string;
  office: string;
}

const useFetchAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getAppointment");
        if (!response.ok) throw new Error("Failed to fetch appointments.");
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { appointments, loading, error };
};

const AppointmentsPage: React.FC = () => {
  const { appointments, loading, error } = useFetchAppointments();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Office</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="bg-gray-100 dark:bg-gray-700">
                <td className="border px-4 py-2">{appointment.name}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.country}</td>
                <td className="border px-4 py-2">{appointment.city}</td>
                <td className="border px-4 py-2">{appointment.office}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AppointmentsPage;
