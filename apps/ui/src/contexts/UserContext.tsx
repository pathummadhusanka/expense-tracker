import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultUser } from '../data/user';
import type { UserProfile } from '../data/user';

interface UserContextValue {
  user: UserProfile;
  updateUser: (user: UserProfile) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: {children: ReactNode;}) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const value = useMemo(() => ({ user, updateUser: setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}