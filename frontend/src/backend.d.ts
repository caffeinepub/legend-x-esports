import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Announcement {
    title: string;
    body: string;
    timestamp: Time;
}
export interface RosterMember {
    name: string;
    role: string;
    avatarUrl: string;
}
export type Time = bigint;
export interface backendInterface {
    addAnnouncement(title: string, body: string): Promise<void>;
    addOrUpdateRosterMember(name: string, role: string, avatarUrl: string): Promise<void>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllRosterMembers(): Promise<Array<RosterMember>>;
    removeAnnouncement(title: string): Promise<void>;
    removeRosterMember(name: string): Promise<void>;
}
