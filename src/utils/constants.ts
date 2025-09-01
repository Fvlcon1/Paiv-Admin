import { DropdownItem } from "./@types";

export const noTempalteRoutes = ["/auth"]
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
// export const gradientClass = "!bg-gradient-to-r !from-main-primary !to-main-primary-gradient !bg-clip-text !text-transparent"
export const gradientClass = "text-text-secondary"

export const prescribingLevelsDropdown: DropdownItem[] = [
    { key: "All levels", label: "All levels", value: "All levels" },
    { key: "A", label: "Level A (CHIPS Compounds)", value: "A" },
    { key: "B1", label: "Level B1 (Healthe centers without a doctor)", value: "B1" },
    { key: "B2", label: "Level B2 (Healthe centers with a doctor)", value: "B2" },
    { key: "C", label: "Level C (District Hospitals - Primary Hospitals)", value: "C" },
    { key: "D", label: "Level D (Regional and tertiary hospitals)", value: "D" },
    { key: "M", label: "Level M (Midwifery Practice)", value: "M" },
    { key: "V", label: "Level V (Diagnostic/Dispensing-only Facilities)", value: "V" },
]