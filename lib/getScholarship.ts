// lib/getScholarship.ts

export type ScholarshipTier = {
  code: string;
  name: string;
  discount: number;
  badgeColor: string;
  message: string;
};

const SCHOLARSHIP_TIERS: ScholarshipTier[] = [
  {
    code: "SCHOLAR15",
    name: "Diamond Elite Scholarship",
    discount: 68,
    badgeColor: "#8b5cf6",
    message: "Top 1% performer! You’ve unlocked our highest scholarship ever!"
  },
  {
    code: "OWOLEX05",
    name: "Genius Tier Scholarship",
    discount: 57,
    badgeColor: "#3b82f6",
    message: "Outstanding result! Massive 57% scholarship secured."
  },
  {
    code: "GROW25",      // 47% in your DB
    name: "Brilliant Star Scholarship",
    discount: 47,
    badgeColor: "#10b981",
    message: "Excellent performance! Enjoy 47% off your tuition."
  },
  {
    code: "OSTU22",
    name: "Rising Talent Award",
    discount: 37,
    badgeColor: "#f59e0b",
    message: "Strong showing! 37% scholarship locked in."
  },
  {
    code: "HART",
    name: "Heart & Hustle Scholarship",
    discount: 30,
    badgeColor: "#ef4444",
    message: "Great effort! You’ve earned a solid 30% scholarship."
  },
  {
    code: "LEARN10",
    name: "Exam Taker Bonus",
    discount: 10,
    badgeColor: "#6b7280",
    message: "Thank you for taking the exam! Here’s your guaranteed 10% scholarship."
  }
];

export function getScholarshipByScore(score: number): ScholarshipTier {
  if (score >= 90) return SCHOLARSHIP_TIERS[0];   // 68%
  if (score >= 76) return SCHOLARSHIP_TIERS[1];   // 57%
  if (score >= 65) return SCHOLARSHIP_TIERS[2];   // 47%
  if (score >= 53) return SCHOLARSHIP_TIERS[3];   // 37%
  if (score >= 40) return SCHOLARSHIP_TIERS[4];   // 30%
  return SCHOLARSHIP_TIERS[5];                    // 10% (everyone gets this!)
}