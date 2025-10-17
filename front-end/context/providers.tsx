"use client";
import { ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";
import { twMerge } from "tailwind-merge";
import { SWRConfig } from "swr";

import MyTheme from "../theme/theme";
import { AuthProvider } from "./Auth";
import { SessionProvider } from "next-auth/react";
interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <SWRConfig>
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: MyTheme,
        ptOptions: {
          mergeSections: true,
          mergeProps: true,
          classNameMergeFunction: twMerge,
        },
      }}
    >
      <SessionProvider>
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </PrimeReactProvider>
  </SWRConfig>
);
export default Providers;
