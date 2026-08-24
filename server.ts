import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

function getGradeLabel(grade: number): string {
  switch (grade) {
    case 8:
      return "8th Grader";
    case 9:
      return "9th Grader (Freshman)";
    case 10:
      return "10th Grader (Sophomore)";
    case 11:
      return "11th Grader (Junior)";
    case 12:
      return "12th Grader (Senior)";
    default:
      return `${grade}th Grader`;
  }
}

/**
 * Calculates current grade level dynamically based on April 1 academic promotion.
 * - Current baseline in 2026: 8th Grader
 * - Promoted on every April 1st (April 1 2027 -> 9th, April 1 2028 -> 10th, April 1 2029 -> 11th, April 1 2030 -> 12th)
 * - Capped at 12th grade
 */
export function calculateAcademicGrade(date: Date = new Date()) {
  const currentYear = date.getFullYear();
  // April is index 3 (Jan=0, Feb=1, Mar=2, Apr=3)
  const isPastAprilFirst = date.getMonth() > 3 || (date.getMonth() === 3 && date.getDate() >= 1);
  
  // Academic session: from April 1 of year Y to March 31 of year Y+1
  const sessionStartYear = isPastAprilFirst ? currentYear : currentYear - 1;
  const baseSessionYear = 2026; // 2026-2027 academic session is 8th grade
  const baseGrade = 8;

  const calculatedGrade = baseGrade + (sessionStartYear - baseSessionYear);
  const grade = Math.min(12, Math.max(8, calculatedGrade));
  const isMaxGrade = grade >= 12;

  // Next promotion date is April 1 of next academic year
  const nextPromotionYear = isPastAprilFirst ? currentYear + 1 : currentYear;
  const nextPromotionDate = new Date(nextPromotionYear, 3, 1, 0, 0, 0);

  return {
    grade,
    label: getGradeLabel(grade),
    isMaxGrade,
    nextPromotionDate: nextPromotionDate.toISOString(),
    sessionStartYear,
    serverTime: date.getTime()
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // Grade Promotion Telemetry API - Updates every 1 April
  app.get("/api/grade", (_req, res) => {
    const data = calculateAcademicGrade(new Date());
    res.json(data);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Server running on http://localhost:${PORT}`);
  });
}

startServer();
