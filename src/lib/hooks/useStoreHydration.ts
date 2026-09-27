import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Hook to ensure client components only render persistent store values after mounting on client.
 * Uses React's useSyncExternalStore pattern to prevent hydration mismatch and effect warnings.
 */
export function useStoreHydration(storeHasHydrated: boolean = true): boolean {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return isMounted && storeHasHydrated;
}
