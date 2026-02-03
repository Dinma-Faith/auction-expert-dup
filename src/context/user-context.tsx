"use client";

import { createContext, useContext } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);
