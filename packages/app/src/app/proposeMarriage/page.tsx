import React from "react";
import ProposeMarriage from "@/components/ProposeMarriage";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PhantomWalletProvider } from "@/hooks/usePhantomWallet";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import ConnectWallet from "@/components/ConnectWallet";

function Page() {
  return (
    <main>
      <AuroraBackground>
        <div className=" mt-20">
          <h2 className="relative z-10 text-lg md:text-7xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
            Propose a Marriage
          </h2>
        </div>
        <div className="relative w-full flex-grow flex flex-col items-center justify-center pt-40 ">
          <ProposeMarriage />
        </div>
      </AuroraBackground>
      <Footer />
    </main>
  );
}

export default Page;
