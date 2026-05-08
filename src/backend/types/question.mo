module {
  public type QuestionType = {
    #chapter;    // chapter MCQ
    #grammar;    // grammar MCQ
    #exam;       // exam MCQ
    #game;       // game fill / MCQ
    #writing;    // open-ended written
  };

  public type Choice = {
    id      : Nat;
    text    : Text;
    correct : Bool;
  };

  public type Question = {
    id          : Nat;
    qtype       : QuestionType;
    chapterId   : ?Nat;   // 1-38 for chapter/exam, null for grammar/game
    level       : ?Nat;   // exam level 1-5 or difficulty 1-3
    boxId       : ?Nat;   // game box 1-3
    text        : Text;
    choices     : [Choice];  // empty for writing questions
    explanation : Text;
  };

  // Mutable wrapper for teacher edits
  public type QuestionInternal = {
    var q : Question;
  };
};
