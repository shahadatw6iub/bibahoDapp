"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

interface PhantomWalletContextProps {
  wallet: PhantomWallet | null;
  publicKey: PublicKey | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  connection: Connection | null;
}

const PhantomWalletContext = createContext<
  PhantomWalletContextProps | undefined
>(undefined);

interface PhantomWalletProviderProps {
  children: ReactNode;
}

interface PhantomWallet {
  isPhantom: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: string, handler: (publicKey: PublicKey) => void) => void;
}

export const usePhantomWallet = (): PhantomWalletContextProps => {
  const context = useContext(PhantomWalletContext);
  if (context === undefined) {
    throw new Error(
      "usePhantomWallet must be used within a PhantomWalletProvider"
    );
  }
  return context;
};

export const PhantomWalletProvider = ({
  children,
}: PhantomWalletProviderProps): JSX.Element => {
  const [wallet, setWallet] = useState<PhantomWallet | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const solana = (window as any).solana as PhantomWallet;
    if (solana && solana.isPhantom) {
      setWallet(solana);
      solana.on("connect", (publicKey: PublicKey) => {
        setPublicKey(publicKey);
        console.log(
          "Connected to Phantom wallet with public key:",
          publicKey.toString()
        );
      });
      solana.on("disconnect", () => {
        setPublicKey(null);
        console.log("Disconnected from Phantom wallet");
      });
    }
  }, []);

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      setConnection(connection);
    }
  }, [publicKey]);

  const connectWallet = async () => {
    try {
      if (wallet) {
        await wallet.connect();
      } else {
        alert(
          "Phantom Wallet is not installed. Please install it from https://phantom.app/"
        );
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (wallet) {
        await wallet.disconnect();
      }
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error);
    }
  };

  return (
    <PhantomWalletContext.Provider
      value={{ wallet, publicKey, connectWallet, disconnectWallet, connection }}
    >
      {children}
    </PhantomWalletContext.Provider>
  );
};
