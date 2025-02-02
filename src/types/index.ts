export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Sample {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  sampleId: string;
  event: string;
  timestamp: string;
  details?: string;
}