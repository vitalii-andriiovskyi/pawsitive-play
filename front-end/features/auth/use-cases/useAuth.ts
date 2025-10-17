import { useState, useEffect } from "react";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useUser } from "@/front-end/features/user";
import { useAuthUpdate } from "@/front-end/context/Auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const { mutate: refetchUser } = useUser()
  const { hideAuth } = useAuthUpdate();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const codeParam = searchParams.get("code");
    if (
      (errorParam === "CredentialsSignin" && codeParam === "ivalid_credentials") ||
      (errorParam === "CredentialsSignin" && !codeParam)
    ) {
      setError("Invalid email or password.");
    }
  }, [searchParams]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await nextAuthSignIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res && typeof res === "object" && "error" in res && res.error) {
        setError("Invalid email or password.");
      } else if (res && typeof res === "object" && "ok" in res && res.ok) {
        await refetchUser()
        hideAuth()
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 5000)
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await nextAuthSignOut({ redirect: false });
      await refetchUser()
    } catch (e) {
      console.log('e', e)
    } finally {
      setIsLoading(false);
    }
  }

  return { signIn, isLoading, error, signOut };
}
