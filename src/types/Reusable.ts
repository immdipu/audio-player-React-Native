export interface imageProps {
  quality: string;
  link: string;
}

export interface PrimaryArtistProps {
  id: string;
  name: string;
  url: string;
  image: imageProps[];
  type: string;
  role: string;
}
