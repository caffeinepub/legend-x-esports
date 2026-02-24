import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type Announcement = {
    title : Text;
    body : Text;
    timestamp : Time.Time;
  };

  module Announcement {
    public func compare(a1 : Announcement, a2 : Announcement) : Order.Order {
      Int.compare(a2.timestamp, a1.timestamp);
    };
  };

  type RosterMember = {
    name : Text;
    role : Text;
    avatarUrl : Text;
  };

  let announcements = Map.empty<Text, Announcement>();
  let roster = Map.empty<Text, RosterMember>();

  public shared ({ caller }) func addAnnouncement(title : Text, body : Text) : async () {
    let announcement = {
      title;
      body;
      timestamp = Time.now();
    };
    announcements.add(title, announcement);
  };

  public shared ({ caller }) func addOrUpdateRosterMember(name : Text, role : Text, avatarUrl : Text) : async () {
    let member = {
      name;
      role;
      avatarUrl;
    };
    roster.add(name, member);
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    announcements.values().toArray().sort(); // uses Announcement.compare by default
  };

  public query ({ caller }) func getAllRosterMembers() : async [RosterMember] {
    roster.values().toArray();
  };

  public shared ({ caller }) func removeAnnouncement(title : Text) : async () {
    if (not announcements.containsKey(title)) { Runtime.trap("Announcement does not exist") };
    announcements.remove(title);
  };

  public shared ({ caller }) func removeRosterMember(name : Text) : async () {
    if (not roster.containsKey(name)) { Runtime.trap("Roster member does not exist") };
    roster.remove(name);
  };
};
