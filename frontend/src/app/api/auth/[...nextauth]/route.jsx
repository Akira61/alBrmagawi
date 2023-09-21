import Nextauth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcrypt";
import { apiURLs } from "@/app/url.config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const options = {
  pages: {
    signIn:'/login'
  },
  session:{
    strategy:'jwt'
  },
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
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.users.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        
        // check if user verified
        if(!user.verified){
          return new Error('your email is not verified')
        }

        return {
          id: user.id,
          email : user.email,
          name: user.first_name + ' '+user.last_name,
        }
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