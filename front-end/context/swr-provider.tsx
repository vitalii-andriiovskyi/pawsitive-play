"use client";
import { ReactNode } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

interface ProvidersProps {
  children: ReactNode;
  value: SWRConfiguration;
}

const SWRProvider = ({ children, value }: ProvidersProps) => {
  return <SWRConfig value={value}>{children}</SWRConfig>;
};
export default SWRProvider;
