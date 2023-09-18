import Nextauth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { apiURLs } from "@/app/url.config";

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Strong password",
        },
      },
      async authorize(credentials) {
        // send data to server
        const { data } = await axios.post(
          apiURLs.auth.login.post,
          { email: credentials.email, password: credentials.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.success) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler= Nextauth(options);

export { handler as GET, handler as POST }