import test from "node:test";
import assert from "node:assert/strict";
import { buildCalendarStatuses } from "../utils/streakUtils.js";

test("buildCalendarStatuses marks missing dates as missed between known logs and today", () => {
  const waterLogs = {
    "2026-07-01": { goal: 2000, intake: 2000 },
    "2026-07-03": { goal: 2000, intake: 1500 },
  };

  const statuses = buildCalendarStatuses({
    waterLogs,
    today: "2026-07-05",
    dailyGoal: 2000,
  });

  assert.equal(statuses["2026-07-01"], "completed");
  assert.equal(statuses["2026-07-02"], "missed");
  assert.equal(statuses["2026-07-03"], "missed");
  assert.equal(statuses["2026-07-04"], "missed");
});
