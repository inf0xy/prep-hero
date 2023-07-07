import { Session, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    session: {
      user: {
        _id: string;
        name: string;
        email: string;
        account_type: string;
        image?: string;
      };
    } & DefaultSession['user'];
    id: string;
  }
}
