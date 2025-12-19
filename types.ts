
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface SortingResult {
  extracted_text: string;
  pin_code: string;
  confidence: ConfidenceLevel;
  timestamp: number;
  imageUrl?: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
  result: SortingResult | null;
}
