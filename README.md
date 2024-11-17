# Nextjs

**Automatic code-splitting and prefetching**

- To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA, where the browser loads all your application code on initial load.
- Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work.
- Furthermore, in production, whenever \<Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

**Font Optimization**

- Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.
- Cumulative Layout Shift is a metric used by Google to evaluate the performance and user experience of a website. With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.
- Next.js automatically optimizes fonts in the application when you use the next/font module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

**Image Optimization**

- The \<Image> Component is an extension of the HTML \<img> tag, and comes with automatic image optimization, such as:
- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.

**Static Rendering**

- By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.
- With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when revalidating data.
  Whenever a user visits your application, the cached result is served.

**Dynamic Rendering**

- With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page).

**Streaming**

- Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
- By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

- There are two ways you implement streaming in Next.js:
  - At the page level, with the loading.tsx file.
  - For specific components, with \<Suspense>.

**Partial Prerendering**

- A new rendering model that allows you to combine the benefits of static and dynamic rendering in the same route.
- The Suspense fallback is embedded into the initial HTML file along with the static content. At build time (or during revalidation), the static content is prerendered to create a static shell. The rendering of dynamic content is postponed until the user requests the route.
- Next.js will prerender the static parts of your route and defer the dynamic parts until the user requests them.

**Server Actions**

- React Server Actions allow you to run asynchronous code directly on the server.
- They eliminate the need to create API endpoints to mutate your data.
- Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.
- They offer an effective security solution, protecting against different types of attacks, securing your data, and ensuring authorized access
- Server Actions achieve this through techniques like POST requests, encrypted closures, strict input checks, error message hashing, and host restrictions, all working together to significantly enhance your app's safety.

**Error Handling**

- The `error.tsx` file can be used to define a UI boundary for a route segment. It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users. It mus be a client component.
- Handle 404 errors with `notFound` function. `not-found.tsx` file will be created.

**Easy Authentication**

- NextAuth.js abstracts away much of the complexity involved in managing sessions, sign-in and sign-out, and other aspects of authentication.
- While you can manually implement these features, the process can be time-consuming and error-prone.
- NextAuth.js simplifies the process, providing a unified solution for auth in Next.js applications.
- _Middleware_
  - The advantage of employing Middleware is that the `protected routes` will not even start rendering until the Middleware verifies the authentication, enhancing both the security and performance of your application.
- Steps
- `auth.config.ts` Create an object with pages, callbacks and providers which staisfies NextAuthConfig.
- `auth.ts` It will call NextAuth and will pass `auth.config.ts` with providers inside it & will return `{ auth, signIn, signOut }`.
- `middleware.ts`

**Catch-all Segments**

- `app/shop/[...slug]/page.js` will match _/shop/clothes_, but also _/shop/clothes/tops_, _/shop/clothes/tops/t-shirts_, and so on.

**Optional Catch-all Segments**

- `app/shop/[[...slug]]/page.js` will also match `/shop`, in addition to `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`.

**Rendering**
**Server Side Rendering**
- The rendering work is split into chunks: by individual `route segments` and `Suspense Boundaries`.
- Each chunk is rendered in two steps:
  - React renders Server Components into a special data format called the `React Server Component Payload (RSC Payload)`.
  - Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML on the server.
  - Then, on the client:
    - The HTML is used to immediately show a fast non-interactive preview of the route - this is for the initial page load only.
    - The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
    - `Reconciliation`: The process React uses to compare the server-rendered content with the client-side content and efficiently update the DOM to make sure they are synchronized.
    - The JavaScript instructions are used to hydrate Client Components and make the application interactive.
    - `Hydration`: The process of making a static, server-rendered HTML page interactive by attaching JavaScript functionality to it.

**Client Side Rendering**
- Initial Page Load 
 - To optimize the initial page load, Next.js will use React's APIs to render a static HTML preview on the server for both Client and Server Components
 - Rendering happens same as Server side rendering
- Subsequent Navigations
  - On subsequent navigations, Client Components are rendered entirely on the client, without the server-rendered HTML.
  - This means the Client Component JavaScript bundle is downloaded and parsed. Once the bundle is ready, React will use the RSC Payload to reconcile the Client and Server Component trees, and update the DOM.
