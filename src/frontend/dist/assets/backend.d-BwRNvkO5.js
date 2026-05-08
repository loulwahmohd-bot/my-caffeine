var AssignmentStatus = /* @__PURE__ */ ((AssignmentStatus2) => {
  AssignmentStatus2["graded"] = "graded";
  AssignmentStatus2["submitted"] = "submitted";
  AssignmentStatus2["pending"] = "pending";
  return AssignmentStatus2;
})(AssignmentStatus || {});
var AssignmentType = /* @__PURE__ */ ((AssignmentType2) => {
  AssignmentType2["mcq"] = "mcq";
  AssignmentType2["poll"] = "poll";
  AssignmentType2["writing"] = "writing";
  AssignmentType2["drawing"] = "drawing";
  return AssignmentType2;
})(AssignmentType || {});
var QuestionType = /* @__PURE__ */ ((QuestionType2) => {
  QuestionType2["exam"] = "exam";
  QuestionType2["game"] = "game";
  QuestionType2["grammar"] = "grammar";
  QuestionType2["writing"] = "writing";
  QuestionType2["chapter"] = "chapter";
  return QuestionType2;
})(QuestionType || {});
export {
  AssignmentType as A,
  QuestionType as Q,
  AssignmentStatus as a
};
