export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  tech: string[];
  githubUrl?: string;
  figmaUrl?: string;
  demoUrl?: string;
  problem: string;
  solution: string;
  role: string;
  roleTasks: string[];
  process: string;
  features: { title: string; icon?: string }[];
  galleryScreens: string[];
  reflection: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: 'graphic-design' | 'photography' | 'short-movie' | 'video-editing';
  coverImage: string;
  tag: string;
  description?: string;
  gallery?: string[];
  videoUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  category: 'recognition' | 'learning';
}

export interface TechStackCategory {
  title: string;
  icon: string;
  items: string[];
}
