import AppointDivorce from "@/components/AppointDivorce";
import Footer from "@/components/Footer";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main>
      <div>
        <AppointDivorce />
      </div>
      <Footer />
    </main>
  );
}

export default page;
