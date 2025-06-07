'use client'

import { useState } from "react"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { hexOpacity } from "@/utils/hexOpacity"
import { ISpecialties } from "../hooks/useClaims"
import { useApprovedContext } from "../context/context"

const Specialties = () => {
    const {selectedSpecialties, setSelectedSpecialties} = useApprovedContext()
    const specialties : ISpecialties[] = ["All", "OPDC", "DERM", "ENT", "PAED", "GEN", "ENTH", "OPHT", "ZOOM02", "ZOOM05"]

    const handleSpecialtyClick = (specialty: ISpecialties) => {
        setSelectedSpecialties([specialty])
        // if (selectedSpecialties.includes(specialty)) {
        //     setSelectedSpecialties(selectedSpecialties.filter((item) => item !== specialty))
        // } else {
        //     setSelectedSpecialties([...selectedSpecialties, specialty])
        // }
    }

    return (
        <div className="flex items-center gap-2">
            {
                specialties.map((specialty, index) => (
                    <div
                        key={index}
                        className={`flex py-1 px-3 rounded-full border-[1px] cursor-pointer hover:opacity-70 duration-200`}
                        style={{
                            backgroundColor: selectedSpecialties.includes(specialty) ? theme.colors.main.primary + hexOpacity(10) : "",
                            borderColor: selectedSpecialties.includes(specialty) ? theme.colors.main.primary + hexOpacity(20) : theme.colors.border.primary
                        }}
                        onClick={() => handleSpecialtyClick(specialty)}
                    >
                        <Text
                            bold={selectedSpecialties.includes(specialty) ? theme.typography.bold.md : theme.typography.bold.sm2}
                            textColor={selectedSpecialties.includes(specialty) ? theme.colors.main.primary : theme.colors.text.secondary}
                        >
                            {specialty} {selectedSpecialties.includes(specialty) ? "✓" : ""}
                        </Text>
                    </div>
                ))
            }
        </div>
    )
}
export default Specialties
