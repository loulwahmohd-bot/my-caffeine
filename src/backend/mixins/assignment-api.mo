import Debug "mo:core/Debug";
import Common "../types/common";
import Types "../types/assignment";
import StudentTypes "../types/student";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  assignments : Map.Map<Nat, Types.Assignment>,
  submissions : Map.Map<(Nat, Common.UserId), Types.Submission>,
  students    : Map.Map<Common.UserId, StudentTypes.StudentInternal>,
  nextAId     : List.List<Nat>,
) {
  // --- Teacher ---

  /// Teacher creates an assignment (auto-published to all session students).
  public shared func createAssignment(
    sessionId : Common.SessionId,
    title     : Text,
    atype     : Types.AssignmentType,
    content   : Text,
  ) : async Nat {
    Debug.todo()
  };

  /// Teacher deletes an assignment.
  public shared func deleteAssignment(id : Nat) : async () {
    Debug.todo()
  };

  /// Teacher views all submissions for an assignment.
  public query func getSubmissions(assignmentId : Nat) : async [Types.SubmissionPublic] {
    Debug.todo()
  };

  /// Teacher grades a submission.
  public shared func gradeSubmission(
    assignmentId : Nat,
    userId       : Common.UserId,
    grade        : Nat,
    feedback     : Text,
  ) : async Common.Result<(), Text> {
    Debug.todo()
  };

  // --- Student ---

  /// Student lists assignments in their session.
  public query func listAssignments(sessionId : Common.SessionId) : async [Types.Assignment] {
    Debug.todo()
  };

  /// Student submits an answer.
  public shared func submitAssignment(
    assignmentId : Nat,
    userId       : Common.UserId,
    sessionId    : Common.SessionId,
    answer       : Text,
  ) : async Common.Result<(), Text> {
    Debug.todo()
  };

  /// Student views their own submissions.
  public query func mySubmissions(userId : Common.UserId) : async [Types.SubmissionPublic] {
    Debug.todo()
  };
};
