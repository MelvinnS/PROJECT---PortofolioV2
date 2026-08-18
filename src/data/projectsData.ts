import { Project } from '../types';

export const featuredProjectsData: Project[] = [
  {
    id: 'orastrix',
    title: 'Orastrix',
    tagline: 'A sleek enterprise landing page built for digital transformation.',
    description: 'A premium dark-themed product landing page for Orastrix, built with modern web technologies. Features animated sections, responsive layout, and a conversion-focused hero.',
    coverImage: '/assets/projects/coverORASTRIX.jpg',
    tech: ['React', 'TypeScript', 'CSS3', 'Vercel'],
    demoUrl: 'https://project-landing-page-orastrix.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Trashback',
    problem: 'Enterprise products often suffer from generic, unconvincing landing pages that fail to convey the product\'s premium positioning.',
    solution: 'A cinematic, dark-themed landing page with animated visuals, clear value propositions, and strong CTAs designed to convert.',
    role: 'Frontend Developer & UI/UX Designer',
    roleTasks: [
      'Designed and developed the complete landing page.',
      'Implemented animations and responsive breakpoints.',
      'Deployed on Vercel with optimised performance.'
    ],
    process: 'Started with a visual mood board, built a high-fidelity Figma prototype, then translated it directly into code.',
    features: [
      { title: 'Animated hero section' },
      { title: 'Responsive dark design system' },
      { title: 'Feature showcase grid' },
      { title: 'Live demo deployment on Vercel' }
    ],
    galleryScreens: ['/assets/projects/coverORASTRIX.jpg'],
    reflection: 'Orastrix sharpened my skills in translating editorial design concepts into polished production code.'
  },
  {
    id: 'portfolio',
    title: 'Portfolio — Melvin Andrea',
    tagline: 'My personal creative developer portfolio, built from scratch.',
    description: 'A full-stack personal portfolio built with React, TypeScript, and Tailwind v4. Features a physics-based lanyard, interactive 3D cards, masonry photography gallery, lightbox, and premium dark aesthetic.',
    coverImage: '/assets/projects/coverPORTFOLIO.jpg',
    tech: ['React', 'TypeScript', 'Tailwind v4', 'Vite', 'Vercel'],
    demoUrl: 'https://project-portofolio-ten-rosy.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Portofolio',
    problem: 'Generic portfolio templates fail to communicate the personality and technical depth of a creative developer.',
    solution: 'A handcrafted portfolio with interactive physics, editorial photography galleries, and category-specific creative showcase pages.',
    role: 'Full-Stack Developer & Designer',
    roleTasks: [
      'Designed the entire visual system and UI in Figma.',
      'Built the complete React + TypeScript + Tailwind v4 codebase.',
      'Implemented physics-based Lanyard, masonry gallery, lightbox, and 3D card interactions.'
    ],
    process: 'Iterative design-to-code workflow — each section designed in Figma and built to pixel-perfect spec, tested across breakpoints.',
    features: [
      { title: 'Physics-based Lanyard ID card' },
      { title: 'Pinterest masonry photography gallery with lightbox' },
      { title: 'Interactive 3D tilt Creative Works cards' },
      { title: 'Responsive dark design system' }
    ],
    galleryScreens: ['/assets/projects/coverPORTFOLIO.jpg'],
    reflection: 'Building my own portfolio end-to-end was the most complete expression of every skill I have developed as a creative developer.'
  }
];

