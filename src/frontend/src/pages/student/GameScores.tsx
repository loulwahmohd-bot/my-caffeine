import { useStudent } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";

const BOX_NAMES: Record<number, string> = {
  1: "أكمل الفراغ",
  2: "صفات الشخصيات",
  3: "تصرفات ودلالات",
};

export default function GameScores() {
  const { userId } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);

  const scores = student?.gameScores ?? [];

  // Aggregate per boxId
  const byBox: Record<
    number,
    { best: number; attempts: number; total: number }
  > = {};
  for (const s of scores) {
    const box = Number(s.boxId);
    const pts = Number(s.score);
    if (!byBox[box]) byBox[box] = { best: 0, attempts: 0, total: 0 };
    byBox[box].attempts += 1;
    byBox[box].total += pts;
    if (pts > byBox[box].best) byBox[box].best = pts;
  }

  const totalGamePoints = scores.reduce((a, s) => a + Number(s.score), 0);
  const boxIds = [1, 2, 3];

  return (
    <div className="space-y-5" dir="rtl" data-ocid="games.page">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">🎮 درجات الألعاب</h1>
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-2">
          <span className="text-xs text-muted-foreground">إجمالي النقاط</span>
          <p className="text-xl font-bold text-primary">{totalGamePoints}</p>
        </div>
      </div>

      {/* Box cards */}
      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-8"
          data-ocid="games.loading_state"
        >
          جاري التحميل...
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          data-ocid="games.boxes"
        >
          {boxIds.map((box) => {
            const data = byBox[box];
            return (
              <div
                key={box}
                data-ocid={`games.box.${box}`}
                className="bg-card border border-border rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  <h3 className="font-bold text-foreground">
                    {BOX_NAMES[box] ?? `صندوق ${box}`}
                  </h3>
                </div>
                {data ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/10 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {data.best}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          أفضل محاولة
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-foreground">
                          {data.attempts}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          عدد المحاولات
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-2 text-center">
                      <p className="text-sm font-medium text-foreground">
                        مجموع النقاط:{" "}
                        <span className="font-bold text-primary">
                          {data.total}
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    className="text-center py-6"
                    data-ocid={`games.box.${box}.empty_state`}
                  >
                    <p className="text-3xl mb-1">🔒</p>
                    <p className="text-xs text-muted-foreground">
                      لم تلعبي بعد
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Attempts table */}
      {scores.length > 0 && (
        <div
          className="bg-card border border-border rounded-xl overflow-hidden"
          data-ocid="games.attempts_table"
        >
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground text-sm">
              سجل المحاولات
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="text-right px-4 py-2 text-xs text-muted-foreground">
                    #
                  </th>
                  <th className="text-right px-4 py-2 text-xs text-muted-foreground">
                    الصندوق
                  </th>
                  <th className="text-right px-4 py-2 text-xs text-muted-foreground">
                    النقاط
                  </th>
                  <th className="text-right px-4 py-2 text-xs text-muted-foreground">
                    المجموع
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s, i) => (
                  <tr
                    key={`game-${i}-${String(s.score)}`}
                    data-ocid={`games.attempt.${i + 1}`}
                    className="border-b border-border last:border-0 hover:bg-muted/10"
                  >
                    <td className="px-4 py-2 text-muted-foreground text-xs">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {BOX_NAMES[Number(s.boxId)] ?? `صندوق ${s.boxId}`}
                    </td>
                    <td className="px-4 py-2 font-bold text-primary">
                      {String(s.score)}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {String(s.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
