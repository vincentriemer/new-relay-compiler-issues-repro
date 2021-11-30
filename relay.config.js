// single-project config (works)
module.exports = {
  "src": "./src",
  "schema": "./schema.graphql",
  "artifactDirectory": "./src/__generated__",
  "language": "typescript",
  "persistConfig": {
    "url": "http://localhost:3000",
    "params": {}
  }
};

// multi-project config (doesn't work with persistConfig)
// module.exports = {
//   root: __dirname,
//   sources: {
//     src: "testproject",
//   },
//   projects: {
//     testproject: {
//       schema: "schema.graphql",
//       language: "typescript",
//       // if you comment this out the build will succeed
//       persistConfig: {
//         url: "http://localhost:3000",
//         params: {},
//       },
//     },
//   },
// };
