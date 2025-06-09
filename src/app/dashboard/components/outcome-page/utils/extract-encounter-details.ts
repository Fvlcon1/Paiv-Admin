import getDate, { getDateTime } from "@/utils/getDate";
import { IEncounterDetails } from "../../../approved/utils/types";

const extractEncounterDetails = (data : any) => {
    const {
        first_name, 
        middle_name, 
        last_name, 
        nhis_number, 
        verification_date, 
        gender, 
        date_of_birth, 
        marital_status,
        profile_image_url,
        current_expiry_date,
        enrolment_status,
        insurance_type,
        issue_date,
        residential_address,
        phone_number,
        ghana_card_number,
        membership_id,
        token,
        compare_image_url,
        encounter_image_url,
        created_at,
        final_time,
        disposition_name,
        verification_status,
        final_verification_status,
        encounter_id
    } = data.encounter_details

    const encounterDetails: IEncounterDetails = {
        firstname: first_name,
        othernames: middle_name,
        lastname: last_name,
        nhisId: nhis_number,
        lastVisit: getDateTime(verification_date),
        gender: gender,
        dob: new Date(date_of_birth).toDateString(),
        maritalStatus: marital_status,
        imageUrl : profile_image_url,
        expirtyDate: current_expiry_date,
        enrolementStatus: enrolment_status,
        insuranceType: insurance_type,
        issueDate: issue_date,
        residentialAddress: residential_address,
        phoneNumber: phone_number,
        ghanaCardNumber: ghana_card_number,
        memberShipId: membership_id,
        token : token,
        checkinImageUrl : compare_image_url,
        checkoutImageUrl : encounter_image_url,
        createdAt : created_at,
        checkinTime : verification_date && new Date(verification_date),
        checkoutTime : final_time && new Date(final_time),
        disposition : disposition_name,
        checkinStatus : verification_status,
        checkoutStatus : final_verification_status,
        encounterId : encounter_id,
        // claimSubmissionAt :  claim_submission_time && new Date(claim_submission_time),
    };
    return encounterDetails
}

export default extractEncounterDetails
