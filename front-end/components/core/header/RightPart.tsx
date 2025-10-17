"use client";
import React from "react";

import { useUser } from "@/front-end/features/user";
import { Button } from "@/front-end/components/shared/button/Button";
import MenuDropdown from "@/front-end/components/core/header/MenuDropdown";
import { useAuthUpdate } from "@/front-end/context/Auth";

export const RightPart = () => {
  const { user } = useUser();
  const { showAuth } = useAuthUpdate();

  if (user) {
    return (
      <div className="relative flex items-center">
        <MenuDropdown />
      </div>
    );
  }

  return (
    <>
      <Button variant={"login"} size={"sm"} onClick={showAuth}>
        Hello, Sign in:)
      </Button>
    </>
  );
};
