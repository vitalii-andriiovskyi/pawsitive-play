import Link from "next/link";
import React from "react";
import { RightPart } from "@/front-end/components/core/header/RightPart";

export default function Header() {
  return (
    <header className="shadow-primary-900/10 min-h-(--header-height) shadow-xl">
      <div className="mx-auto flex min-h-(--header-height) w-full max-w-[96rem] items-center justify-between px-5 py-4">
        <Link
          className="font-primary bg-linear-to-br from-red-500 to-red-800 bg-clip-text text-2xl font-bold text-transparent capitalize md:text-3xl"
          href="/"
        >
          PawTime
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                className="font-primary text-lg md:text-2xl"
                href="/ai-houses"
              >
                AI Houses
              </Link>
            </li>
            <li>
              <Link
                className="font-primary text-lg md:text-2xl"
                href="/generic-form-example"
              >
                Generic Form Example
              </Link>
            </li>
            <li>
              <Link className="font-primary text-lg md:text-2xl" href="/pets">
                Pets
              </Link>
            </li>
          </ul>
        </nav>
        <RightPart />
      </div>
    </header>
  );
}
