import Text from "@styles/components/text"
import theme from "@styles/theme"
import { getAgeFromDate } from "./getAgeFromDate"
import getDate, { getDateTime } from "@/utils/getDate"
import { getLengthOfStay } from "./getLengthOfStay"
import { IEncounterDetails } from "@/app/components/claimDetails/utils/types"

const getTableData = (encounterDetails: IEncounterDetails) => {
	const {
		gender,
		dob,
		maritalStatus,
		insuranceType,
		residentialAddress,
		ghanaCardNumber,
		nhisId,
		claimSubmissionAt,
		checkinTime,
		checkoutTime,
		disposition,
		EncounterId
	} = encounterDetails || {};

	const data = [
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Full Name:
				</Text>
				<Text>
					&nbsp;{`${encounterDetails?.othernames} ${encounterDetails?.lastname}`}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Encounter ID:
				</Text>
				<Text>
					&nbsp;{EncounterId}
				</Text>
			</div>,
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Gender:
				</Text>
				<Text>
					&nbsp;{gender}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Insurance Type:
				</Text>
				<Text>
					&nbsp;{insuranceType}
				</Text>
			</div>
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Address:
				</Text>
				<Text>
					&nbsp;{residentialAddress}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Ghana Card Number:
				</Text>
				<Text>
					&nbsp;{ghanaCardNumber}
				</Text>
			</div>,
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					NHIS Number:
				</Text>
				<Text>
					&nbsp;{nhisId}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Claim submitted on:
				</Text>
				<Text>
					&nbsp;{claimSubmissionAt ? getDate(claimSubmissionAt) : "-"}
				</Text>
			</div>
		],
		[
			<div className="flex gap-1">
				<Text textColor={theme.colors.text.tetiary}>
					Check in time:
				</Text>
				<Text>
					{checkinTime ? getDate(checkinTime) : "-"}
				</Text>
			</div>,
			<div className="flex gap-1">
				<Text textColor={theme.colors.text.tetiary}>
					Check out time:
				</Text>
				<Text>
					{checkoutTime ? getDate(checkoutTime) : "-"}
				</Text>
			</div>
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Disposition:
				</Text>
				<Text>
					&nbsp;{disposition ?? '-'}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Length of stay:
				</Text>
				<Text>
					&nbsp;{
						(checkinTime && checkoutTime)
							? getLengthOfStay(checkinTime, checkoutTime)
							: '-'
					}
				</Text>
			</div>
		]
	];

	return { data }
}

export default getTableData