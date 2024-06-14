import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isPublicRoute = createRouteMatcher([
//     '/sign-in(.*)',
//     '/sign-up(.*)',
//     '/api/webhooks(.*)',
// ]);

const isPublicRoute = createRouteMatcher(['/api/webhooks(.*)']);

// Make sure that the `/api/webhooks/(.*)` route is not protected here
// export default clerkMiddleware((auth, req) => {
//     if (!isPublicRoute(req)) {
//         auth().protect();
//     }
// });

export default clerkMiddleware();

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
