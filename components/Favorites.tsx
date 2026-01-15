import React from 'react';
import { Book, Gamepad, Music, ExternalLink, Play, Library, Tv, Info } from 'lucide-react';

const Favorites: React.FC = () => {
  const books = [
    { 
      title: "HP & The Sorcerer's Stone", 
      url: "https://www.goodreads.com/book/show/3.Harry_Potter_and_the_Sorcerer_s_Stone", 
      img: "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg" 
    },
    { 
      title: "HP & The Chamber of Secrets", 
      url: "https://www.goodreads.com/book/show/15881.Harry_Potter_and_the_Chamber_of_Secrets", 
      img: "https://m.media-amazon.com/images/I/81S0n897P-L._AC_UF1000,1000_QL80_.jpg" 
    },
    { 
      title: "HP & The Prisoner of Azkaban", 
      url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban", 
      img: "https://m.media-amazon.com/images/I/81lAPl9Fl0L._AC_UF1000,1000_QL80_.jpg" 
    },
    { 
      title: "HP & The Goblet of Fire", 
      url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire", 
      img: "https://m.media-amazon.com/images/I/810jKiNChxL._AC_UF1000,1000_QL80_.jpg" 
    },
    { 
      title: "What If?", 
      url: "https://www.goodreads.com/book/show/21413662-what-if", 
      img: "https://m.media-amazon.com/images/I/81S6U-P07fL._AC_UF1000,1000_QL80_.jpg" 
    }
  ];

  const games = [
    { 
      name: "Hollow Knight", 
      img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png", 
      url: "https://www.youtube.com/watch?v=u6p4m_A_mX0" 
    },
    { 
      name: "Silksong", 
      img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1m6y.png", 
      url: "https://www.hollowknightsilksong.com/" 
    },
    { 
      name: "Minecraft", 
      img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.png", 
      url: "https://www.youtube.com/watch?v=0_uFAnS852M" 
    },
    { 
      name: "Portal", 
      img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v9m.png", 
      url: "https://www.youtube.com/watch?v=N_8p0Fh9pXw" 
    },
    { 
      name: "Portal 2", 
      img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v9q.png", 
      url: "https://www.youtube.com/watch?v=mC_W_a_023w" 
    }
  ];

  const playlists = [
    { name: "Hummo", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV64awQ3PLFg9ugq9yZr_PgG&si=4g0pTGB-o9xrOWKR" },
    { name: "Hummo Lofi", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV6y5xuhybQXnvZndZWV