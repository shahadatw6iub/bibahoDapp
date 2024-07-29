"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../utils/cn";
import Link from "next/link";

function ProposeMarriage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter bride and groom information
      </p>

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-6">
        Bride
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="brideFirstName">First name</Label>
            <Input id="brideFirstName" placeholder="First name" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="brideLastName">Last name</Label>
            <Input id="brideLastName" placeholder="Last name" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="brideNationalID">National ID Card Number</Label>
          <Input
            id="brideNationalID"
            placeholder="National ID Card Number"
            type="number"
          />
        </LabelInputContainer>

        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-6">
          Groom
        </h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mb-4 mt-7">
          <LabelInputContainer>
            <Label htmlFor="groomFirstName">First name</Label>
            <Input id="groomFirstName" placeholder="First name" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="groomLastName">Last name</Label>
            <Input id="groomLastName" placeholder="Last name" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="groomNationalID">National ID Card Number</Label>
          <Input
            id="groomNationalID"
            placeholder="National ID Card Number"
            type="number"
          />
        </LabelInputContainer>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-6 mb-8">
          Additional
        </h2>
        <div className="pd-10">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="rules">Marriage Rules</Label>
            <Input
              id="groomNationalID"
              placeholder="Marriage Rules"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="rules">Witness 1</Label>
            <Input id="Witness_1ID" placeholder="Witness_1_NID" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="rules">Witness 2</Label>
            <Input id="Witness_1ID" placeholder="Witness_2_NID" type="text" />
          </LabelInputContainer>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mt-6 mb-8">
            Add prenup
          </h2>
        </div>
        <Link href={"showQR"}>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit
            <BottomGradient />
          </button>
        </Link>
      </form>
    </div>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ProposeMarriage;
