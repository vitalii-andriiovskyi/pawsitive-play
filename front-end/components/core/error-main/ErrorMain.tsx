"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/front-end/components/shared/button/Button";

const ErrorMain = () => {
  const router = useRouter();

  const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.back();
  };

  return (
    <div className="font-primary container mx-auto flex h-(--section-height) max-w-[900px] flex-col items-center justify-center gap-6 p-5 text-center text-4xl font-bold md:gap-8 md:text-6xl">
      <h1 className="text-primary-700 mb-4 text-5xl md:text-9xl">404</h1>
      <p className="">
        We weren&apos;t able to find the page you were looking for.&nbsp; Try to{" "}
        <Link href="/" className="underline" onClick={goBack}>
          go back
        </Link>
      </p>
      <p className="text-primary-700 text-3xl md:text-5xl">or</p>
      <div>
        <Button variant="regular" asChild>
          <Link href={"/"}>Take me home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorMain;
