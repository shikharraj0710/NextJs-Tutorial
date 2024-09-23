import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// The advantage of employing Middleware for this task is that the protected routes will not even start rendering until the Middleware verifies the authentication, enhancing both the security and performance of your application.

export default NextAuth(authConfig).auth;
 
export const config = {
    // Any path that does not start with api, _next/static, _next/image, and does not end with .png.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], 
};