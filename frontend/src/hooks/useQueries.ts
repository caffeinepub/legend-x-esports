import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Announcement, RosterMember } from '../backend';

// ─── Announcements ────────────────────────────────────────────────────────────

export function useAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, body }: { title: string; body: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addAnnouncement(title, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useRemoveAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.removeAnnouncement(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

// ─── Roster ───────────────────────────────────────────────────────────────────

export function useRoster() {
  const { actor, isFetching } = useActor();

  return useQuery<RosterMember[]>({
    queryKey: ['roster'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRosterMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddOrUpdateRosterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, role, avatarUrl }: { name: string; role: string; avatarUrl: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addOrUpdateRosterMember(name, role, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roster'] });
    },
  });
}

export function useRemoveRosterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.removeRosterMember(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roster'] });
    },
  });
}
