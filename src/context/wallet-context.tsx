"use client";

import { createContext, useContext } from "react";

type WalletContextType = {
  balanceNgn: number;
  loading: boolean;
};

export const WalletContext = createContext<WalletContextType>({
  balanceNgn: 0,
  loading: true,
});

export const useWallet = () => useContext(WalletContext);
