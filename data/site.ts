export const site = {
  name: "Prashant Agrawal",
  tagline:
    "Software Engineer building distributed systems, GenAI infrastructure, and things that scale.",
  url: "https://prashant26.vercel.app",
  description:
    "Portfolio of Prashant Agrawal, a final-year B.Tech student at IIIT Allahabad and Software Engineer Intern at Locus.sh. Backend engineering, distributed systems, and GenAI.",
  email: "agrawalprashant906@gmail.com",
  // Google Drive folder; drop an updated resume here and the site link stays current.
  resumeUrl:
    "https://drive.google.com/drive/folders/1TXyT7T-8rb_XCcM3hDrTe8L_v_Jad9K7",
  phone: "+91-9079217864",
  location: "Bengaluru, India",
  github: "https://github.com/agrawal-2005",
  githubUsername: "agrawal-2005",
  linkedin: "https://www.linkedin.com/in/pr-shant26",
  leetcode: { handle: "archief_117", url: "https://leetcode.com/u/archief_117/" },
  codeforces: { handle: "goldrevboy", url: "https://codeforces.com/profile/goldrevboy" },
  codechef: { handle: "aa333", url: "https://www.codechef.com/users/aa333" },
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
] as const;
