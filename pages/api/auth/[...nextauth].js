// import NextAuth from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      userinfo: {
        url: "",
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      userinfo: {
        url: "https://graph.facebook.com/me?fields=email,first_name,last_name",
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Make sure this is set
    // You can also set expiration here if necessary
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      return user;
    },
    async jwt({ token, user, profile, account }) {
      // Add user information to the token after login
      if (user) {
        // if google auth
        if (account.provider === "google") {
          // if new user (there is no field created);
          if (user.createdAt === undefined) {
            const url =
              process.env.NODE_ENV === "development"
                ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
                : process.env.NEXT_PUBLIC_PRODUCTION_URL;
            try {
              const _membership = await axios.post(`${url}/api/memberships`, {
                userID: user.id,
              });

              // update firstName, lastName, createdAt, updatedAt, and userTypeID
              const _user = await axios.put(`${url}/api/users`, {
                id: user.id,
                firstName: profile.given_name,
                lastName: profile.family_name,
                createdAt: new Date(),
                updatedAt: new Date(),
                userTypeID: "6682ce65add598fe72845318",
                statusID: "66f36ee3758cd3ce7f207434",
              });
              return _user.data;
            } catch (error) {
              console.log(error);
            }
          }
        }

        token.id = user.id; // assuming your user object has an id
        token.email = user.email; // or other user properties
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session(session, token, user) {
      // Attach user ID from the token to the session
      if (token) {
        session.user.id = token.id; // Make sure token.id is defined
      }
      const url =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
          : process.env.NEXT_PUBLIC_PRODUCTION_URL;
      const _user = await axios.get(`${url}/api/users/email`, {
        params: {
          email: session.session.user.email,
        },
      });
      const membership = _user.data.membership;
      session.session["membership"] = membership;
      return session.session;
    },
  },
});
