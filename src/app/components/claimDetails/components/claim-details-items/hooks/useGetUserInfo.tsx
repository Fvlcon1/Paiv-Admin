// import Text from "@styles/components/text"
// import theme from "@styles/theme"
// import { getDateTime } from "@/utils/getDate"
// import { getAgeFromDate } from "../../getAgeFromDate"
// import { getLengthOfStay } from "../../getLengthOfStay"

// const useGetUserData = () => {
// 	const { encounterDetails } = useEncounterContext()

// 	const {
// 		gender,
// 		dob,
// 		maritalStatus,
// 		insuranceType,
// 		residentialAddress,
// 		ghanaCardNumber,
// 		nhisId,
// 		claimSubmissionAt,
// 		checkinTime,
// 		checkoutTime,
// 		disposition
// 	} = encounterDetails || {};

// 	const data = [
// 		[
// 			<div className="flex">
// 				<Text>
// 					&nbsp;{gender} | {dob && getAgeFromDate(new Date(dob))} years | {maritalStatus}
// 				</Text>
// 			</div>,
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Insurance Type:
// 				</Text>
// 				<Text>
// 					&nbsp;{insuranceType}
// 				</Text>
// 			</div>
// 		],
// 		[
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Address:
// 				</Text>
// 				<Text>
// 					&nbsp;{residentialAddress}
// 				</Text>
// 			</div>,
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Ghana Card Number:
// 				</Text>
// 				<Text>
// 					&nbsp;{ghanaCardNumber}
// 				</Text>
// 			</div>,
// 		],
// 		[
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					NHIS Number:
// 				</Text>
// 				<Text>
// 					&nbsp;{nhisId}
// 				</Text>
// 			</div>,
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Claim submitted on:
// 				</Text>
// 				<Text>
// 					&nbsp;{claimSubmissionAt ? getDateTime(claimSubmissionAt) : "-"}
// 				</Text>
// 			</div>
// 		],
// 		[
// 			<div className="flex gap-1">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Check in time:
// 				</Text>
// 				<Text>
// 					{checkinTime ? getDateTime(checkinTime) : "-"}
// 				</Text>
// 			</div>,
// 			<div className="flex gap-1">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Check out time:
// 				</Text>
// 				<Text>
// 					{checkoutTime ? getDateTime(checkoutTime) : "-"}
// 				</Text>
// 			</div>
// 		],
// 		[
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Disposition:
// 				</Text>
// 				<Text>
// 					&nbsp;{disposition ?? '-'}
// 				</Text>
// 			</div>,
// 			<div className="flex">
// 				<Text textColor={theme.colors.text.tetiary}>
// 					Length of stay:
// 				</Text>
// 				<Text>
// 					&nbsp;{
// 						(checkinTime && checkoutTime)
// 							? getLengthOfStay(checkinTime, checkoutTime)
// 							: '-'
// 					}
// 				</Text>
// 			</div>
// 		]
// 	];

// 	return { data }
// }

// export default useGetUserData