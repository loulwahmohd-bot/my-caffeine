import Common "../types/common";
import Types "../types/session";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  // Characters used for code generation
  let CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let CHARS_SIZE : Nat = 32;

  // Generate a unique 6-char alphanumeric session code
  public func generateCode(sessions : Map.Map<Common.SessionId, Types.SessionInternal>, seed : Nat) : Common.SessionId {
    let chars = CHARS.toArray();
    var attempt = seed;
    var found = "";
    var done = false;
    while (not done) {
      var n = attempt;
      var code = "";
      for (_ in Nat.range(0, 6)) {
        let idx = n % CHARS_SIZE;
        code := code # Text.fromChar(chars[idx]);
        n := n / CHARS_SIZE;
      };
      switch (sessions.get(code)) {
        case null { found := code; done := true };
        case (_)  { attempt += 1 };
      };
    };
    found;
  };

  // Create a new session and insert into the map; returns the session id (code)
  public func create(
    sessions  : Map.Map<Common.SessionId, Types.SessionInternal>,
    teacherId : Common.UserId,
    seed      : Nat,
    now       : Common.Timestamp,
  ) : Common.SessionId {
    let code = generateCode(sessions, seed);
    let session : Types.SessionInternal = {
      id        = code;
      teacherId;
      var status = #active;
      createdAt  = now;
    };
    sessions.add(code, session);
    code;
  };

  // End an active session
  public func endSession(
    sessions  : Map.Map<Common.SessionId, Types.SessionInternal>,
    sessionId : Common.SessionId,
    callerId  : Common.UserId,
  ) : Common.Result<(), Text> {
    switch (sessions.get(sessionId)) {
      case null { #err("Session not found") };
      case (?s) {
        if (s.teacherId != callerId) {
          return #err("Not authorized");
        };
        s.status := #ended;
        #ok(());
      };
    };
  };

  // Get session by id (returns public view)
  public func get(
    sessions  : Map.Map<Common.SessionId, Types.SessionInternal>,
    sessionId : Common.SessionId,
  ) : ?Types.Session {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?s) ?toPublic(s);
    };
  };

  // Convert internal to public (strips var fields)
  public func toPublic(s : Types.SessionInternal) : Types.Session {
    {
      id        = s.id;
      teacherId = s.teacherId;
      status    = s.status;
      createdAt = s.createdAt;
    };
  };
};
