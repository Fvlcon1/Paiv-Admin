import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import Reason from "./components/reason";
import Diagnosis from "./components/diagnosis/diagnosis";
import Drugs from "./components/drugs/drugs";
import { IClaimsDetailType } from "@/app/components/claimDetails/utils/types";
import theme from "@styles/theme";
import LabTests from "./components/labTests";
import MedicalProcedures from "./components/medicalProcedures";
import EncounterDetails from "./components/encounter-details/encounter-details";
import getOtherDetails from "./components/other-details/utils/get-other-details";
import DualTable from "./components/encounter-details/components/dual-table";
import OtherDetails from "./components/other-details/other-details";

const ClaimDetailsItems = ({
    maxHeight,
    claimDetails
} : {
    maxHeight: number | null
    claimDetails: IClaimsDetailType
}) => {
    const { data } = getOtherDetails(claimDetails)
    return (
        <div 
            className="flex flex-col flex-1 gap-3 pb-4 px-4 overflow-y-auto pt-4"
        >
            <EncounterDetails
                encounterDetails={claimDetails.encounterDetails}
            />
            {
                claimDetails.reasons ?
                <Reason reasons={claimDetails.reasons}/> : <></>
            }
            <WithTotal total={claimDetails.diagnosisTotal || 0}>
                <Diagnosis diagnosis={claimDetails.diagnosis} />
            </WithTotal>
            <WithTotal total={claimDetails.medicalProceduresTotal || 0}>
                <MedicalProcedures procedures={claimDetails.medicalProcedures} />
            </WithTotal>
            <WithTotal total={claimDetails.drugsTotal || 0}>
                <Drugs drugs={claimDetails.drugs} />
            </WithTotal>
            <WithTotal total={claimDetails.labTestsTotal || 0}>
                <LabTests tests={claimDetails.labTests} />
            </WithTotal>
            <OtherDetails
                claimDetails={claimDetails}
            />
        </div>
    )
}
export default ClaimDetailsItems

const WithTotal = ({
    total,
    children
} : {
    total : number
    children : React.ReactNode
}) => (
    <div className="w-full flex flex-col gap-2">
        {children}
        <div className="wfull flex justify-end">
            <Text>
                Total: 
                <Text bold={TypographyBold.md2}>
                    &nbsp;GHS {total}
                </Text>
            </Text>
        </div>
    </div>
)