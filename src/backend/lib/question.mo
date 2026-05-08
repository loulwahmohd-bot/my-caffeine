import Common "../types/common";
import Types "../types/question";
import Map "mo:core/Map";

module {
  // Seed all built-in questions into the store
  public func seedAll(
    _questions : Map.Map<Nat, Types.QuestionInternal>,
    nextId    : Nat,
  ) : Nat {
    // No built-in seed — questions are added by the teacher at runtime
    nextId;
  };

  // Get questions filtered by type, chapter, level, box
  public func list(
    questions : Map.Map<Nat, Types.QuestionInternal>,
    qtype     : ?Types.QuestionType,
    chapterId : ?Nat,
    level     : ?Nat,
    boxId     : ?Nat,
  ) : [Types.Question] {
    questions.values()
      .filter(func(qi : Types.QuestionInternal) : Bool {
        let q = qi.q;
        let matchType : Bool = switch (qtype) {
          case null true;
          case (?t) { q.qtype == t };
        };
        let matchChapter : Bool = switch (chapterId) {
          case null true;
          case (?cid) { q.chapterId == ?cid };
        };
        let matchLevel : Bool = switch (level) {
          case null true;
          case (?lv) { q.level == ?lv };
        };
        let matchBox : Bool = switch (boxId) {
          case null true;
          case (?bid) { q.boxId == ?bid };
        };
        matchType and matchChapter and matchLevel and matchBox
      })
      .map(func(qi : Types.QuestionInternal) : Types.Question { qi.q })
      .toArray();
  };

  // Get single question
  public func get(
    questions : Map.Map<Nat, Types.QuestionInternal>,
    id        : Nat,
  ) : ?Types.Question {
    switch (questions.get(id)) {
      case null null;
      case (?qi) ?qi.q;
    };
  };

  // Teacher: add a question
  public func add(
    questions : Map.Map<Nat, Types.QuestionInternal>,
    nextId    : Nat,
    q         : Types.Question,
  ) : Nat {
    let newQ = { q with id = nextId };
    let qi : Types.QuestionInternal = { var q = newQ };
    questions.add(nextId, qi);
    nextId;
  };

  // Teacher: update a question
  public func update(
    questions : Map.Map<Nat, Types.QuestionInternal>,
    q         : Types.Question,
  ) : Common.Result<(), Text> {
    switch (questions.get(q.id)) {
      case null { #err("Question not found") };
      case (?qi) { qi.q := q; #ok(()) };
    };
  };

  // Teacher: delete a question
  public func remove(
    questions : Map.Map<Nat, Types.QuestionInternal>,
    id        : Nat,
  ) : () {
    questions.remove(id);
  };
};
