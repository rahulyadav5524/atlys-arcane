import { Candidate, ReferenceData } from "../types";

export const getCandidate: () => Candidate = () => ({
  firstName: "John",
  lastName: "Doe",
  email: "John_doe@arc.ane",
  role: "frontend",
  source: "referral",
  verifications: [
    {
      source: "System",
      eligibility: {
        checks: [
          {
            label: "4 years of experience",
            name: "experience",
            passed: true,
          },
        ],
      },
    },
    {
      source: "Interview",
      eligibility: {
        checks: [
          {
            label: "Has a car",
            name: "car",
            passed: true,
          },
        ],
      },
    },
  ],
});

export const getReferenceData: () => ReferenceData = () => ({
  version: "2.3.2",
  eligibility: {
    weight: 1,
    checks: [
      {
        label: "Has a sense of humour",
        name: "humour",
      },
      {
        label: "4 years of experience",
        name: "experience",
      },
      {
        label: "Driver's license",
        name: "driverLicense",
      },
      {
        label: "Has a car",
        name: "car",
      },
    ],
  },
});
