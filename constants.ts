import { Lead, ClientProject } from './types';

export const APP_NAME = "LSR"; // Luxury Stone Restoration

export const MOCK_LEADS: Lead[] = [
  {
    id: 'L-101',
    zipCode: '90210',
    serviceType: 'Marble Countertop Crack Repair',
    estimatedValue: 1200,
    status: 'open',
    distance: '3.2 miles',
    description: 'Carrara marble island with hairline fracture near sink.'
  },
  {
    id: 'L-102',
    zipCode: '90046',
    serviceType: 'Travertine Floor Polishing',
    estimatedValue: 3500,
    status: 'open',
    distance: '8.5 miles',
    description: '1500 sqft living area, dull finish, needs honing and sealing.'
  },
  {
    id: 'L-103',
    zipCode: '90402',
    serviceType: 'Granite Chip Fill',
    estimatedValue: 450,
    status: 'open',
    distance: '12 miles',
    description: 'Edge chip on outdoor BBQ island.'
  }
];

export const MOCK_CLIENT_PROJECT: ClientProject = {
  id: 'P-8821',
  artisanName: 'Matteo R.',
  serviceDate: 'Oct 24, 2023',
  status: 'in-progress',
  updates: [
    { step: 1, label: 'Assessment Verified', timestamp: '10:00 AM', completed: true },
    { step: 2, label: 'Artisan Assigned', timestamp: '10:45 AM', completed: true },
    { step: 3, label: 'En Route', timestamp: '1:30 PM', completed: true },
    { step: 4, label: 'Restoration In Progress', timestamp: '2:15 PM', completed: false },
    { step: 5, label: 'Final Polish & Seal', timestamp: '-', completed: false }
  ]
};

export const FAQS = [
  {
    question: "Is restoration worth the investment?",
    answer: "Absolutely. Restoration typically costs 15-20% of full replacement. For a luxury kitchen, this preserves tens of thousands in capital expenditure while retaining the original stone's character."
  },
  {
    question: "Can you see the seam after repair?",
    answer: "Our master artisans use UV-stable acrylics and hand-mixed pigments to match the stone's particulate structure. While no repair is invisible to a microscope, our goal is 'social invisibility' at standard viewing distances."
  },
  {
    question: "How do you vet subcontractors?",
    answer: "The LSR National Artisan Network accepts less than 5% of applicants. We require a minimum of 7 years experience with exotic stones, background checks, and a practical exam on color theory and honing techniques."
  }
];
