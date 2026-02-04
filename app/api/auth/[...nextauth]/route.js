import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
    clientId: "YOUR CLIENT ID ",
    clientSecret: "YOUR CLIENT SECRET ID",
  }),
    
  ],
})

export { handler as GET, handler as POST }
