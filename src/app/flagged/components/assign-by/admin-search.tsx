import Input from "@components/input/input"
import { useAdminsContext } from "../../context/admins-context"
import { IoSearch } from "react-icons/io5"
import theme from "@styles/theme"
import { hexOpacity } from "@/utils/hexOpacity"
import AvailableAdmins from "./available-admins"
import NoData from "@components/NoData/noData"
import Text from "@styles/components/text"
import { Admin } from "../../hooks/use-admins"
import Button from "@components/button/button"

const AdminSearch = ({
    isVisible,
    setIsVisible,
    selectedAdmin,
    setSelectedAdmin,
    selectedRegions,
}: {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
    selectedAdmin: Admin | null,
    setSelectedAdmin: (admin: Admin | null) => void,
    selectedRegions: string[],
}) => {
    const { admins, setSearchQuery, searchQuery } = useAdminsContext()
    return (
        <div className="flex flex-col px-1 gap-1">
            <div className="w-full flex px-1">
                <Input
                    placeholder="Search for admin"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    className="!h-[32px] !px-2"
                    PreIcon={<IoSearch size={15} color={theme.colors.text.tetiary} />}
                />
            </div>
            {
                admins?.length > 0 ? (
                    <div className="flex flex-col gap-0.5">
                        <Text
                            textColor={theme.colors.text.secondary + hexOpacity(60)}
                            className="!pl-2"
                        >
                            Select Admin
                        </Text>
                        <AvailableAdmins
                            admins={admins}
                            setIsVisible={setIsVisible}
                            selectedAdmin={selectedAdmin}
                            setSelectedAdmin={setSelectedAdmin}
                            selectedRegions={selectedRegions}
                        />
                        <div className="flex w-full px-1">
                            <Button
                                text="Assign"
                                onClick={() => { }}
                                className="!w-full"
                            />
                        </div>
                    </div>
                ) : (
                    <NoData />
                )
            }
        </div>
    )
}
export default AdminSearch