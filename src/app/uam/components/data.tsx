import { DropdownItem } from "@/utils/@types";
import Dropdown from "@components/dropdown/dropdown";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const getStatusClass = (status: string) => {
    switch (status) {
        case "pending":
            return `bg-[#FF950033]`
        case "active":
            return `bg-[#00C85133]`
        case "inactive":
            return `bg-[#FF000033]`
    }
}

const getStatusTextColor = (status: string) => {
    switch (status) {
        case "pending":
            return "#FF9500"
        case "active":
            return "#058e3c"
        case "inactive":
            return "#FF0000"
    }
}

const getRoleColor = (role: string) => {
    switch (role) {
        case "Admin":
            return "bg-[#3498db33]"
        case "User":
            return "bg-[#7a00e633]"
    }
}

const getRoleTextColor = (role: string) => {
    switch (role) {
        case "Admin":
            return "red"
        case "User":
            return "#3498db"
    }
}

const StatusChip = ({ status }: { status: string }) => {
    return (
        <div className={`flex px-4 py-1 rounded-full w-fit ${getStatusClass(status)}`}>
            <Text
                whiteSpace="nowrap"
                textColor={getStatusTextColor(status)}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
        </div>
    )
}

const RoleChip = ({ role }: { role: string }) => {
    return (
        <Text
            whiteSpace="nowrap"
            textColor={getRoleTextColor(role)}
        >
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </Text>
    )
}

const LastActiveChip = ({ lastActive }: { lastActive: string }) => {
    return (
        <div className="flex px-4 py-1 rounded-full w-fit bg-bg-secondary">
            <Text
                whiteSpace="nowrap"
            >
                {lastActive}
            </Text>
        </div>
    )
}

// const Actions = () => {
//     const dropdownItems: DropdownItem[] = [
//         { key : "1", label: "Deactivate", onClick: () => { } },
//         { key : "2", label: "Delete User", onClick: () => { } },
//     ]
//     return (
//         <Dropdown menuItems={dropdownItems}>
//             <BsThreeDots color={theme.colors.text.secondary} />
//         </Dropdown>
//     )
// }

const Actions = () => {
    const dropdownItems: DropdownItem[] = [
        { key : "1", label: "Deactivate", onClick: () => { } },
        { key : "2", label: "Delete User", onClick: () => { } },
    ]
    return (
        <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-bg-secondary hover:bg-bg-tetiary">
                <MdDelete color={"#eb4646"} />
            </div>
            <div className="p-2 rounded-md bg-bg-secondary hover:bg-bg-tetiary">
                <FaEdit color={theme.colors.text.secondary} />
            </div>
        </div>
    )
}

export const data = [
    {
        selectable: false,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Dennis Boakye",
        email: "dennisboakye@gmail.com",
        status: (
            <StatusChip status="pending" />
        ),
        role: (
            <RoleChip role="Admin" />
        ),
        lastActive: (
            <LastActiveChip lastActive="unknown" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: false,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Jane Doe",
        email: "janedoe@gmail.com",
        status: (
            <StatusChip status="active" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="2 days ago" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "John Doe",
        email: "johndoe@gmail.com",
        status: (
            <StatusChip status="inactive" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="unknown" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/women/4.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Kwame Boateng",
        email: "kwameboateng@gmail.com",
        status: (
            <StatusChip status="pending" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="15 minutes ago" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/men/5.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Kofi Asiedu",
        email: "kofiasiedu@gmail.com",
        status: (
            <StatusChip status="active" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="15 minutes ago" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/women/6.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Akua Akuffo",
        email: "akuakuffo@gmail.com",
        status: (
            <StatusChip status="inactive" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="unknown" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Kwasi Opoku",
        email: "kwasiopoku@gmail.com",
        status: (
            <StatusChip status="pending" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="5 days ago" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/women/8.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Akosua Owusu",
        email: "akosuowusu@gmail.com",
        status: (
            <StatusChip status="active" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="2 days ago" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/men/9.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Kofi Mensah",
        email: "kofimensah@gmail.com",
        status: (
            <StatusChip status="inactive" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="unknown" />
        ),
        actions: (
            <Actions />
        )
    },
    {
        selectable: true,
        profileImage: (
            <Image
                src="https://randomuser.me/api/portraits/women/10.jpg"
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-lg"
            />
        ),
        fullname: "Adwoa Owusu",
        email: "adwoaowusu@gmail.com",
        status: (
            <StatusChip status="inactive" />
        ),
        role: (
            <RoleChip role="User" />
        ),
        lastActive: (
            <LastActiveChip lastActive="unknown" />
        ),
        actions: (
            <Actions />
        )
    }
]
