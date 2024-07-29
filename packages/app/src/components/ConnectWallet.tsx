"use client";

import React from 'react';
import { usePhantomWallet } from '../hooks/usePhantomWallet';

const ConnectWallet = () => {
  const { publicKey, connectWallet, disconnectWallet } = usePhantomWallet();

  return (
    <div>
      {publicKey ? (
        <div>
          <p>Connected: {publicKey.toString()}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect to Phantom Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
