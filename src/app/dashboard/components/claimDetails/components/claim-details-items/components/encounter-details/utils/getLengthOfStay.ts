export const getLengthOfStay = (
    admissionDate: string | Date, 
    dischargeDate: string | Date
): string => {
    const admission = new Date(admissionDate);
    const discharge = new Date(dischargeDate);

    if (isNaN(admission.getTime()) || isNaN(discharge.getTime())) {
        throw new Error("Invalid date format");
    }

    const diffTime = discharge.getTime() - admission.getTime(); // Difference in milliseconds

    const seconds = Math.floor(diffTime / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""}`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""}`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""}`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""}`;

    const months = Math.floor(days / 30.44); // Approximate month length
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""}`;

    const years = Math.floor(days / 365.25); // Account for leap years
    return `${years} year${years !== 1 ? "s" : ""}`;
};