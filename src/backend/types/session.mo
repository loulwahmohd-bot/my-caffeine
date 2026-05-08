import Common "common";
module {
  public type SessionStatus = { #active; #ended };

  // Internal (contains mutable fields)
  public type SessionInternal = {
    id          : Common.SessionId;
    teacherId   : Common.UserId;
    var status  : SessionStatus;
    createdAt   : Common.Timestamp;
  };

  // API boundary (immutable, shared)
  public type Session = {
    id        : Common.SessionId;
    teacherId : Common.UserId;
    status    : SessionStatus;
    createdAt : Common.Timestamp;
  };
};
