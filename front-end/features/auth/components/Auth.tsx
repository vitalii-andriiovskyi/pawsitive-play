"use client";
import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

import { Button } from "@/front-end/components/shared/button/Button";
import SignIn from "@/front-end/features/auth/components/SignIn";
import SignUp from "@/front-end/features/auth/components/SignUp";
import { useAuthState, useAuthUpdate } from "@/front-end/context/Auth";
import cn from "@/front-end/utils/cn";

interface AuthProps {
  className?: string;
}

const Auth: React.FC<AuthProps> = ({ className }) => {
  const [isLogin, setIsLogin] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isVisible: isAuthVisible } = useAuthState();
  const { hideAuth } = useAuthUpdate();
  useEffect(() => {
    if (dialogRef.current) {
      if (isAuthVisible) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }
  }, [isAuthVisible]);
  return (
    <dialog
      className={cn(
        className,
        "animate-fade-out open:animate-fade-in open:backdrop:animate-backdrop-fade-in border-primary-900/30 min-h-8 w-md rounded-xs border-1 p-8 open:backdrop:bg-white/75 open:backdrop:backdrop-blur-lg",
      )}
      ref={dialogRef}
    >
      <button className="absolute top-1.5 right-1.5" onClick={hideAuth}>
        <XMarkIcon
          className="text-primary h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      </button>
      {isLogin ? <SignIn /> : <SignUp />}
      <div className="text-primary-700 font-primary mt-4 text-center text-2xl font-semibold">
        OR
      </div>
      <div className="mt-4 flex justify-center">
        {isLogin ? (
          <Button variant="regular" size="md" onClick={() => setIsLogin(false)}>
            Sign Up
          </Button>
        ) : (
          <Button variant="regular" size="md" onClick={() => setIsLogin(true)}>
            Sign In
          </Button>
        )}
      </div>
    </dialog>
  );
};
export default Auth;
