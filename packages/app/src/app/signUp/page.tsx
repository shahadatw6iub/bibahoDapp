import { Providers } from "../../components/Providers";
import { Greeting } from "../../components/Greeting";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Header } from "../../components/Header";
import { ToastContainer } from "react-toastify";
import { PhantomWalletProvider } from "../../hooks/usePhantomWallet";
import ConnectWallet from "../../components/ConnectWallet";
import Link from "next/link"; // Import the Link component from Next.js
import Footer from "../../components/Footer";
import { AuroraBackground } from "../../components/ui/aurora-background";

const Home = () => {
  return (
    <main>
      <div>
        <AuroraBackground>
          <div></div>
          <h1 className="relative mt -6 z-10 text-lg md:text-7xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
            Connect to Blockchain
          </h1>
          <PhantomWalletProvider>
            <Providers>
              <Header />
              <ConnectWallet />
              <Link href={"viewAppointments"}>
                <button
                  className="mt-6 pd-5 px-40 py-2 border border-neutral-800 mx-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                  type="submit"
                >
                  View Apointments
                  <BottomGradient />
                </button>
              </Link>
              <Link href={"/proposeMarriage"}>
                <button
                  className="mt-6 pd-5 px-40 py-2 rounded border border-neutral-800 mx-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                  type="submit"
                >
                  Register A Marriage
                  <BottomGradient />
                </button>
              </Link>
              <Link href={"/proposeDivorce"}>
                <button
                  className="mt-6 pd-5 px-40 py-2 rounded border border-neutral-800 mx-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                  type="submit"
                >
                  Register A Divorce
                  <BottomGradient />
                </button>
              </Link>
            </Providers>
            <ToastContainer className="text-white dark:text-gray-900" />
          </PhantomWalletProvider>
        </AuroraBackground>
      </div>
      <Footer />
    </main>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
export default Home;
