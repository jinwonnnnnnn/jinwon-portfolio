export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Language",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Framework",
    items: ["React", "Next.js", "React Native", "Vite"],
  },
  {
    category: "State / Data",
    items: ["TanStack Query", "Zustand", "Recoil", "Jotai", "TanStack Table"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Styled-Components", "Shadcn UI", "Ant Design", "MUI"],
  },
  {
    category: "Real-time",
    items: ["STOMP / WebSocket", "SSE", "FCM", "JsSIP"],
  },
  {
    category: "Tooling",
    items: ["Git", "React Hook Form", "Zod", "Framer Motion", "Storybook", "MSW"],
  },
];
