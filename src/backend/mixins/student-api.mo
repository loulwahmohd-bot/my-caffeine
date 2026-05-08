import Common "../types/common";
import Types "../types/student";
import Map "mo:core/Map";
import StudentLib "../lib/student";

mixin (
  students : Map.Map<Common.UserId, Types.StudentInternal>,
) {
  // --- Teacher / polling ---

  /// List all students in a session (teacher dashboard, polling).
  public query func listStudents(sessionId : Common.SessionId) : async [Types.Student] {
    StudentLib.listBySession(students, sessionId);
  };

  /// Get a single student's full profile.
  public query func getStudent(userId : Common.UserId) : async ?Types.Student {
    StudentLib.get(students, userId);
  };

  /// Teacher grants bonus points.
  public shared func grantPoints(userId : Common.UserId, delta : Nat) : async Common.Result<Nat, Text> {
    StudentLib.addPoints(students, userId, delta);
  };

  /// Teacher awards a badge.
  public shared func awardBadge(userId : Common.UserId, badge : Types.Badge) : async Common.Result<(), Text> {
    StudentLib.awardBadge(students, userId, badge);
  };

  // --- Student self-update ---

  /// Student submits chapter score.
  public shared func submitChapterProgress(userId : Common.UserId, progress : Types.ChapterProgress) : async Common.Result<(), Text> {
    StudentLib.updateChapterProgress(students, userId, progress);
  };

  /// Student submits exam score.
  public shared func submitExamScore(userId : Common.UserId, score : Types.ExamScore) : async Common.Result<(), Text> {
    StudentLib.updateExamScore(students, userId, score);
  };

  /// Student submits game score.
  public shared func submitGameScore(userId : Common.UserId, score : Types.GameScore) : async Common.Result<(), Text> {
    StudentLib.updateGameScore(students, userId, score);
  };

  /// Student saves drawing.
  public shared func saveDrawing(userId : Common.UserId, data : Text) : async Common.Result<(), Text> {
    StudentLib.saveDrawing(students, userId, data);
  };

  /// Student saves notes.
  public shared func saveNotes(userId : Common.UserId, notes : Text) : async Common.Result<(), Text> {
    StudentLib.saveNotes(students, userId, notes);
  };

  // --- Leaderboard ---

  /// Ranked leaderboard for a session.
  public query func getLeaderboard(sessionId : Common.SessionId) : async [Types.Student] {
    StudentLib.leaderboard(students, sessionId);
  };

  /// Class-wide completion percentage for teacher.
  public query func classCompletion(sessionId : Common.SessionId) : async Nat {
    StudentLib.classCompletionPercent(students, sessionId);
  };
};
