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

export const providerCategoryDropdown: DropdownItem[] = [
    { key: "All Categories", label: "All Categories", value: "All Categories" },
    { key: "1 - Tertiary care hospital", label: "1 - Tertiary care hospital", value: "Tertiary care hospital" },
    { key: "2 - Secondary care hospital", label: "2 - Secondary care hospital", value: "Secondary care hospital" },
    { key: "3 - Primary care hospital", label: "3 - Primary care hospital", value: "Primary care hospital" },
    { key: "4 - Health centers", label: "4 - Health centers (Public, Private, CHAG)", value: "Health centers (Public, Private, CHAG)" },
    { key: "5 - Maternity homes", label: "5 - Maternity homes", value: "Maternity homes" },
    { key: "6 - Private clinics", label: "6 - Private clinics", value: "Private clinics" },
    { key: "7 - Dental clinics", label: "7 - Dental clinics", value: "Dental clinics" },
    { key: "8 - Eye centers", label: "8 - Eye centers", value: "Eye centers" },
    { key: "9 - Diagnostic centers", label: "9 - Diagnostic centers", value: "Diagnostic centers" },
    { key: "10 - CHPS Compounds", label: "10 - CHPS Compounds", value: "CHPS Compounds" },
]