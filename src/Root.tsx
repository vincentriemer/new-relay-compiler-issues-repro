import { useEffect } from "react";
import { EntryPointContainer, useEntryPointLoader, useRelayEnvironment } from "react-relay";

import AppEntryPoint from "./App.entrypoint";

export default function Root() {
  const relayEnvironment = useRelayEnvironment();
  const [entryPointReference, loadEntryPoint, disposeEntryPoint] =
    useEntryPointLoader(
      {
        getEnvironment() {
          return relayEnvironment;
        },
      },
      AppEntryPoint
    );
  useEffect(() => {
    loadEntryPoint({});
    return () => {
      disposeEntryPoint();
    };
  }, []);

  return entryPointReference != null ? (
    <EntryPointContainer entryPointReference={entryPointReference} props={{}}  />
  ) : null;
}
