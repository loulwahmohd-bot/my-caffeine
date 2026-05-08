import Map "mo:core/Map";
import SessionTypes "types/session";
import StudentTypes "types/student";
import QuestionTypes "types/question";
import AssignmentTypes "types/assignment";
import Common "types/common";
import SessionApi "mixins/session-api";
import StudentApi "mixins/student-api";
import QuestionApi "mixins/question-api";
import AssignmentApi "mixins/assignment-api";
import List "mo:core/List";

actor {
  // --- Stable state (enhanced orthogonal persistence) ---
  let sessions    = Map.empty<Common.SessionId, SessionTypes.SessionInternal>();
  let students    = Map.empty<Common.UserId, StudentTypes.StudentInternal>();
  let questions   = Map.empty<Nat, QuestionTypes.QuestionInternal>();
  let assignments = Map.empty<Nat, AssignmentTypes.Assignment>();
  let submissions = Map.empty<(Nat, Common.UserId), AssignmentTypes.Submission>();

  let sessionCounter : List.List<Nat> = List.singleton(0);
  let nextQId        : List.List<Nat> = List.singleton(0);
  let nextAId        : List.List<Nat> = List.singleton(0);

  // --- Mixin composition ---
  include SessionApi(sessions, students, sessionCounter);
  include StudentApi(students);
  include QuestionApi(questions, nextQId);
  include AssignmentApi(assignments, submissions, students, nextAId);
};
