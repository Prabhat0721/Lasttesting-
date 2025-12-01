export type CardStyle = 'traditional' | 'modern' | 'minimal';

export interface WeddingFormData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  brideParents: string;
  groomParents: string;
  userEmail: string;
  style: CardStyle;
  isPremium: boolean;
  couplePhoto: File | null;
  couplePhotoBase64: string | null;
}

export interface DesignResult {
  designName: string;
  downloadUrl: string; // In a real app, this would be the generated image URL
  variationIndex: number;
  style: CardStyle;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    brideName: string;
    groomName: string;
    totalDesigns: number;
    designs: DesignResult[];
  };
}

export interface FormErrors {
  [key: string]: string;
}