import Common "../types/common";
import SessionTypes "../types/session";
import StudentTypes "../types/student";
import SessionLib "../lib/session";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  sessions       : Map.Map<Common.SessionId, SessionTypes.SessionInternal>,
  students       : Map.Map<Common.UserId, StudentTypes.StudentInternal>,
  sessionCounter : List.List<Nat>,
) {
  // --- Teacher ---

  /// Teacher creates a new isolated session; returns the 6-char code.
  public shared func createSession(teacherId : Common.UserId) : async Common.SessionId {
    let seed = sessionCounter.at(0);
    sessionCounter.put(0, seed + 1);
    SessionLib.create(sessions, teacherId, seed, Time.now());
  };

  /// Teacher ends the session.
  public shared func endSession(sessionId : Common.SessionId, teacherId : Common.UserId) : async Common.Result<(), Text> {
    SessionLib.endSession(sessions, sessionId, teacherId);
  };

  /// Teacher fetches session info.
  public query func getSession(sessionId : Common.SessionId) : async ?SessionTypes.Session {
    SessionLib.get(sessions, sessionId);
  };

  // --- Student ---

  /// Student joins a session with code + name + class.
  public shared func joinSession(
    sessionId : Common.SessionId,
    userId    : Common.UserId,
    name      : Text,
    className : Text,
  ) : async Common.Result<(), Text> {
    switch (sessions.get(sessionId)) {
      case null { #err("Session not found") };
      case (?s) {
        if (s.status == #ended) {
          return #err("Session has ended");
        };
        let student : StudentTypes.StudentInternal = {
          userId;
          sessionId;
          name;
          className;
          var points         = 0;
          var badges         = [];
          var chapterProgress = [];
          var examScores     = [];
          var gameScores     = [];
          var unlockedChars  = [];
          var drawingData    = "";
          var notes          = "";
          joinedAt           = Time.now();
        };
        students.add(userId, student);
        #ok(());
      };
    };
  };
};
