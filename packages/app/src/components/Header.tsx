"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePhantomWallet } from "../hooks/usePhantomWallet";

const Header = () => {
  const { publicKey, connectWallet, disconnectWallet } = usePhantomWallet();

  return (
    <header className="py-6  mb-10 px-4">
      <div className="flex space-x-4">
        <ConnectButton
          showBalance={true}
          accountStatus="address"
          label="Connect RainbowKit"
        />
        {publicKey ? (
          <button
            className="px-3 py-1 rounded bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={disconnectWallet}
          >
            Disconnect Phantom
          </button>
        ) : (
          <button
            className="px-3 py-1 rounded bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={connectWallet}
          >
            Connect Phantom
          </button>
        )}
      </div>
    </header>
  );
};

export { Header };
