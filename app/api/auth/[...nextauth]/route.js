import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
    clientId: "502937070137-vonq03b303p54to45rn2tm3gq353t1cd.apps.googleusercontent.com",
    clientSecret: "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",
  }),
    
  ],
})

export { handler as GET, handler as POST }