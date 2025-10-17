"use client";
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface AuthState {
  isVisible: boolean;
}

interface AuthUpdate {
  showAuth: () => void;
  hideAuth: () => void;
}

export const AuthStateContext = createContext<AuthState | undefined>(undefined);
export const AuthUpdateContext = createContext<AuthUpdate | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showAuth = useCallback(() => setIsVisible(true), []);
  const hideAuth = useCallback(() => setIsVisible(false), []);

  const state = useMemo(() => ({ isVisible }), [isVisible]);
  const updateFns = useMemo(
    () => ({ showAuth, hideAuth }),
    [showAuth, hideAuth],
  );

  return (
    <AuthUpdateContext.Provider value={updateFns}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthUpdateContext.Provider>
  );
};

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (state === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return state;
}

export function useAuthUpdate() {
  const updateFns = useContext(AuthUpdateContext);
  if (updateFns === undefined) {
    throw new Error("useAuthUpdate must be used within a AuthProvider");
  }
  return updateFns;
}
