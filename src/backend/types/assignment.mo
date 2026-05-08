import Common "common";
module {
  public type AssignmentType = {
    #mcq;
    #writing;
    #drawing;
    #poll;    // student self-assessment poll
  };

  public type AssignmentStatus = { #pending; #submitted; #graded };

  // Teacher-created assignment
  public type Assignment = {
    id          : Nat;
    sessionId   : Common.SessionId;
    title       : Text;
    atype       : AssignmentType;
    content     : Text;  // JSON payload (question text, options, canvas prompt, etc.)
    createdAt   : Common.Timestamp;
  };

  // Per-student submission
  public type Submission = {
    assignmentId : Nat;
    userId       : Common.UserId;
    sessionId    : Common.SessionId;
    var answer   : Text;    // JSON answer payload
    var status   : AssignmentStatus;
    var grade    : ?Nat;
    var feedback : Text;
    submittedAt  : Common.Timestamp;
  };

  // API boundary for submission
  public type SubmissionPublic = {
    assignmentId : Nat;
    userId       : Common.UserId;
    sessionId    : Common.SessionId;
    answer       : Text;
    status       : AssignmentStatus;
    grade        : ?Nat;
    feedback     : Text;
    submittedAt  : Common.Timestamp;
  };
};
