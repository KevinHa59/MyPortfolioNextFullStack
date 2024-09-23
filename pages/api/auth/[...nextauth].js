// import NextAuth from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import axios from "axios";

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
  callbacks: {
    async signIn({ user, profile, account }) {
      const url =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
          : process.env.NEXT_PUBLIC_PRODUCTION_URL;
      // if google auth
      if (account.provider === "google") {
        // if new user (there is no field created)
        if (user.createdAt === undefined) {
          try {
            // get all user types
            const _userTypes = await axios.get(`${url}/api/userTypes`);
            // get id of type User
            const userTypeID = _userTypes.data.find(
              (type) => type.type === "User"
            ).id;
            // update firstName, lastName, createdAt, updatedAt, and userTypeID
            const _user = await axios.put(`${url}/api/users`, {
              id: user.id,
              firstName: profile.given_name,
              lastName: profile.family_name,
              createdAt: new Date(),
              updatedAt: new Date(),
              userTypeID: userTypeID,
            });
            return _user.data;
          } catch (error) {
            console.log(error);
          }
        }

        return user;
      }
    },
  },
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // Add user information to the token after login
  //     if (user) {
  //       console.log("------,", account);
  //       token.id = user.id; // assuming your user object has an id
  //       token.email = user.email; // or other user properties
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Pass token data to the session
  //     session.user.id = token.id;
  //     session.user.email = token.email; // or other properties
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
});
