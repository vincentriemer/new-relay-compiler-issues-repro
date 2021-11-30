import { EntryPoint } from "react-relay";

import AppQueryParameters from "./__generated__/AppQuery$Parameters";
import JSResource from "./JSResource";

type EntryPointParams = Readonly<{}>;
const AppEntryPoint: EntryPoint<typeof import("./App"), EntryPointParams> = {
  getPreloadProps: (params: EntryPointParams) => {
    return {
      queries: {
        appQueryRef: {
          parameters: AppQueryParameters,
        },
      },
    };
  },
  root: JSResource("App", () => import("./App")),
};

export default AppEntryPoint;
