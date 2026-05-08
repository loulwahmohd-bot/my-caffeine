import { cn } from "@/lib/utils";
import type { Question } from "@/types";
import { useState } from "react";

interface Props {
  question: Question;
  onAnswer?: (correct: boolean, choiceId: bigint) => void;
  showResult?: boolean;
  disabled?: boolean;
  index?: number;
}

const LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "سهل", color: "bg-green-100 text-green-800" },
  2: { label: "متوسط", color: "bg-amber-100 text-amber-800" },
  3: { label: "صعب", color: "bg-red-100 text-red-800" },
};

export function QuestionCard({
  question,
  onAnswer,
  showResult = false,
  disabled = false,
  index = 0,
}: Props) {
  const [selected, setSelected] = useState<bigint | null>(null);
  const level = question.level ? Number(question.level) : null;
  const levelInfo = level ? LEVEL_LABELS[level] : null;

  const handleChoice = (choiceId: bigint, correct: boolean) => {
    if (disabled || selected !== null) return;
    setSelected(choiceId);
    onAnswer?.(correct, choiceId);
  };

  return (
    <div
      data-ocid={`question.card.${index + 1}`}
      className="bg-card rounded-xl border border-border p-5 shadow-xs space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-foreground font-semibold leading-relaxed text-base flex-1">
          {index + 1}. {question.text}
        </p>
        {levelInfo && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
              levelInfo.color,
            )}
          >
            {levelInfo.label}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        {question.choices.map((choice, ci) => {
          const isSelected = selected === choice.id;
          const isCorrect = choice.correct;
          let className =
            "w-full text-right px-4 py-2.5 rounded-lg border text-sm transition-smooth cursor-pointer ";

          if (showResult && selected !== null) {
            if (isCorrect)
              className +=
                "bg-green-50 border-green-400 text-green-800 font-medium";
            else if (isSelected && !isCorrect)
              className += "bg-red-50 border-red-400 text-red-800";
            else
              className += "bg-card border-border text-foreground opacity-60";
          } else if (isSelected) {
            className +=
              "bg-primary/10 border-primary text-foreground font-medium";
          } else {
            className +=
              "bg-background border-border text-foreground hover:bg-muted hover:border-primary/40";
          }

          return (
            <button
              key={String(choice.id)}
              type="button"
              data-ocid={`question.choice.${ci + 1}`}
              className={className}
              onClick={() => handleChoice(choice.id, choice.correct)}
              disabled={disabled || selected !== null}
            >
              <span className="font-bold me-2">{["أ", "ب", "ج", "د"][ci]}</span>
              {choice.text}
            </button>
          );
        })}
      </div>

      {showResult && selected !== null && question.explanation && (
        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
          💡 {question.explanation}
        </p>
      )}
    </div>
  );
}
