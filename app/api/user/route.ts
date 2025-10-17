import { NextRequest, NextResponse } from "next/server";
import { signIn, auth, signOut } from "@/auth";
import UserRepository from "@/back-end/features/users/user.repository";
import UserService from "@/back-end/features/users/user.service";
import SignUpSchema from "@/shared/features/user/validation-schemas/user.signup.schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  if (id) {
    const user = await UserRepository.getById(id);
    return NextResponse.json(user);
  }

  if (email) {
    const user = await UserRepository.getByEmail(email);
    return NextResponse.json(user);
  }

  let sessionEmail: string | null | undefined = "";
  try {
    const session = await auth();
    sessionEmail = session?.user?.email;
  } catch (error) {
    console.log("no active session error", error);
  }

  if (sessionEmail) {
    const user = await UserRepository.getByEmail(sessionEmail);
    return NextResponse.json(user);
  }

  return Response.json(null);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await SignUpSchema.validate(body);
  } catch (error) {
    console.log("error", error);
    let errMessage = 'Wrong data';
    if (error instanceof Error) {
      errMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 403 }
    );
  }

  let result = null;
  try {
    result = await UserService.registerViaEmail(body);
  } catch (error) {
    console.log("error", error);
    let errMessage = 'User wasn\'t created';
    if (error instanceof Error) {
      errMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }

  if (result?.code === 409) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
      },
      { status: 409 }
    );
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email: body.email,
      password: body.password,
    });
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json({
    success: true,
    message: result.message,
    user: result.user,
  }, { status: result.code || 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  let sessionEmail: string | null | undefined = "";
  try {
    const session = await auth();
    sessionEmail = session?.user?.email;
  } catch (error) {
    console.log("no active session error", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (sessionEmail) {
    const user = await UserRepository.getByEmail(sessionEmail);
    if (user) {
      const updatedUser = await UserRepository.update({ ...body, _id: user._id });
      return NextResponse.json(updatedUser);
    }
  }

  return Response.json(
    { message: "Not enough permissions/data" },
    { status: 400 }
  );
}

export async function DELETE() {
  let sessionEmail: string | null | undefined = "";
  try {
    const session = await auth();
    sessionEmail = session?.user?.email;
  } catch (error) {
    console.log("no active session error", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (sessionEmail) {
    const user = await UserRepository.getByEmail(sessionEmail);
    if (user) {
      await UserRepository.disable({ _id: user._id });
      await signOut();
      return NextResponse.json({ message: "user deleted" }, { status: 204 });
    }
  }
  return Response.json(
    { message: "Not enough permissions/data" },
    { status: 400 }
  );
}
