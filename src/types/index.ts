export interface Condition {
  label: string;
  name: string;
  passed?: boolean;
}

export interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  role: "frontend" | "backend" | "fullstack" | "design" | "product";
  source: "job-board" | "social-media" | "referral" | "other";
  verifications: Verification[];
}

export interface Verification {
  source: string;
  eligibility: {
    checks: Condition[];
  };
}

export interface Eligibility {
  weight: number;
  checks: Condition[];
}

export interface ReferenceData {
  version: string;
  eligibility: Eligibility;
}
