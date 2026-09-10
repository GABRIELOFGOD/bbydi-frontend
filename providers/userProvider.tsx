"use client";

import { baseUrl } from "@/lib/constants";
import { User } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

export interface UserProviderType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserProviderType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token || !baseUrl) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();

      setUser(response.ok ? userData.user as User : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const request = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const response = await request.json();

      if (!request.ok) throw Error(response.message);
      localStorage.setItem("token", response.token);
      refreshUser();

      toast.success(response.message || "Login successful");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}