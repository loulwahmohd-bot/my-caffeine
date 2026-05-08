// Cross-cutting types shared across all domains
module {
  public type UserId = Text;       // anonymous client-generated UUID
  public type SessionId = Text;    // 6-char unique code
  public type Timestamp = Int;     // Time.now() nanoseconds

  public type Result<T, E> = { #ok : T; #err : E };
};