export const projectsData: Project[] = [
  {
    id: 'pdam',
    title: 'Layanan PDAM',
    tagline: 'A smarter way to manage water services anytime, anywhere.',
    description: 'A mobile application designed to simplify water service management, allowing customers to access bills, submit complaints, and manage their accounts through a user-friendly interface.',
    coverImage: '/assets/projects/coverPDAM.png',
    tech: ['Flutter', 'Dart', 'Figma'],
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Trashback',
    figmaUrl: 'https://www.figma.com/design/qn6pX2Gk86Cw3HVtuzgScA/Prototype-TrashBack?node-id=0-1&t=9J9Mzmis7wZ6PRj0-1',
    problem: 'Conventional water services often require customers to visit service offices or use scattered communication channels, making the process less efficient.',
    solution: 'The application centralizes essential services into one mobile platform with an intuitive interface, making customer interactions faster and more convenient.',
    role: 'Frontend & Mobile Developer / UI/UX Designer',
    roleTasks: [
      'Designed the complete UI/UX in Figma.',
      'Developed the entire Flutter application independently.',
      'Implemented authentication and core service features.'
    ],
    process: 'Started by analyzing user needs and service workflows, followed by UI/UX design in Figma, Flutter development, and testing to ensure every feature functioned properly.',
    features: [
      { title: 'Water Bill Management' },
      { title: 'Bill Payment' },
      { title: 'Dashboard Overview With Charts' },
      { title: 'Customer & Admin Profile' }
    ],
    galleryScreens: [
      '/assets/projects/pdam1.png',
      '/assets/projects/pdam2.png',
      '/assets/projects/pdam3.png',
      '/assets/projects/pdam4.png',
      '/assets/projects/pdam5.png',
      '/assets/projects/pdam6.png',
      '/assets/projects/pdam7.png',
      '/assets/projects/pdam8.png',
      '/assets/projects/pdam9.png',
      '/assets/projects/pdam10.png',
      '/assets/projects/pdam11.png',
      '/assets/projects/pdam12.png',
      '/assets/projects/pdam13.png',
      '/assets/projects/pdam14.png',
      '/assets/projects/pdam15.png',
      '/assets/projects/pdam16.png',
      '/assets/projects/pdam17.png',
      '/assets/projects/pdam18.png'
    ],
    reflection: 'This project strengthened my ability to transform interface designs into a fully functional mobile application while improving my understanding of application architecture and user experience.'
  },
  {
    id: 'trashback',
    title: 'TrashBack',
    tagline: 'A smart waste app that turns recycling into a daily habit.',
    description: 'A mobile application that encourages better waste management through a simple and rewarding digital experience, combining product planning, UI/UX design, and Flutter development.',
    coverImage: '/assets/projects/coverTRASHBACK.png',
    tech: ['Flutter', 'Dart', 'Figma'],
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Trashback',
    figmaUrl: 'https://www.figma.com/design/qn6pX2Gk86Cw3HVtuzgScA/Prototype-TrashBack?node-id=0-1&t=9J9Mzmis7wZ6PRj0-1',
    problem: 'Many people struggle to build consistent recycling habits due to limited motivation and the lack of accessible digital solutions.',
    solution: 'TrashBack combines recycling information, EcoCash rewards, and an intuitive interface to make waste management more engaging and accessible.',
    role: 'Team Leader / Mobile Developer / UI/UX Designer',
    roleTasks: [
      'Led product planning and created the Business Model Canvas (BMC).',
      'Designed the complete UI/UX in Figma.',
      'Developed the Flutter application as Team Leader.'
    ],
    process: 'Started with problem analysis and Business Model Canvas (BMC), followed by UI/UX design in Figma, Flutter development, and iterative testing to refine the user experience.',
    features: [
      { title: 'Recycling Information' },
      { title: 'EcoCash Reward System' },
      { title: 'Article And Video Guide' },
      { title: 'Shopping for Recycled Goods' }
    ],
    galleryScreens: Array.from({ length: 20 }, (_, i) => `/assets/projects/trashback${i + 1}.png`),
    reflection: 'Building TrashBack taught me how to align product strategy with UI/UX design and technical execution, giving me valuable experience in leading a mobile app project end-to-end.'
  },
  {
    id: 'tresbekasli',
    title: 'Web Developer',
    tagline: 'Building accessible platforms for sustainable commerce.',
    description: 'A web-based platform concept aimed at encouraging sustainable consumption through smart features and clean design.',
    coverImage: '/assets/projects/coverORASTRIX.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Trashback',
    figmaUrl: 'https://www.figma.com/design/qn6pX2Gk86Cw3HVtuzgScA/Prototype-TrashBack?node-id=0-1&t=9J9Mzmis7wZ6PRj0-1',
    problem: 'People want to recycle and shop sustainably, but lack accessible tools to make the habit stick.',
    solution: 'Waste info, EcoCash rewards, and a clean interface that keep users coming back.',
    role: 'Frontend Developer & UI/UX Designer',
    roleTasks: [
      'Designed the complete UI/UX in Figma.',
      'Built responsive web layouts.',
      'Planned the concept and user interaction flow.'
    ],
    process: 'Research and BMC first, then Figma design, then front-end development, tested iteratively for a consistent experience.',
    features: [
      { title: 'Map of nearby waste collection points' },
      { title: 'Personal recycling activity tracker' },
      { title: 'Reminders to keep the habit consistent' },
      { title: 'Simple, guided onboarding flow' }
    ],
    galleryScreens: Array.from({ length: 10 }, (_, i) => `/assets/projects/trashback${i + 1}.png`),
    reflection: 'Iterating on Tresbekasli provided deep insights into web interface responsiveness, cross-device compatibility, and user onboarding mechanics.'
  }
];