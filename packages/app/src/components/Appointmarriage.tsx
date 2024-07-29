import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";

function Appointmarriage() {
  return (
    <main>
      <AuroraBackground>
        <div className="items-center justify-center relative z-15 text-lg md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
          How do you register your marriage,You ask?
        </div>
        <div className="font-extralight text-sm md:text-lg lg:text-xl dark:text-neutral-200 py-4 text-center max-w-4xl">
          The process
        </div>
        <Link href={"/thankYou"}>
          <button
            className="mt-6 pd-5 px-40 py-2 rounded border border-neutral-800 mx-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
            type="submit"
          >
            Make an Appointment
            <BottomGradient />
          </button>
        </Link>
      </AuroraBackground>
    </main>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
export default Appointmarriage;
