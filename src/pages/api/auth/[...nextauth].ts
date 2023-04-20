import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import {
  confirmAndFetchUser,
  createUser,
  fetchUser
} from '@/lib/database/users';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      // @ts-ignore
      async authorize(credentials: Record<string, string>) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await confirmAndFetchUser(email, password);
        if (result.isConfirmed) {
          return { email };
        }
        throw new Error('Invalid credentials'); // throw error to the frontend when failed validation
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    // @ts-ignore
    async signIn(user, account, profile) {
      if (user.account.provider === 'credentials') {
        return true;
      }
      let email = user.user.email;
      let oauth_type = user.account.provider;
      let name = user.user.name;
      let google_id = user.account.provider === 'google' ? user.user.id : null;
      let github_id = user.account.provider === 'github' ? user.user.id : null;
      let facebook_id =
        user.account.provider === 'facebook' ? user.user.id : null;

      try {
        await createUser(
          name,
          email,
          null,
          oauth_type,
          google_id,
          github_id,
          facebook_id
        );
      } catch (err: any) {
        if (!err.message.includes('duplicate key error')) {
          console.error(err);
          return false;
        }
      }

      if (oauth_type === 'google') {
        return (
          user.profile.email_verified &&
          user.profile.email.endsWith('@gmail.com')
        );
      } else if (oauth_type === 'github' && user.account.access_token.length) {
        return true;
      } else if (
        oauth_type === 'facebook' &&
        user.account.access_token.length
      ) {
        return true;
      }
      return false;
    },
    // @ts-ignore
    async session(session: any, user: any) {
      let oauth_type = null;
      try {
        if (
          session.token.picture &&
          session.token.picture.includes('https://lh3.googleusercontent.com')
        ) {
          oauth_type = 'google';
        } else if (
          session.token.picture &&
          session.token.picture.includes(
            'https://avatars.githubusercontent.com'
          )
        ) {
          oauth_type = 'github';
        } else if (
          session.token.picture &&
          session.token.picture.includes('https://scontent') &&
          session.token.picture.includes('fbcdn')
        ) {
          oauth_type = 'facebook';
        }

        const fetchedUser = await fetchUser(
          oauth_type!,
          session.session.user.email
        );

        if (fetchedUser) {
          return {
            ...session,
            session: {
              ...session.session,
              user: {
                ...session.session.user,
                ...fetchedUser
              }
            }
          };
        }
        return session;
      } catch (err: any) {
        if (!err.message.includes('duplicate key error')) {
          console.error(err);
        }
        return false;
      }
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60 // 1d
  }
};

export default NextAuth(authOptions);
