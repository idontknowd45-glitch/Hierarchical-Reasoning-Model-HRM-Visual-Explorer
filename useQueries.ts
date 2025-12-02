import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useArchitectureExplanations() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, string]>>({
    queryKey: ['architectureExplanations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArchitectureExplanations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBenchmarkData() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, string]>>({
    queryKey: ['benchmarkData'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBenchmarkData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReadmeContent() {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ['readmeContent'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getReadmeContent();
    },
    enabled: !!actor && !isFetching,
  });
}
