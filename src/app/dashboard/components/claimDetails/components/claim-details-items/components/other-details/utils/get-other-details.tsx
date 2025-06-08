import Text from "@styles/components/text"
import theme from "@styles/theme"
import { getAgeFromDate } from "../../../../getAgeFromDate"
import { getDateTime } from "@/utils/getDate"
import { getLengthOfStay } from "../../../../getLengthOfStay"
import { IClaimsDetailType } from "@/app/dashboard/utils/types"

const getOtherDetails = (claimDetails: IClaimsDetailType) => {
	const {
		serviceOutcome,
		serviceType1,
		serviceType2,
		typeofAttendance,
		specialties
	} = claimDetails || {};

	const data = [
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Service Outcome:
				</Text>
				<Text>
					&nbsp;{serviceOutcome}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Service Type 1:
				</Text>
				<Text>
					&nbsp;{serviceType1}
				</Text>
			</div>
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Service Type 2:
				</Text>
				<Text>
					&nbsp;{serviceType2}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Type of Attendance:
				</Text>
				<Text>
					&nbsp;{typeofAttendance}
				</Text>
			</div>
		],
		[
			<div className="flex gap-1 items-center">
				<Text textColor={theme.colors.text.tetiary}>
					Specialties:
				</Text>
				<>
					{
						specialties?.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{specialties.map((item, index) => (
									<div 
										className="flex gap-1 px-2 py-1 bg-bg-secondary border border-border-primary rounded-full"
										key={index}
									>
										<Text bold={theme.typography.bold.md}>
											{item}
										</Text>
									</div>
								))}
							</div>
						) : (
							<Text textColor={theme.colors.text.tetiary} bold={theme.typography.bold.md2}>None specified</Text>
						)
					}
				</>
			</div>
		]
	];

	return { data }
}

export default getOtherDetails