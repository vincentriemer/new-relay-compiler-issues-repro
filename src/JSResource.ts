import { JSResourceReference } from "react-relay";
import { lazy } from "react";

type Loader<T> = () => Promise<{ default: T }>;

/**
 * A lazy getter for the resource cache that maps module ids to module resources
 */
const getResourceMap = (() => {
  let _resourceMap: Map<string, unknown> | null = null;
  return () => {
    if (_resourceMap === null) {
      _resourceMap = new Map();
    }
    return _resourceMap;
  };
})();

class Resource<T> implements JSResourceReference<T> {
  private moduleId: string;
  private loader: Loader<T>;
  private cachedResult: T | null;
  private loadPromise: Promise<T> | null;
  private loadError: Error | null;

  constructor(moduleId: string, loader: Loader<T>) {
    this.moduleId = moduleId;
    this.loader = loader;
    this.cachedResult = null;
    this.loadPromise = null;
  }

  getModuleId(): string {
    return this.moduleId;
  }

  getModuleIfRequired(): T | null {
    return this.cachedResult;
  }

  load(): Promise<T> {
    const loader = this.loader;
    if (this.loadPromise == null) {
      this.loadPromise = loader()
        .then((promiseResult) => {
          this.cachedResult = promiseResult.default;
          return this.cachedResult;
        })
        .catch((error) => {
          this.loadError = error;
          throw this.loadError;
        });
    }
    return this.loadPromise;
  }
}

export default function JSResource<T>(
  moduleId: string,
  loader: Loader<T>
): JSResourceReference<T> {
  const resourceMap = getResourceMap();
  const cachedResource = resourceMap.get(moduleId);
  if (cachedResource != null) {
    // This is inherently not typesafe
    // @ts-ignore
    return cachedResource;
  }
  const resource = new Resource(moduleId, loader);
  resourceMap.set(moduleId, resource);
  return resource;
}
