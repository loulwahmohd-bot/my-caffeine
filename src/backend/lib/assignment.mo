import Debug "mo:core/Debug";
import Common "../types/common";
import Types "../types/assignment";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  // Teacher creates an assignment — auto-published to all session students
  public func create(
    assignments : Map.Map<Nat, Types.Assignment>,
    nextId      : Nat,
    sessionId   : Common.SessionId,
    title       : Text,
    atype       : Types.AssignmentType,
    content     : Text,
    now         : Common.Timestamp,
  ) : Nat {
    Debug.todo()
  };

  // List assignments for a session
  public func listBySession(
    assignments : Map.Map<Nat, Types.Assignment>,
    sessionId   : Common.SessionId,
  ) : [Types.Assignment] {
    Debug.todo()
  };

  // Delete an assignment
  public func remove(
    assignments : Map.Map<Nat, Types.Assignment>,
    id          : Nat,
  ) : () {
    Debug.todo()
  };

  // Student submits an answer
  public func submit(
    submissions  : Map.Map<(Nat, Common.UserId), Types.Submission>,
    assignmentId : Nat,
    userId       : Common.UserId,
    sessionId    : Common.SessionId,
    answer       : Text,
    now          : Common.Timestamp,
  ) : Common.Result<(), Text> {
    Debug.todo()
  };

  // Teacher grades a submission
  public func grade(
    submissions  : Map.Map<(Nat, Common.UserId), Types.Submission>,
    assignmentId : Nat,
    userId       : Common.UserId,
    grade        : Nat,
    feedback     : Text,
  ) : Common.Result<(), Text> {
    Debug.todo()
  };

  // Get all submissions for an assignment (teacher view)
  public func submissionsByAssignment(
    submissions  : Map.Map<(Nat, Common.UserId), Types.Submission>,
    assignmentId : Nat,
  ) : [Types.SubmissionPublic] {
    Debug.todo()
  };

  // Get all submissions by a student (student view)
  public func submissionsByStudent(
    submissions : Map.Map<(Nat, Common.UserId), Types.Submission>,
    userId      : Common.UserId,
  ) : [Types.SubmissionPublic] {
    Debug.todo()
  };

  // Convert internal submission to public
  public func submissionToPublic(s : Types.Submission) : Types.SubmissionPublic {
    Debug.todo()
  };
};
