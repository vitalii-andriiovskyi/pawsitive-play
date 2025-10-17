import { signOut } from "@/auth";

export async function GET() {
  await signOut();
  return new Response("success", { status: 204 });
}
