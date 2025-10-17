import dbConnect from "./back-end/lib/dbConnect";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await dbConnect();
  }
}
