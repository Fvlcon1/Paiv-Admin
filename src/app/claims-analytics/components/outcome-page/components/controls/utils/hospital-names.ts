type Hospital = {
    name: string;
    location: string;
    type: 'Teaching' | 'Regional' | 'Military' | 'Private' | 'Specialist';
};

export const hospitalsInGhana: Hospital[] = [
    {
        name: "Korle-Bu Teaching Hospital",
        location: "Accra",
        type: "Teaching"
    },
    {
        name: "Tema general hospital",
        location: "Tema",
        type: "Teaching"
    },
    {
        name: "Komfo Anokye Teaching Hospital (KATH)",
        location: "Kumasi",
        type: "Teaching"
    },
    {
        name: "37 Military Hospital",
        location: "Accra",
        type: "Military"
    },
    {
        name: "Greater Accra Regional Hospital (Ridge Hospital)",
        location: "Accra",
        type: "Regional"
    },
    {
        name: "Tamale Teaching Hospital",
        location: "Tamale",
        type: "Teaching"
    },
    {
        name: "Cape Coast Teaching Hospital",
        location: "Cape Coast",
        type: "Teaching"
    },
    {
        name: "Effia-Nkwanta Regional Hospital",
        location: "Sekondi–Takoradi",
        type: "Regional"
    },
    {
        name: "Ho Teaching Hospital",
        location: "Ho",
        type: "Teaching"
    },
    {
        name: "Sunyani Regional Hospital",
        location: "Sunyani",
        type: "Regional"
    },
    {
        name: "Bolgatanga Regional Hospital",
        location: "Bolgatanga",
        type: "Regional"
    },
    {
        name: "Nyaho Medical Centre",
        location: "Accra",
        type: "Private"
    },
    {
        name: "Euracare Advanced Diagnosis & Care Centre",
        location: "Accra",
        type: "Private"
    },
    {
        name: "Lister Hospital & Fertility Centre",
        location: "Accra",
        type: "Private"
    },
    {
        name: "Ghana–Canada Medical Centre (GCMC)",
        location: "Accra",
        type: "Private"
    },
    {
        name: "Achimota Hospital",
        location: "Accra",
        type: "Regional"
    },
    {
        name: "Lapaz Community Hospital",
        location: "Accra",
        type: "Private"
    },
    {
        name: "St. Michael’s Specialist Hospital",
        location: "Accra",
        type: "Specialist"
    },
    {
        name: "MAB International Hospital",
        location: "Accra",
        type: "Private"
    },
    {
        name: "Asafo-Boakye Specialist Hospital",
        location: "Kumasi",
        type: "Specialist"
    },
    {
        name: "County Hospital",
        location: "Kumasi",
        type: "Private"
    }
];
