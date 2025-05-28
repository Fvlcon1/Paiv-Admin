'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { hexOpacity } from "@/utils/hexOpacity"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { useState } from "react"

const Controls = () => {
    const [quickMonths, setQuickMonths] = useState<string[]>(["This Month", "April", "March"])
    const [selectedMonth, setSelectedMonth] = useState<string | undefined>(quickMonths[0])
    const [selectedDate, setSelectedDate] = useState<string>("")

    const handleMonthChange = (value : string) => {
        setSelectedMonth(undefined)
        setSelectedDate(value)
    }

    const handleSelectedMonthChange = (value : string) => {
        setSelectedMonth(value)
        setSelectedDate("")
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
        </div>
    )
}
export default Controls