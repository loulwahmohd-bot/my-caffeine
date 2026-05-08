import Common "../types/common";
import Types "../types/student";
import Map "mo:core/Map";
import Order "mo:core/Order";

module {
  // Register a student into a session
  public func join(
    students  : Map.Map<Common.UserId, Types.StudentInternal>,
    userId    : Common.UserId,
    sessionId : Common.SessionId,
    name      : Text,
    className : Text,
    now       : Common.Timestamp,
  ) : Common.Result<(), Text> {
    let student : Types.StudentInternal = {
      userId;
      sessionId;
      name;
      className;
      var points          = 0;
      var badges          = [];
      var chapterProgress = [];
      var examScores      = [];
      var gameScores      = [];
      var unlockedChars   = [];
      var drawingData     = "";
      var notes           = "";
      joinedAt            = now;
    };
    students.add(userId, student);
    #ok(());
  };

  // Return all students for a given session
  public func listBySession(
    students  : Map.Map<Common.UserId, Types.StudentInternal>,
    sessionId : Common.SessionId,
  ) : [Types.Student] {
    students.values()
      .filter(func(s : Types.StudentInternal) : Bool { s.sessionId == sessionId })
      .map(func(s : Types.StudentInternal) : Types.Student { toPublic(s) })
      .toArray();
  };

  // Get one student
  public func get(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
  ) : ?Types.Student {
    switch (students.get(userId)) {
      case null null;
      case (?s) ?toPublic(s);
    };
  };

  // Add points and check character unlocks
  public func addPoints(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    delta    : Nat,
  ) : Common.Result<Nat, Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) {
        s.points += delta;
        let newThreshold = s.points / 10;
        let currentUnlocked = s.unlockedChars.size();
        if (newThreshold > currentUnlocked and currentUnlocked < 12) {
          s.unlockedChars := s.unlockedChars.concat([currentUnlocked]);
        };
        #ok(s.points);
      };
    };
  };

  // Award a badge
  public func awardBadge(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    badge    : Types.Badge,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) {
        s.badges := s.badges.concat([badge]);
        #ok(());
      };
    };
  };

  // Update chapter progress
  public func updateChapterProgress(
    students  : Map.Map<Common.UserId, Types.StudentInternal>,
    userId    : Common.UserId,
    progress  : Types.ChapterProgress,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) {
        let existing = s.chapterProgress.find(func(p : Types.ChapterProgress) : Bool { p.chapterId == progress.chapterId });
        switch (existing) {
          case null {
            s.chapterProgress := s.chapterProgress.concat([progress]);
          };
          case (_) {
            s.chapterProgress := s.chapterProgress.map(func(p : Types.ChapterProgress) : Types.ChapterProgress {
              if (p.chapterId == progress.chapterId) { progress } else { p }
            });
          };
        };
        #ok(());
      };
    };
  };

  // Update exam score for a level
  public func updateExamScore(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    score    : Types.ExamScore,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) {
        let existing = s.examScores.find(func(e : Types.ExamScore) : Bool { e.level == score.level });
        switch (existing) {
          case null {
            s.examScores := s.examScores.concat([score]);
          };
          case (_) {
            s.examScores := s.examScores.map(func(e : Types.ExamScore) : Types.ExamScore {
              if (e.level == score.level) { score } else { e }
            });
          };
        };
        #ok(());
      };
    };
  };

  // Update game score for a box
  public func updateGameScore(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    score    : Types.GameScore,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) {
        let existing = s.gameScores.find(func(g : Types.GameScore) : Bool { g.boxId == score.boxId });
        switch (existing) {
          case null {
            s.gameScores := s.gameScores.concat([score]);
          };
          case (_) {
            s.gameScores := s.gameScores.map(func(g : Types.GameScore) : Types.GameScore {
              if (g.boxId == score.boxId) { score } else { g }
            });
          };
        };
        #ok(());
      };
    };
  };

  // Save drawing
  public func saveDrawing(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    data     : Text,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) { s.drawingData := data; #ok(()) };
    };
  };

  // Save notes
  public func saveNotes(
    students : Map.Map<Common.UserId, Types.StudentInternal>,
    userId   : Common.UserId,
    notes    : Text,
  ) : Common.Result<(), Text> {
    switch (students.get(userId)) {
      case null { #err("Student not found") };
      case (?s) { s.notes := notes; #ok(()) };
    };
  };

  // Leaderboard: students sorted by points descending, scoped to a session
  public func leaderboard(
    students  : Map.Map<Common.UserId, Types.StudentInternal>,
    sessionId : Common.SessionId,
  ) : [Types.Student] {
    let sessionStudents = students.values()
      .filter(func(s : Types.StudentInternal) : Bool { s.sessionId == sessionId })
      .map(func(s : Types.StudentInternal) : Types.Student { toPublic(s) })
      .toArray();
    sessionStudents.sort(func(a : Types.Student, b : Types.Student) : Order.Order {
      if (a.points > b.points) { #less }
      else if (a.points < b.points) { #greater }
      else { #equal }
    });
  };

  // Aggregate class completion percentage for teacher dashboard
  public func classCompletionPercent(
    students  : Map.Map<Common.UserId, Types.StudentInternal>,
    sessionId : Common.SessionId,
  ) : Nat {
    let sessionStudents = students.values()
      .filter(func(s : Types.StudentInternal) : Bool { s.sessionId == sessionId })
      .toArray();
    let total = sessionStudents.size();
    if (total == 0) { return 0 };
    var sumPct : Nat = 0;
    for (s in sessionStudents.values()) {
      sumPct += s.chapterProgress.size() * 100 / 38;
    };
    sumPct / total;
  };

  // Convert internal to public
  public func toPublic(s : Types.StudentInternal) : Types.Student {
    {
      userId           = s.userId;
      sessionId        = s.sessionId;
      name             = s.name;
      className        = s.className;
      points           = s.points;
      badges           = s.badges;
      chapterProgress  = s.chapterProgress;
      examScores       = s.examScores;
      gameScores       = s.gameScores;
      unlockedChars    = s.unlockedChars;
      joinedAt         = s.joinedAt;
    };
  };
};
