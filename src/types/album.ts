interface imageProps {
  quality: string;
  link: string;
}

interface PrimaryArtistProps {
  id: string;
  name: string;
  url: string;
  image: imageProps[];
  type: string;
  role: string;
}

export interface AlbumTypes {
  id: string;
  name: string;
  year: string;
  type: string;
  language: string;
  url: string;
  primaryArtists: PrimaryArtistProps[];
  featuredArtists: PrimaryArtistProps[];
  artists: PrimaryArtistProps[];
  image: imageProps[];
}
