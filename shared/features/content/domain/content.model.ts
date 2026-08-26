export interface Content {
  id: string;
  title: string;
  body: string;
}

export interface Link {
  id: string;
  url: string;
  text: string;
}

export interface Button {
  id: string;
  text: string;
  url?: string;
  bgColor?: string;
  bgHoverColor?: string;
  action?: string; // usually set from AP and handled in FE
  hide?: string; // usually set from AP and handled in FE
}
