import Aboutus from "@/components/Aboutus";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
 import ValuationSDG from "@/components/ValuationSDG";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

function page() {
  return (
    <main>
      <Aboutus />
      <ValuationSDG/>
      <Team/>
      <Footer />

    </main>
  );
}

export default page;
