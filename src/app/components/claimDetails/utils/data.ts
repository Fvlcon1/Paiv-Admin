import { IClaimsDetailType } from "./types";

export const dummyClaimDetail: IClaimsDetailType = {
    encounterToken: "ENC-2023-001234",
    totalPayout: 12500.75,
    expectedPayout: 12800.00,
    reasons: ["Pre-authorization required", "Specialist consultation needed"],
    diagnosis: [
        {
            GRDG: "GRDG001",
            description: "Pneumonia, unspecified",
            diagnosis: "Pneumonia",
            ICD10: "J18.9",
            tariff: 1250.75
        },
        {
            GRDG: "GRDG002",
            description: "Type 2 diabetes mellitus with hyperglycemia",
            diagnosis: "Diabetes Mellitus Type 2",
            ICD10: "E11.65",
            tariff: 980.50
        }
    ],
    drugs: [
        {
            code: "AMX500",
            description: "Amoxicillin 500mg capsules",
            dosage: "500mg",
            date: new Date("2023-05-15"),
            quantity: 21,
            tariff: 5.50,
            total: 115.50
        },
        {
            code: "MET850",
            description: "Metformin 850mg tablets",
            dosage: "850mg",
            date: new Date("2023-05-15"),
            quantity: 60,
            tariff: 2.75,
            total: 165.00
        }
    ],
    serviceOutcome: "Treated and discharged",
    serviceType1: "Outpatient",
    serviceType2: "Consultation",
    specialties: ["Internal Medicine", "Endocrinology"],
    typeofAttendance: "First Visit",
    medicalProcedures: ["Chest X-ray", "ECG"],
    labTests: ["CBC", "Fasting Blood Sugar", "Lipid Profile"],
    medicalProceduresTotal: 2500,
    labTestsTotal: 3500,
    diagnosisTotal: 2,
    drugsTotal: 280.50,
    hospitalName: "City General Hospital",
    patientName: "John A. Doe",
    location: "Main Wing, Room 305",
    pharmacy: "City General Pharmacy",
    status: "Approved",
    encounterDetails: {
        checkinTime: new Date("2023-05-10T10:30:00Z"),
        checkoutTime: new Date("2023-05-15T14:45:00Z"),
        checkinStatus: true,
        checkoutStatus: true,
        firstname: "John",
        othernames: "A.",
        lastname: "Doe",
        nhisId: "NHIS-12345678",
        lastVisit: "2023-05-15",
        gender: "Male",
        dob: "1978-08-15",
        expirtyDate: "2024-12-31",
        enrolementStatus: "Active",
        insuranceType: "National Health Insurance",
        issueDate: "2022-01-15",
        maritalStatus: "Married",
        residentialAddress: "123 Main St, Accra",
        phoneNumber: "+233201234567",
        ghanaCardNumber: "GHA-123456789-1",
        memberShipId: "M-1001",
        checkinImageUrl: "/images/checkin.jpg",
        checkoutImageUrl: "/images/checkout.jpg",
        createdAt: "2023-05-10T10:30:00Z",
        token: "TOKEN12345",
        disposition: "Discharged",
        EncounterId: "ENC-2023-001234"
    }
};