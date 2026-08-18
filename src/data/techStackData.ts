export interface TechStackCategory {
  title: string;
  categoryIcon: 'code' | 'smartphone' | 'wrench' | 'globe' | 'palette';
  items: string[];
}

export const techStackData: TechStackCategory[] = [
  {
    title: 'Frontend',
    categoryIcon: 'code',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS']
  },
  {
    title: 'Mobile',
    categoryIcon: 'smartphone',
    items: ['Flutter', 'Dart',]
  },
  {
    title: 'API & Integration',
    categoryIcon: 'globe',
    items: ['REST API']
  },
  {
    title: 'Development Tools',
    categoryIcon: 'wrench',
    items: ['VS Code', 'GitHub', 'Postman', 'Vercel', 'Antigravity', 'Claude', 'Vite', 'npm']
  },
  {
    title: 'Design & Media',
    categoryIcon: 'palette',
    items: ['Figma', 'Lightroom', 'DaVinci Resolve', 'CapCut', 'Alight Motion', 'Canva']
  }
];
