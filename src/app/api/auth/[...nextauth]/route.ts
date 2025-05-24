import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type {User} from 'next-auth'
const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user }: {user:User}) {
            const allowedEmail = ["authastefard@proton.me", "typescriptwithkamran@gmail.com"];
            return allowedEmail.find((email) => email === user?.email) !== undefined;
             // Block sign in
        },
    },

}
const auth = NextAuth(authOptions);
export {auth as POST, auth as GET}