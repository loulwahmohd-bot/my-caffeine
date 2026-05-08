import Common "common";
module {
  // One badge per award
  public type Badge = {
    id    : Nat;
    title : Text;
  };

  // Per-chapter progress snapshot
  public type ChapterProgress = {
    chapterId    : Nat;  // 1-38
    score        : Nat;
    completed    : Bool;
  };

  // Internal student record
  public type StudentInternal = {
    userId      : Common.UserId;
    sessionId   : Common.SessionId;
    name        : Text;
    className   : Text;
    var points  : Nat;
    var badges  : [Badge];
    var chapterProgress : [ChapterProgress];  // per chapter
    var examScores      : [ExamScore];         // per level
    var gameScores      : [GameScore];
    var unlockedChars   : [Nat];              // character indices 0-11
    var drawingData     : Text;               // base64 or JSON
    var notes           : Text;
    joinedAt    : Common.Timestamp;
  };

  public type ExamScore = {
    level : Nat;  // 1-5
    score : Nat;
    total : Nat;
  };

  public type GameScore = {
    boxId : Nat;  // 1-3
    score : Nat;
    total : Nat;
  };

  // API boundary (no var fields)
  public type Student = {
    userId           : Common.UserId;
    sessionId        : Common.SessionId;
    name             : Text;
    className        : Text;
    points           : Nat;
    badges           : [Badge];
    chapterProgress  : [ChapterProgress];
    examScores       : [ExamScore];
    gameScores       : [GameScore];
    unlockedChars    : [Nat];
    joinedAt         : Common.Timestamp;
  };
};
