import React from "react";
import AppointmentsPage from "../../components/ViewAppointments"; // Ensure the path is correct
import Footer from "@/components/Footer";

const Page: React.FC = () => {
  return (
    <main>
          <AppointmentsPage />
          <Footer/>
    </main>
  );
};

export default Page;
