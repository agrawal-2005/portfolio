import type { Achievement, CodingProfile } from "./types";
import { site } from "./site";

export const achievements: Achievement[] = [
  {
    title: "HackOn with Amazon: National Semifinalist",
    logo: "/logos/amazon.png",
    detail: "Top 10 teams nationwide in Amazon's flagship hackathon.",
    year: "2024",
  },
  {
    title: "Flipkart Grid: National Semifinalist",
    logo: "/logos/flipkart.png",
    detail: "Top 30 teams in one of India's largest engineering competitions.",
    year: "2024",
  },
  {
    title: "Amazon ML Summer School",
    logo: "/logos/amazon.png",
    detail: "Selected nationwide for Amazon's competitive machine learning program.",
    year: "2024",
  },
];

export const codingProfiles: CodingProfile[] = [
  {
    platform: "LeetCode",
    handle: site.leetcode.handle,
    rank: "Knight",
    url: site.leetcode.url,
    highlights: ["Rank 854 in a Biweekly Contest", "Consistent contest participation"],
  },
  {
    platform: "Codeforces",
    handle: site.codeforces.handle,
    rank: "Expert",
    url: site.codeforces.url,
    highlights: ["Expert rating through rated contests"],
  },
  {
    platform: "CodeChef",
    handle: site.codechef.handle,
    rank: "5 Star",
    url: site.codechef.url,
    highlights: ["Rank 4, 13, and 50 in rated contests"],
  },
];

export const problemsSolved = "1000+";
