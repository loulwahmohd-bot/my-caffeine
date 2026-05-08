import Common "../types/common";
import Types "../types/question";
import Map "mo:core/Map";
import List "mo:core/List";
import QuestionLib "../lib/question";

mixin (
  questions : Map.Map<Nat, Types.QuestionInternal>,
  nextQId   : List.List<Nat>,
) {
  /// List questions with optional filters.
  public query func listQuestions(
    qtype     : ?Types.QuestionType,
    chapterId : ?Nat,
    level     : ?Nat,
    boxId     : ?Nat,
  ) : async [Types.Question] {
    QuestionLib.list(questions, qtype, chapterId, level, boxId);
  };

  /// Teacher adds a custom question.
  public shared func addQuestion(q : Types.Question) : async Nat {
    let id = nextQId.at(0);
    let newId = QuestionLib.add(questions, id, q);
    nextQId.put(0, newId + 1);
    newId;
  };

  /// Teacher updates a question.
  public shared func updateQuestion(q : Types.Question) : async Common.Result<(), Text> {
    QuestionLib.update(questions, q);
  };

  /// Teacher deletes a question.
  public shared func deleteQuestion(id : Nat) : async () {
    QuestionLib.remove(questions, id);
  };
};
