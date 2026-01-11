import React from 'react';

export type UserRole = 'guest' | 'client' | 'contractor';

export interface Lead {
  id: string;
  zipCode: string;
  serviceType: string;
  estimatedValue: number;
  status: 'open' | 'accepted';
  distance: string;
  description: string;
}

export interface ProjectUpdate {
  step: number;
  label: string;
  timestamp: string;
  completed: boolean;
}

export interface ClientProject {
  id: string;
  artisanName: string;
  serviceDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  updates: ProjectUpdate[];
}

// Augment JSX namespace for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}