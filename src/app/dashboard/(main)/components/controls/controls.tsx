'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { hexOpacity } from "@/utils/hexOpacity"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import Hospital from "./components/hospital"
import Region from "./components/region"
import District from "./components/dsitrict"
import { useDashboardContext } from "../../context/context"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { LiaBroomSolid } from "react-icons/lia"

const Controls = () => {
    const [quickMonths, setQuickMonths] = useState<string[]>(["This Month", "April", "March"])
    const [selectedMonth, setSelectedMonth] = useState<string | undefined>(quickMonths[0])
    const [selectedDate, setSelectedDate] = useState<string>("")
    const {setStartDate, setEndDate} = useDashboardContext()

    const handleMonthChange = (value : string) => {
        setSelectedMonth(undefined)
        setSelectedDate(value)
        setStartDate(dayjs(value).startOf("month").format("YYYY-MM-DD"))
        setEndDate(dayjs(value).endOf("month").format("YYYY-MM-DD"))
    }

    const handleSelectedMonthChange = (value : string) => {
        setSelectedMonth(value)
        setSelectedDate("")
        
        if(value === "This Month"){
            const startDate = dayjs().startOf("month").format("YYYY-MM-DD")
            const endDate = dayjs().endOf("month").format("YYYY-MM-DD")
            setStartDate(startDate)
            setEndDate(endDate)
            return
        }
        
        const formattedMonth = value ? value.toLowerCase() : ''
        setStartDate(dayjs(formattedMonth).startOf("month").format("YYYY-MM-DD"))
        setEndDate(dayjs(formattedMonth).endOf("month").format("YYYY-MM-DD"))
    }
    
    return (
        <div className="w-full flex items-center gap-2 px-4 py-2 border-b-[1px] border-border-primary">
            {
                quickMonths.map((month, index) => (
                    <div
                        className={`flex items-center px-3 py-1 rounded-full border-[1px] cursor-pointer duration-300`}
                        onClick={() => handleSelectedMonthChange(month)}
                        style={{
                            backgroundColor: selectedMonth === month ? theme.colors.main.primary + hexOpacity(10) : theme.colors.bg.secondary,
                            borderColor: selectedMonth === month ? theme.colors.main.primary + hexOpacity(20) : theme.colors.border.secondary
                        }}
                        key={index}
                    >
                        <Text
                            bold={selectedMonth === month ? theme.typography.bold.md : theme.typography.bold.sm2}
                            textColor={selectedMonth === month ? theme.colors.main.primary : theme.colors.text.secondary}
                        >
                            {month}
                        </Text>
                    </div>
                ))
            }

            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />

            <DatePicker
                placeholder="Select Month"
                format="YYYY-MM-DD"
                style={{
                    outline: "none",
                    backgroundColor: "transparent",
                    color: theme.colors.text.secondary,
                    fontSize: "14px",
                    height: "30px"
                }}
                picker="month"
                value={selectedDate ? dayjs(selectedDate) : undefined}
                onChange={(value) => handleMonthChange(value?.format("YYYY-MM-DD") || "")}
            />

            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
            <Hospital />
            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
            <Region />
            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
            <District />
            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
            <OutlineButton 
                text="Clear"
                icon={<LiaBroomSolid />}
                className="!h-[32px]"
                onClick={() => {
                    setSelectedMonth(undefined)
                    setSelectedDate("")
                    setStartDate("")
                    setEndDate("")
                }}
            />
        </div>
    )
}
export default Controls