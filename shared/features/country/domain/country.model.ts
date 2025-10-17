export interface Zone {
  name: string;
  code: string;
}

export interface Country {
  name: string;
  code: string;
  zones?: Zone[];
}