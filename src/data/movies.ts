import { Movie } from '../types/presentation';

export const HERO_FIVE_MOVIES: Movie[] = [
  {
    id: 'leo',
    title: 'Leo',
    year: 2023,
    director: 'Lokesh Kanagaraj',
    poster: '/images/posters/leo.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'jailer',
    title: 'Jailer',
    year: 2023,
    director: 'Nelson Dilipkumar',
    poster: '/images/posters/jailer.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'maharaja',
    title: 'Maharaja',
    year: 2024,
    director: 'Nithilan Swaminathan',
    poster: '/images/posters/maharaja.jpg',
    accentColor: '#059669',
    trueLatentScore: 8.9,
    initialElo: 1500
  },
  {
    id: 'amaran',
    title: 'Amaran',
    year: 2024,
    director: 'Rajkumar Periasamy',
    poster: '/images/posters/amaran.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'lucky-bhaskar',
    title: 'Lucky Bhaskar',
    year: 2024,
    director: 'Venky Atluri',
    poster: '/images/posters/lucky-bhaskar.jpg',
    accentColor: '#7c3aed',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
];

export const TOURNAMENT_TWENTY_MOVIES: Movie[] = [
  ...HERO_FIVE_MOVIES,
  {
    id: 'vikram',
    title: 'Vikram',
    year: 2022,
    director: 'Lokesh Kanagaraj',
    poster: '/images/posters/vikram.jpg',
    accentColor: '#b91c1c',
    trueLatentScore: 9.0,
    initialElo: 1500
  },
  {
    id: 'master',
    title: 'Master',
    year: 2021,
    director: 'Lokesh Kanagaraj',
    poster: '/images/posters/master.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'kaithi',
    title: 'Kaithi',
    year: 2019,
    director: 'Lokesh Kanagaraj',
    poster: '/images/posters/kaithi.jpg',
    accentColor: '#ea580c',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'thunivu',
    title: 'Thunivu',
    year: 2023,
    director: 'H. Vinoth',
    poster: '/images/posters/thunivu.jpg',
    accentColor: '#64748b',
    trueLatentScore: 7.9,
    initialElo: 1500
  },
  {
    id: 'varisu',
    title: 'Varisu',
    year: 2023,
    director: 'Vamshi Paidipally',
    poster: '/images/posters/varisu.jpg',
    accentColor: '#0284c7',
    trueLatentScore: 7.8,
    initialElo: 1500
  },
  {
    id: 'ponniyin-selvan',
    title: 'Ponniyin Selvan: I',
    year: 2022,
    director: 'Mani Ratnam',
    poster: '/images/posters/ponniyin-selvan.jpg',
    accentColor: '#ca8a04',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'vettaiyan',
    title: 'Vettaiyan',
    year: 2024,
    director: 'T. J. Gnanavel',
    poster: '/images/posters/vettaiyan.jpg',
    accentColor: '#334155',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: 'raayan',
    title: 'Raayan',
    year: 2024,
    director: 'Dhanush',
    poster: '/images/posters/raayan.jpg',
    accentColor: '#991b1b',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'viduthalai',
    title: 'Viduthalai: Part 1',
    year: 2023,
    director: 'Vetrimaaran',
    poster: '/images/posters/viduthalai.jpg',
    accentColor: '#15803d',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'kottukkaali',
    title: 'Kottukkaali',
    year: 2024,
    director: 'PS Vinothraj',
    poster: '/images/posters/kottukkaali.jpg',
    accentColor: '#a16207',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'chithha',
    title: 'Chithha',
    year: 2023,
    director: 'SU Arun Kumar',
    poster: '/images/posters/chithha.jpg',
    accentColor: '#4338ca',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'lover',
    title: 'Lover',
    year: 2024,
    director: 'Prabhuram Vyas',
    poster: '/images/posters/lover.jpg',
    accentColor: '#db2777',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'garudan',
    title: 'Garudan',
    year: 2024,
    director: 'R. S. Durai Senthilkumar',
    poster: '/images/posters/garudan.jpg',
    accentColor: '#854d0e',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'captain-miller',
    title: 'Captain Miller',
    year: 2024,
    director: 'Arun Matheswaran',
    poster: '/images/posters/captain-miller.jpg',
    accentColor: '#57534e',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: 'vaathi',
    title: 'Vaathi',
    year: 2023,
    director: 'Venky Atluri',
    poster: '/images/posters/vaathi.jpg',
    accentColor: '#1d4ed8',
    trueLatentScore: 7.9,
    initialElo: 1500
  },
];

export const HUNDRED_TAMIL_FILMS: Movie[] = [
  ...TOURNAMENT_TWENTY_MOVIES,
  {
    id: 'enthiran',
    title: 'Enthiran',
    year: 2010,
    director: 'S. Shankar',
    poster: '/images/posters/enthiran.jpg',
    accentColor: '#06b6d4',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'sivaji',
    title: 'Sivaji: The Boss',
    year: 2007,
    director: 'S. Shankar',
    poster: '/images/posters/sivaji.jpg',
    accentColor: '#ca8a04',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'anniyan',
    title: 'Anniyan',
    year: 2005,
    director: 'S. Shankar',
    poster: '/images/posters/anniyan.jpg',
    accentColor: '#ef4444',
    trueLatentScore: 8.9,
    initialElo: 1500
  },
  {
    id: 'ghilli',
    title: 'Ghilli',
    year: 2004,
    director: 'Dharani',
    poster: '/images/posters/ghilli.jpg',
    accentColor: '#ea580c',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'pudhupettai',
    title: 'Pudhupettai',
    year: 2006,
    director: 'Selvaraghavan',
    poster: '/images/posters/pudhupettai.jpg',
    accentColor: '#7f1d1d',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'vada-chennai',
    title: 'Vada Chennai',
    year: 2018,
    director: 'Vetrimaaran',
    poster: '/images/posters/vada-chennai.jpg',
    accentColor: '#991b1b',
    trueLatentScore: 8.9,
    initialElo: 1500
  },
  {
    id: 'asuran',
    title: 'Asuran',
    year: 2019,
    director: 'Vetrimaaran',
    poster: '/images/posters/asuran.jpg',
    accentColor: '#991b1b',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'soorarai-pottru',
    title: 'Soorarai Pottru',
    year: 2020,
    director: 'Sudha Kongara',
    poster: '/images/posters/soorarai-pottru.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'jai-bhim',
    title: 'Jai Bhim',
    year: 2021,
    director: 'T. J. Gnanavel',
    poster: '/images/posters/jai-bhim.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.9,
    initialElo: 1500
  },
  {
    id: 'super-deluxe',
    title: 'Super Deluxe',
    year: 2019,
    director: 'Thiagarajan Kumararaja',
    poster: '/images/posters/super-deluxe.jpg',
    accentColor: '#ec4899',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'mankatha',
    title: 'Mankatha',
    year: 2011,
    director: 'Venkat Prabhu',
    poster: '/images/posters/mankatha.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'ayan',
    title: 'Ayan',
    year: 2009,
    director: 'K. V. Anand',
    poster: '/images/posters/ayan.jpg',
    accentColor: '#f97316',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'thuppakki',
    title: 'Thuppakki',
    year: 2012,
    director: 'AR Murugadoss',
    poster: '/images/posters/thuppakki.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'kaththi',
    title: 'Kaththi',
    year: 2014,
    director: 'AR Murugadoss',
    poster: '/images/posters/kaththi.jpg',
    accentColor: '#b91c1c',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'petta',
    title: 'Petta',
    year: 2019,
    director: 'Karthik Subbaraj',
    poster: '/images/posters/petta.jpg',
    accentColor: '#f59e0b',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: 'karnan',
    title: 'Karnan',
    year: 2021,
    director: 'Mari Selvaraj',
    poster: '/images/posters/karnan.jpg',
    accentColor: '#ea580c',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'pariyerum-perumal',
    title: 'Pariyerum Perumal',
    year: 2018,
    director: 'Mari Selvaraj',
    poster: '/images/posters/pariyerum-perumal.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'vikram-vedha',
    title: 'Vikram Vedha',
    year: 2017,
    director: 'Pushkar–Gayathri',
    poster: '/images/posters/vikram-vedha.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: '96',
    title: '96',
    year: 2018,
    director: 'C. Prem Kumar',
    poster: '/images/posters/96.jpg',
    accentColor: '#f59e0b',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'ratsasan',
    title: 'Ratsasan',
    year: 2018,
    director: 'Ram Kumar',
    poster: '/images/posters/ratsasan.jpg',
    accentColor: '#0284c7',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'aaranya-kaandam',
    title: 'Aaranya Kaandam',
    year: 2010,
    director: 'Thiagarajan Kumararaja',
    poster: '/images/posters/aaranya-kaandam.jpg',
    accentColor: '#78716c',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'subramaniapuram',
    title: 'Subramaniapuram',
    year: 2008,
    director: 'Sasikumar',
    poster: '/images/posters/subramaniapuram.jpg',
    accentColor: '#9a3412',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'gargi',
    title: 'Gargi',
    year: 2022,
    director: 'Gautham Ramachandran',
    poster: '/images/posters/gargi.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'irugapatru',
    title: 'Irugapatru',
    year: 2023,
    director: 'Yuvaraj Dhayalan',
    poster: '/images/posters/irugapatru.jpg',
    accentColor: '#a855f7',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: 'mark-antony',
    title: 'Mark Antony',
    year: 2023,
    director: 'Adhik Ravichandran',
    poster: '/images/posters/mark-antony.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'doctor',
    title: 'Doctor',
    year: 2021,
    director: 'Nelson Dilipkumar',
    poster: '/images/posters/doctor.jpg',
    accentColor: '#0284c7',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'don',
    title: 'Don',
    year: 2022,
    director: 'Cibi Chakaravarthi',
    poster: '/images/posters/don.jpg',
    accentColor: '#6366f1',
    trueLatentScore: 7.9,
    initialElo: 1500
  },
  {
    id: 'maaveeran',
    title: 'Maaveeran',
    year: 2023,
    director: 'Madonne Ashwin',
    poster: '/images/posters/maaveeran.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'parking',
    title: 'Parking',
    year: 2023,
    director: 'Ramkumar Balakrishnan',
    poster: '/images/posters/parking.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'good-night',
    title: 'Good Night',
    year: 2023,
    director: 'Vinayak Chandrasekaran',
    poster: '/images/posters/good-night.jpg',
    accentColor: '#10b981',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'por-thozhil',
    title: 'Por Thozhil',
    year: 2023,
    director: 'Vignesh Raja',
    poster: '/images/posters/por-thozhil.jpg',
    accentColor: '#1e293b',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'dada',
    title: 'Dada',
    year: 2023,
    director: 'Ganesh K. Babu',
    poster: '/images/posters/dada.jpg',
    accentColor: '#8b5cf6',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'ayalaan',
    title: 'Ayalaan',
    year: 2024,
    director: 'R. Ravikumar',
    poster: '/images/posters/ayalaan.jpg',
    accentColor: '#06b6d4',
    trueLatentScore: 7.8,
    initialElo: 1500
  },
  {
    id: 'kadaisi-vivasayi',
    title: 'Kadaisi Vivasayi',
    year: 2022,
    director: 'M. Manikandan',
    poster: '/images/posters/kadaisi-vivasayi.jpg',
    accentColor: '#65a30d',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'sardar',
    title: 'Sardar',
    year: 2022,
    director: 'P. S. Mithran',
    poster: '/images/posters/sardar.jpg',
    accentColor: '#047857',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'baashha',
    title: 'Baashha',
    year: 1995,
    director: 'Suresh Krissna',
    poster: '/images/posters/baashha.jpg',
    accentColor: '#eab308',
    trueLatentScore: 9.1,
    initialElo: 1500
  },
  {
    id: 'nayakan',
    title: 'Nayakan',
    year: 1987,
    director: 'Mani Ratnam',
    poster: '/images/posters/nayakan.jpg',
    accentColor: '#b45309',
    trueLatentScore: 9.2,
    initialElo: 1500
  },
  {
    id: 'thalapathi',
    title: 'Thalapathi',
    year: 1991,
    director: 'Mani Ratnam',
    poster: '/images/posters/thalapathi.jpg',
    accentColor: '#b91c1c',
    trueLatentScore: 9.0,
    initialElo: 1500
  },
  {
    id: 'anbe-sivam',
    title: 'Anbe Sivam',
    year: 2003,
    director: 'Sundar C.',
    poster: '/images/posters/anbe-sivam.jpg',
    accentColor: '#3b82f6',
    trueLatentScore: 9.0,
    initialElo: 1500
  },
  {
    id: 'indian',
    title: 'Indian',
    year: 1996,
    director: 'S. Shankar',
    poster: '/images/posters/indian.jpg',
    accentColor: '#15803d',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'padayappa',
    title: 'Padayappa',
    year: 1999,
    director: 'K. S. Ravikumar',
    poster: '/images/posters/padayappa.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'chandramukhi',
    title: 'Chandramukhi',
    year: 2005,
    director: 'P. Vasu',
    poster: '/images/posters/chandramukhi.jpg',
    accentColor: '#ca8a04',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'mudhalvan',
    title: 'Mudhalvan',
    year: 1999,
    director: 'S. Shankar',
    poster: '/images/posters/mudhalvan.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'alaipayuthey',
    title: 'Alaipayuthey',
    year: 2000,
    director: 'Mani Ratnam',
    poster: '/images/posters/alaipayuthey.jpg',
    accentColor: '#ec4899',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'kannathil-muthamittal',
    title: 'Kannathil Muthamittal',
    year: 2002,
    director: 'Mani Ratnam',
    poster: '/images/posters/kannathil-muthamittal.jpg',
    accentColor: '#0284c7',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'bombay',
    title: 'Bombay',
    year: 1995,
    director: 'Mani Ratnam',
    poster: '/images/posters/bombay.jpg',
    accentColor: '#0d9488',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'roja',
    title: 'Roja',
    year: 1992,
    director: 'Mani Ratnam',
    poster: '/images/posters/roja.jpg',
    accentColor: '#e11d48',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'iruvar',
    title: 'Iruvar',
    year: 1997,
    director: 'Mani Ratnam',
    poster: '/images/posters/iruvar.jpg',
    accentColor: '#b45309',
    trueLatentScore: 8.9,
    initialElo: 1500
  },
  {
    id: 'kaakha-kaakha',
    title: 'Kaakha Kaakha',
    year: 2003,
    director: 'Gautham Vasudev Menon',
    poster: '/images/posters/kaakha-kaakha.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'ghajini',
    title: 'Ghajini',
    year: 2005,
    director: 'AR Murugadoss',
    poster: '/images/posters/ghajini.jpg',
    accentColor: '#b91c1c',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'vettaiyaadu-vilaiyaadu',
    title: 'Vettaiyaadu Vilaiyaadu',
    year: 2006,
    director: 'Gautham Vasudev Menon',
    poster: '/images/posters/vettaiyaadu-vilaiyaadu.jpg',
    accentColor: '#334155',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'vaaranam-aayiram',
    title: 'Vaaranam Aayiram',
    year: 2008,
    director: 'Gautham Vasudev Menon',
    poster: '/images/posters/vaaranam-aayiram.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'vinnaithaandi-varuvaayaa',
    title: 'Vinnaithaandi Varuvaayaa',
    year: 2010,
    director: 'Gautham Vasudev Menon',
    poster: '/images/posters/vinnaithaandi-varuvaayaa.jpg',
    accentColor: '#3b82f6',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'pokkiri',
    title: 'Pokkiri',
    year: 2007,
    director: 'Prabhu Deva',
    poster: '/images/posters/pokkiri.jpg',
    accentColor: '#ea580c',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'mersal',
    title: 'Mersal',
    year: 2017,
    director: 'Atlee',
    poster: '/images/posters/mersal.jpg',
    accentColor: '#b91c1c',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'bigil',
    title: 'Bigil',
    year: 2019,
    director: 'Atlee',
    poster: '/images/posters/bigil.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'theri',
    title: 'Theri',
    year: 2016,
    director: 'Atlee',
    poster: '/images/posters/theri.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'sarkar',
    title: 'Sarkar',
    year: 2018,
    director: 'AR Murugadoss',
    poster: '/images/posters/sarkar.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'viswasam',
    title: 'Viswasam',
    year: 2019,
    director: 'Siva',
    poster: '/images/posters/viswasam.jpg',
    accentColor: '#16a34a',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'vedalam',
    title: 'Vedalam',
    year: 2015,
    director: 'Siva',
    poster: '/images/posters/vedalam.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'veeram',
    title: 'Veeram',
    year: 2014,
    director: 'Siva',
    poster: '/images/posters/veeram.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
  {
    id: 'billa',
    title: 'Billa',
    year: 2007,
    director: 'Vishnuvardhan',
    poster: '/images/posters/billa.jpg',
    accentColor: '#475569',
    trueLatentScore: 8.3,
    initialElo: 1500
  },
  {
    id: 'ko',
    title: 'Ko',
    year: 2011,
    director: 'K. V. Anand',
    poster: '/images/posters/ko.jpg',
    accentColor: '#2563eb',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'soodhu-kavvum',
    title: 'Soodhu Kavvum',
    year: 2013,
    director: 'Nalan Kumarasamy',
    poster: '/images/posters/soodhu-kavvum.jpg',
    accentColor: '#10b981',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'jigarthanda',
    title: 'Jigarthanda',
    year: 2014,
    director: 'Karthik Subbaraj',
    poster: '/images/posters/jigarthanda.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'jigarthanda-doublex',
    title: 'Jigarthanda DoubleX',
    year: 2023,
    director: 'Karthik Subbaraj',
    poster: '/images/posters/jigarthanda-doublex.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'pizza',
    title: 'Pizza',
    year: 2012,
    director: 'Karthik Subbaraj',
    poster: '/images/posters/pizza.jpg',
    accentColor: '#ef4444',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'madras',
    title: 'Madras',
    year: 2014,
    director: 'Pa. Ranjith',
    poster: '/images/posters/madras.jpg',
    accentColor: '#334155',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'sarpatta-parambarai',
    title: 'Sarpatta Parambarai',
    year: 2021,
    director: 'Pa. Ranjith',
    poster: '/images/posters/sarpatta-parambarai.jpg',
    accentColor: '#b45309',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'kabali',
    title: 'Kabali',
    year: 2016,
    director: 'Pa. Ranjith',
    poster: '/images/posters/kabali.jpg',
    accentColor: '#0f172a',
    trueLatentScore: 8.1,
    initialElo: 1500
  },
  {
    id: 'kaala',
    title: 'Kaala',
    year: 2018,
    director: 'Pa. Ranjith',
    poster: '/images/posters/kaala.jpg',
    accentColor: '#1e293b',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: '24',
    title: '24',
    year: 2016,
    director: 'Vikram Kumar',
    poster: '/images/posters/24.jpg',
    accentColor: '#10b981',
    trueLatentScore: 8.4,
    initialElo: 1500
  },
  {
    id: 'maanaadu',
    title: 'Maanaadu',
    year: 2021,
    director: 'Venkat Prabhu',
    poster: '/images/posters/maanaadu.jpg',
    accentColor: '#7c3aed',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'lubber-pandhu',
    title: 'Lubber Pandhu',
    year: 2024,
    director: 'Tamizharasan Pachamuthu',
    poster: '/images/posters/lubber-pandhu.jpg',
    accentColor: '#16a34a',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'meiyazhagan',
    title: 'Meiyazhagan',
    year: 2024,
    director: 'C. Prem Kumar',
    poster: '/images/posters/meiyazhagan.jpg',
    accentColor: '#059669',
    trueLatentScore: 8.6,
    initialElo: 1500
  },
  {
    id: 'aayirathil-oruvan',
    title: 'Aayirathil Oruvan',
    year: 2010,
    director: 'Selvaraghavan',
    poster: '/images/posters/aayirathil-oruvan.jpg',
    accentColor: '#dc2626',
    trueLatentScore: 8.5,
    initialElo: 1500
  },
  {
    id: 'singam',
    title: 'Singam',
    year: 2010,
    director: 'Hari',
    poster: '/images/posters/singam.jpg',
    accentColor: '#d97706',
    trueLatentScore: 8.2,
    initialElo: 1500
  },
  {
    id: 'thani-oruvan',
    title: 'Thani Oruvan',
    year: 2015,
    director: 'Mohan Raja',
    poster: '/images/posters/thani-oruvan.jpg',
    accentColor: '#0284c7',
    trueLatentScore: 8.7,
    initialElo: 1500
  },
  {
    id: 'aadukalam',
    title: 'Aadukalam',
    year: 2011,
    director: 'Vetrimaaran',
    poster: '/images/posters/aadukalam.jpg',
    accentColor: '#b45309',
    trueLatentScore: 8.8,
    initialElo: 1500
  },
  {
    id: 'goat',
    title: 'The Greatest of All Time',
    year: 2024,
    director: 'Venkat Prabhu',
    poster: '/images/posters/goat.jpg',
    accentColor: '#3b82f6',
    trueLatentScore: 8.0,
    initialElo: 1500
  },
];

// 100 Unique Tamil Films with HD posters for Slide 2
export const generateHundredFilms = () => {
  return HUNDRED_TAMIL_FILMS.map((m, idx) => ({
    id: m.id,
    title: m.title,
    year: m.year,
    director: m.director,
    poster: m.poster,
    hue: (idx * 18) % 360
  }));
};
