import { useCallback, useEffect, useState } from "react";
import { Candidate, ReferenceData } from "../types";
import { getCandidate, getReferenceData } from "../utils";
import { Verifications } from "./Verifications";

export const Dashboard: React.FC = () => {
	const [candidate, setCandidate] = useState<Candidate>();

	const reconcile = useCallback(({ data }: { data: Candidate }) => {
		const verifications = data.verifications.map((verification) => {
			/**
			 * This is the fix for this bug.
			 * Cause:
			 *    1. Previously, referenceData is called only once and the same reference data is used for all the verifications.
			 *       And structuredClone is used to clone the reference data, if you use structuredClone to clone an object containing
			 *       reference type variables pointing to the same reference, these references will be kept.
			 *
			 * Fix: Create a new object for each verification and copy the checks from the reference data.
			 */
			const reference = getReferenceData();

			return {
				...verification,
				eligibility: {
					checks: reference.eligibility.checks.map((condition) => {
						const existing = verification.eligibility.checks.find(
							(c) => c.name === condition.name,
						);
						if (existing) {
							return existing;
						}
						return condition;
					}),
				},
			};
		});
		setCandidate({
			...data,
			verifications,
		});
	}, []);

	useEffect(() => {
		const candidateData = getCandidate();
		// const reference = getReferenceData();
		reconcile({ data: candidateData });
	}, [reconcile]);

	if (!candidate) return null;

	return (
		<>
			<div className="h-screen bg-neutral-100">
				<div className="h-16 flex items-center px-8">
					<span className="text-xl font-bold">Arcane</span>
					<span className="flex-1 flex"></span>
					<a target="_blank" href="https://github.com/abhishk-me/Arcane">
						<div className="flex items-center px-2 py-1 rounded-md hover:bg-neutral-200 cursor-pointer">
							<svg
								fill="none"
								className="h-4 w-4"
								viewBox="0 0 25 25"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M15.7481 24.9471C24.0901 24.7061 24.9111 22.9501 24.9111 12.9811C24.9111 1.98108 23.9111 0.981079 12.9111 0.981079C1.91113 0.981079 0.911133 1.98108 0.911133 12.9811C0.911133 22.9761 1.73713 24.7151 10.1391 24.9491C10.2121 24.8581 10.2391 24.7441 10.2391 24.6281C10.2391 24.3781 10.2291 21.8121 10.2241 20.9291C7.18713 21.5681 6.54613 19.5101 6.54613 19.5101C6.04913 18.2881 5.33313 17.9621 5.33313 17.9621C4.34213 17.3061 5.40813 17.3191 5.40813 17.3191C6.50413 17.3941 7.08113 18.4101 7.08113 18.4101C8.05513 20.0271 9.63713 19.5601 10.2591 19.2891C10.3581 18.6061 10.6401 18.1391 10.9521 17.8751C8.52713 17.6081 5.97813 16.7001 5.97813 12.6451C5.97813 11.4901 6.40413 10.5461 7.10213 9.80608C6.98913 9.53808 6.61513 8.46208 7.20913 7.00608C7.20913 7.00608 8.12613 6.72108 10.2121 8.09008C11.0831 7.85508 12.0171 7.73808 12.9461 7.73408C13.8731 7.73808 14.8071 7.85508 15.6801 8.09008C17.7651 6.72108 18.6801 7.00608 18.6801 7.00608C19.2761 8.46208 18.9011 9.53808 18.7881 9.80608C19.4881 10.5461 19.9111 11.4901 19.9111 12.6451C19.9111 16.7101 17.3581 17.6051 14.9251 17.8661C15.3171 18.1931 15.6661 18.8391 15.6661 19.8261C15.6661 20.7721 15.6601 22.4451 15.6561 23.5541C15.6541 24.1031 15.6531 24.5131 15.6531 24.6281C15.6531 24.7371 15.6821 24.8521 15.7481 24.9471V24.9471Z"
									fill="black"
									fill-rule="evenodd"
								/>
							</svg>
							<span className="text-sm font-semibold ml-1">Github</span>
						</div>
					</a>
				</div>
				<div className="max-w-xl mt-10 mx-auto">
					<div className="flex items-center flex-col mb-8">
						<div className="h-9 w-9 rounded-md bg-rose-200 border-2 border-white flex items-center justify-center">
							<span className="text-sm font-medium">
								{candidate.firstName[0]}
								{candidate.lastName[0]}
							</span>
						</div>
						<p className="text-sm font-semibold mt-2">
							Verification for {candidate.firstName} {candidate.lastName}
						</p>
					</div>
					<Verifications
						verifications={candidate.verifications}
						onChange={(v) => {
							console.log(v);
							setCandidate({ ...candidate, verifications: v });
						}}
					/>
				</div>
			</div>
		</>
	);
};
