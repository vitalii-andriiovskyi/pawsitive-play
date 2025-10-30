import { NextRequest } from "next/server";

import { signIn, auth } from "@/auth";
import UserRepository from "@/back-end/features/user/user.repository";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let isLoggedIn = false;
  try {
    const session = await auth();
    isLoggedIn = !!session?.user?.email;
  } catch (error) {
    console.log("isLoggedIn checking failed", error);
  }

  if (isLoggedIn) {
    return Response.json("already logged in", { status: 200 });
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email: body.email,
      password: body.password,
    });
  } catch (error) {
    console.log("error", error);
    return Response.json("error", { status: 401 });
  }
  const user = await UserRepository.getByEmail(body.email);
  return Response.json(user);
}
