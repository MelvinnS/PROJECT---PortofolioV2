import { CreativeItem } from '../types';

export const creativeCategoriesData: { id: string; title: string; tag: string; coverImage: string }[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    tag: 'UI/UX & Branding',
    coverImage: '/assets/creative/design.png'
  },
  {
    id: 'photography',
    title: 'Photography',
    tag: 'Visual Storytelling',
    coverImage: '/assets/creative/photography.png'
  },
  {
    id: 'short-movie',
    title: 'Short Movie',
    tag: 'Cinematic Story',
    coverImage: '/assets/creative/film.png'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    tag: 'Pacing & Motion',
    coverImage: '/assets/creative/editing.png'
  }
];

export const graphicDesignProjects = [
  {
    id: 'trashback-design',
    title: 'TrashBack',
    tag: 'Mobile UI/UX',
    description: 'A smart waste management app designed to make recycling feel simple, rewarding, and worth returning to.',
    image: '/assets/creative/graphic/trashback/thumbnailTrash.png',
    link: '/creative/design-trashback'
  },
  {
    id: 'dk-catering',
    title: 'DK Catering (COMING SOON)',
    tag: 'Web Design',
    description: 'A clean, appetite-driven website that makes browsing menus and placing orders effortless.',
    image: '/assets/creative/graphic/dk-catering-full.jpg',
    link: '#'
  },
  {
    id: 'parentstalk-design',
    title: 'Parents Talk',
    tag: 'Event Branding',
    description: 'A full visual identity for a parenting talk show event, built to feel warm, credible, and memorable.',
    image: '/assets/creative/graphic/parentstalk/Banner.png',
    link: '/creative/design-parentstalk'
  }
];

export const photographyGallery = [
  { id: '1', title: 'Gallery 1', src: '/assets/creative/photography/gallery-1.jpg' },
  { id: '2', title: 'Gallery 2', src: '/assets/creative/photography/gallery-2.jpg' },
  { id: '3', title: 'Gallery 3', src: '/assets/creative/photography/gallery-3.jpg' },
  { id: '4', title: 'Gallery 4', src: '/assets/creative/photography/gallery-4.jpg' },
  { id: '5', title: 'Gallery 5', src: '/assets/creative/photography/gallery-5.jpg' },
  { id: '6', title: 'Gallery 6', src: '/assets/creative/photography/gallery-6.jpg' },
  { id: '7', title: 'Gallery 7', src: '/assets/creative/photography/gallery-7.jpg' },
  { id: '8', title: 'Gallery 8', src: '/assets/creative/photography/gallery-8.jpg' },
  { id: '9', title: 'Gallery 9', src: '/assets/creative/photography/gallery-9.jpg' },
  { id: '10', title: 'Gallery 10', src: '/assets/creative/photography/gallery-10.jpg' },
  { id: '11', title: 'Gallery 11', src: '/assets/creative/photography/gallery-11.jpg' },
  { id: '12', title: 'Gallery 12', src: '/assets/creative/photography/gallery-12.jpg' },
  { id: '13', title: 'Photo 1', src: '/assets/creative/photography/poto1.jpeg' },
  { id: '14', title: 'Photo 2', src: '/assets/creative/photography/poto2.jpeg' },
  { id: '15', title: 'Photo 3', src: '/assets/creative/photography/poto3.jpeg' }
];

export const shortMoviesData = [
  {
    id: 'janji-terakhir',
    title: 'Janji Terakhir',
    duration: '22 Minutes',
    genres: ['Drama', 'Romance', 'Horror'],
    roles: ['Director', 'Editor', 'Screenwriter', 'Cinematographer'],
    synopsis: "As their mother's life hangs by a thread, two siblings uncover a terrifying secret behind the debt that destroyed their family—a secret rooted in dark magic and impossible choices.",
    poster: '/assets/creative/film/posterfilm.png',
    trailerYtId: 'H_PJlMCc4ng',
    fullYtId: '_A_tKtmoFFM'
  },
  {
    id: 'ombak-harapan',
    title: 'Ombak Harapan',
    duration: '14 Minutes',
    genres: ['Drama', 'Family'],
    roles: ['Director', 'Editor'],
    synopsis: 'When two young men from opposite worlds unexpectedly trade lives, they begin to realize that freedom and wealth rarely exist in the same place.',
    poster: '/assets/creative/film/ombakharapan.jpg',
    trailerYtId: 'lThFvAcGehw',
    fullYtId: 'ew-ctNjjXE8'
  },
  {
    id: 'ryuichi',
    title: 'Tunggu Ryuichi Sukses Nanti',
    duration: '2 Minutes',
    genres: ['Drama', 'Comedy'],
    roles: ['Editor'],
    synopsis: 'After a series of endless scams, rejection, and bad luck, an unemployed young man is offered a mysterious app that promises to change the way he finds work—if he dares to trust it.',
    poster: '/assets/creative/film/posterryu.png',
    fullYtId: 'P-wjgw4nA9k'
  }
];

export const videoEditsData = [
  {
    id: 'wedding-highlight',
    title: 'Wedding Highlight',
    category: 'Event Highlight',
    duration: '3:40',
    thumb: '/assets/creative/video/wedding.png',
    youtubeId: 'iS02TKWT4XM'
  },
  {
    id: 'bukan-sembarang-film',
    title: 'Bukan Sembarang Film!',
    category: 'Film Review',
    duration: '4:15',
    thumb: '/assets/creative/video/bukan.png',
    youtubeId: 'iS02TKWT4XM'
  },
  {
    id: 'rekap-kegiatan',
    title: 'Rekap Kegiatan MPLS & P5 SMK Negeri 1 Surabaya',
    category: 'School Event',
    duration: '2:50',
    thumb: '/assets/creative/video/smkn.png',
    youtubeId: 'iS02TKWT4XM'
  }
];
