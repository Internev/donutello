Hi there, this is a little app that displays some info from the Anilist public GraphQL API.

Some notes:
- I initially started with next 15 and chakra UI v3. This was a terrible idea. I had a real bad time for an hour or so before giving up. Chakra 3 doesn't seem quite ready for primetime, and certainly didn't get along with next 15 or react 19. Next-auth also didn't get along well with recent react versions, except in canary. Things improved once I moved back to next 14 and chakra 2, in part because it meant LLMs with earlier data cutoffs were still (somewhat) helpful. This included Claude, Copilot, and whatever Cursor uses under the hood. 

- The app completes the listed steps, and includes a few next features that I thought it might be nice to show I know about: suspense fallbacks, error boundaries, server actions, parallel routes, and a moderate effort to maintain server/client side rendering in sensible ways. I included a postgres DB because I realised that Vercel offer it on free tier - something I wish I'd known earlier for personal projects. I used codegen for nicer query hooks and types. I got a robot to write some docstrings, and to put together an example test to show I know tests exist. I just put the user details into the session, if I'd introduced favourites (as talked about below) I might have used context or perhaps the Apollo cache. Regarding the UI: while I work really well with a designer I'm not a designer myself, as will become apparent.

- A/B testing sketch: at the last minute a friend pointed out that A/B testing would be neat to demo. So I've made a very brief sketch whereby the little ⭐️ that denotes a popular anime is being tested: does noting popular animes encourage more user clicks? Does it then lead to more favourites? etc. It could be an interesting experiment. To try it yourself, the user/job "donut"/"donut" is in group A (without star), and "bagel"/"bagel" is in group B (with star). Obviously the specific code methodology leaves plenty to be desired, but hopefully you get the idea.

- You'll also see a few references to "Favourites" - my imagined user would be visiting the site to either keep note of anime they've watched, or assemble a list of things they wanted to watch. So my DB has a jsonb column for favourites, and I originally intended the details page to save the id of the anime into a Set I could then save/use in the UI. This seemed like overkill so I've left it as an exercise for your imagination, plus a few stubs here and there.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

