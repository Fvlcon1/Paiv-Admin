import Image from "next/image"
import theme from "@styles/theme"
import { FaUserCircle } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { ReactNode } from "react"
import { IEncounterDetails } from "@/app/dashboard/approved/utils/types"
import { FaUser } from "react-icons/fa6"

const OutterContainer = ({
    children
}: {
    children?: ReactNode
}) => {
    return (
        <div className="flex items-center border-border-primary border-[1px] justify-center duration-500 p-1 w-[100px] h-[100px] bg-bg-primary-light rounded-lg">
            {children}
        </div>
    )
}

const Images = ({
    encounterDetails
}: {
    encounterDetails: IEncounterDetails
}) => {

    return (
        <div className="relative gap-2 flex">

            {/* Profile Image */}
            <OutterContainer>
                {
                    encounterDetails?.imageUrl ?
                        <div className="relative overflow-hidden rounded-md w-full h-full">
                            <Image
                                src={encounterDetails.imageUrl}
                                alt="profile"
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </div>
                        :
                        <FaUser color={theme.colors.text.tetiary} size={60} />
                }
            </OutterContainer>

            {/* Checkin Image */}
            <OutterContainer>
                {
                    encounterDetails?.checkinImageUrl ?
                        <div className="relative overflow-hidden rounded-md w-full h-full">
                            <Image
                                src={encounterDetails.checkinImageUrl}
                                alt="profile"
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </div>
                        :
                        <FaUser color={theme.colors.text.tetiary} size={60} />
                }
            </OutterContainer>

            {/* Checkout Image */}
            <OutterContainer>
                {
                    encounterDetails?.checkoutImageUrl ?
                        <div className="relative overflow-hidden rounded-md w-full h-full">
                            <Image
                                src={encounterDetails.checkoutImageUrl}
                                alt="profile"
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </div>
                        :
                        <FaUser color={theme.colors.text.tetiary} size={60} />
                }
            </OutterContainer>

            {/* Status */}
            <div className="h-full flex justify-center items-center">
                {
                    encounterDetails?.checkoutImageUrl ?
                        <div className="relative mt-[50px] ml-[10px] overflow-hidden rounded-full bg-[#8986866e] p-1">
                            <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-bg-primary p-1">
                                <RiVerifiedBadgeFill
                                    color="#60B956"
                                    size={30}
                                />
                            </div>
                        </div>
                        :
                        encounterDetails?.checkinImageUrl && !encounterDetails.checkinStatus ?
                            <div className="relative mt-[50px] ml-[10px] overflow-hidden rounded-full bg-[#8986866e] p-1">
                                <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-bg-primary p-1">
                                    <GiCancel
                                        color="#e8362a"
                                        size={30}
                                    />
                                </div>
                            </div>
                            :
                            <></>
                }
            </div>
        </div>
    )
}
export default Images