# New Relay Compiler/Entrypoint OSS Env Issues

## Reproduction Steps

1) clone repo
2) run `npm install`
3) run `npm test`

### NOTE

* This should theoretically run the relay compiler and then run the typescript compiler. The tsc run currently fails due to (at least) the issues that are enummerated in the next section
* There is no expectation that the code that comes out of the TS compiler is runnable as that isn't within the scope of this minimal repro
* If you get the current `relay.config.js` working you should also try to uncomment the multi-project version inside it to see if that works as well

## Explicit Issues Encountered (so far)

* `relay-compiler`
  1) New rust compiler requires watchman for non-watch build (the docs suggest otherwise)
  2) `$Parameters` files are not generated when you have a persistConfig & query is marked as @preloadable
* `relay.config.js`
  1) `params` key required in `persistConfig` section of relay config
  2) `persistConfig` does not work in a multi-project config
* `src/App.tsx`
  1) The `AppQuery` Typescript type imported from `__generated__/AppQuery.graphql` is not emitted by the new relay-compiler
* `src/Post.tsx`
  1) The fragment Typescript type `Post_submission$key` emitted by the compiler contains a `" $fragmentSpreads"` key while the `useFragment` type expects a `" $fragmentRefs"` key.

