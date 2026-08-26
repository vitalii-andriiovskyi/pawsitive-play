/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Link from "next/link";

import { Button } from "@/front-end/components/shared/button/Button";
import Spinner from "@/front-end/components/shared/spinner/Spinner";

const Generic = () => {
  return (
    <div className="mx-auto max-w-[700px] py-8">
      <h1 className="font-primary text-primary-900 text-center text-4xl font-bold">
        Generic
      </h1>
      <section>
        <h2 className="font-primary mb-6 font-bold">Typography</h2>
        <h1>
          h1 -- Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae
        </h1>
        <h2>
          h2 -- Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae
        </h2>
        <h3>
          h3 -- Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae
        </h3>
        <h4>
          h4 -- Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae
        </h4>
        <p>
          p -- Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae
        </p>
      </section>
      <section className="flex flex-col items-start gap-5 pt-5">
        <h2 className="font-primary mb-6 font-bold">Buttons Examples</h2>
        {/* Button */}
        <Button onClick={() => {}}>Default Button</Button>

        {/* Button[size="md"] */}
        <Button size={"md"} onClick={() => {}}>
          Default MD
        </Button>

        {/* Button[size="sm"] */}
        <Button size={"sm"} onClick={() => {}}>
          Default SM
        </Button>

        {/* Button[variant="regular"] */}
        <Button variant={"regular"} onClick={() => {}}>
          Regular Button
        </Button>

        {/* Button[variant="regular" size="md"] */}
        <Button variant={"regular"} size={"md"} onClick={() => {}}>
          Regular MD
        </Button>

        {/* Button[variant="regular" size="md" type="button"] */}
        <Button
          variant={"regular"}
          size={"md"}
          type="button"
          onClick={() => {}}
        >
          Regular MD
        </Button>

        {/* Button[variant="regular" size="sm"] */}
        <Button variant={"regular"} size={"sm"} onClick={() => {}}>
          Regular SM
        </Button>

        {/* Button[variant="link"] */}
        <Button variant={"link"} onClick={() => {}}>
          Link Button
        </Button>

        {/* Button[variant="link" size="md"] */}
        <Button variant={"link"} size={"md"} onClick={() => {}}>
          Link MD
        </Button>

        {/* Button[variant="link" size="sm"] */}
        <Button variant={"link"} size={"sm"} onClick={() => {}}>
          Link SM
        </Button>

        {/* Button[variant="login"] */}
        <Button variant={"login"} onClick={() => {}}>
          Login Button
        </Button>

        {/* Button[variant="login" size="md"] */}
        <Button variant={"login"} size={"md"} onClick={() => {}}>
          Login MD
        </Button>

        {/* Button[variant="login" size="md" type="submit"] */}
        <Button variant={"login"} size={"md"} type="submit" onClick={() => {}}>
          Login MD
        </Button>

        {/* Button[variant="login" size="sm"] */}
        <Button variant={"login"} size={"sm"} onClick={() => {}}>
          Hello, Sign in:)
        </Button>

        {/* Button[disabled] */}
        <Button disabled onClick={() => {}}>
          Disabled
        </Button>

        {/* Button[variant="regular" asChild]>Link[href="/"] */}
        <Button variant="regular" asChild>
          <Link href={"/"}>Take me home</Link>
        </Button>

        {/* Button[asChild]>label>input[type="file" id="srt" name="srt" accept=".srt" required] */}
        <Button asChild>
          <label>
            Upload subtitles:)
            <input
              type="file"
              id="srt"
              name="srt"
              accept=".srt"
              required
              className="hidden"
              onChange={(event) => {
                console.log(event.target.files);
              }}
            />
          </label>
        </Button>
      </section>
      <section className="flex flex-col items-start gap-5 pt-5">
        <h2 className="font-primary mb-6 font-bold">Spinner Examples</h2>
        {/* Spinner */}
        <Spinner />

        {/* Spinner[color="#000" width=32 height=32] */}
        <Spinner color="#000" width={32} height={32} />

        {/* Spinner[color="var(--color-primary)"] */}
        <Spinner color="var(--color-primary)" width={40} height={40} />
      </section>
    </div>
  );
};

export default Generic;
