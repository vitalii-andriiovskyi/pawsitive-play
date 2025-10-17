/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";
import UserService from "./back-end/features/users/user.service";

// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // adapter: MongoDBAdapter(clientPromise), // to configure later | now get many errors to store session in DB
  providers: [
    // GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials || {};

        let user;
        try {
          user = await UserService.authViaEmail(email as string, password as string);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Something went wrong');
          }
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }
        return user as any;
      },
    }),
  ],
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },

  //   callbackUrl: {
  //     name: `__Secure-next-auth.callback-url`,
  //     options: {
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   csrfToken: {
  //     name: `__Host-next-auth.csrf-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   pkceCodeVerifier: {
  //     name: `__Secure-next-auth.pkce.code_verifier`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   state: {
  //     name: `__Secure-next-auth.state`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  // },
});
