export interface TechStackCategory {
  title: string;
  categoryIcon: 'code' | 'smartphone' | 'server' | 'database' | 'wrench' | 'globe' | 'palette';
  items: string[];
}

export const techStackData: TechStackCategory[] = [
  {
    title: 'Frontend & Frameworks',
    categoryIcon: 'code',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'HTML', 'CSS']
  },
  {
    title: 'Backend & Database',
    categoryIcon: 'server',
    items: ['NestJS', 'Prisma', 'PostgreSQL', 'MySQL', 'MariaDB', 'REST API']
  },
  {
    title: 'Mobile Development',
    categoryIcon: 'smartphone',
    items: ['Flutter', 'Dart']
  },
  {
    title: 'Development Tools & AI',
    categoryIcon: 'wrench',
    items: ['VS Code', 'GitHub', 'Postman', 'Vercel', 'Antigravity', 'Claude', 'Vite', 'npm']
  },
  {
    title: 'Design & Media',
    categoryIcon: 'palette',
    items: ['Figma', 'Lightroom', 'DaVinci Resolve', 'CapCut', 'Alight Motion', 'Canva']
  }
];
