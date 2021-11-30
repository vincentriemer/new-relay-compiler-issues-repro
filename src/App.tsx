import {
  EntryPointProps,
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";

import { AppQuery } from "./__generated__/AppQuery.graphql";
import Post from "./Post";

type Queries = Readonly<{
  appQueryRef: PreloadedQuery<AppQuery>;
}>;
type PreloadedEntrypoints = Readonly<{}>;
type RuntimeProps = Readonly<{}>;
type ExtraProps = Readonly<{}>;
type Props = EntryPointProps<
  Queries,
  PreloadedEntrypoints,
  RuntimeProps,
  ExtraProps
>;

export default function App(props: Props) {
  const { appQueryRef } = props.queries;

  const data = usePreloadedQuery<AppQuery>(
    graphql`
      query AppQuery @preloadable {
        viewer {
          submission(name: "t3_qvyl2j") {
            ...Post_submission
          }
        }
      }
    `,
    appQueryRef
  );

  return <Post submission={data.viewer.submission} />;
}
