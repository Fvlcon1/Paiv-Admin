import Text from "@styles/components/text"
import Image from "next/image"
import Copychip from "@components/chip/copyChip"

export const data = [
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Keta Municipal Hospital",
        patientName: "Chris Ampeh",
        location: "Keta",
        diagnosis: "Anemia (D50)",
        drugs: "Folic Acid, Ferrous Sulfate",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Korle-Bu Teaching Hospital",
        patientName: "Ama Mensah",
        location: "Accra",
        diagnosis: "Hypertension (I10)",
        drugs: "Lisinopril, Amlodipine",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Tamale Central Hospital",
        patientName: "Yaw Ofori",
        location: "Tamale",
        diagnosis: "Diabetes Mellitus (E11)",
        drugs: "Metformin, Insulin",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Komfo Anokye Teaching Hospital",
        patientName: "Miriam Boateng",
        location: "Kumasi",
        diagnosis: "Asthma (J45)",
        drugs: "Salbutamol, Montelukast",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Cape Coast Regional Hospital",
        patientName: "Kwesi Addo",
        location: "Cape Coast",
        diagnosis: "Peptic Ulcer Disease (K27)",
        drugs: "Omeprazole, Ranitidine",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Bolgatanga Municipal Hospital",
        patientName: "Efua Armah",
        location: "Bolgatanga",
        diagnosis: "Malaria (B50)",
        drugs: "Artemether-Lumefantrine, Paracetamol",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Sunyani Regional Hospital",
        patientName: "Richard Tetteh",
        location: "Sunyani",
        diagnosis: "Migraine (G43)",
        drugs: "Sumatriptan, Ibuprofen",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Sekondi-Takoradi Government Hospital",
        patientName: "Gifty Lamptey",
        location: "Takoradi",
        diagnosis: "Pneumonia (J18)",
        drugs: "Azithromycin, Amoxicillin",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Ho Teaching Hospital",
        patientName: "Daniel Owusu",
        location: "Ho",
        diagnosis: "Tuberculosis (A15)",
        drugs: "Rifampicin, Isoniazid",
    },
    {
        selectable: <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"></div>,
        hospitalName: "Wa Municipal Hospital",
        patientName: "Sandra Asare",
        location: "Wa",
        diagnosis: "Typhoid Fever (A01)",
        drugs: "Ciprofloxacin, Azithromycin",
    },
];

export const columns = [
    {
        accessorKey : 'selectable',
        header : ()=> (
            <div className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary ">
                
            </div>
        ),
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'hospitalName',
        header : 'Hospital Name',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'location',
        header : 'Location',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'patientName',
        header : 'Patient Name',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'diagnosis',
        header : 'Diagnosis',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'drugs',
        header : 'Drugs',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
]