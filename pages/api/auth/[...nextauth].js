// import NextAuth from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the token after login
      if (user) {
        token.id = user.id; // assuming your user object has an id
        token.email = user.email; // or other user properties
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token data to the session
      session.user.id = token.id;
      session.user.email = token.email; // or other properties
      return session;
    },
  },
});
