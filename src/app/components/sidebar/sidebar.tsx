'use client'

import Menu from "./components/menu";
import Profile from "./components/profile";

const Sidebar = () => {

    return (
        <div className="w-[250px] h-full z-[51] bg-bg-sidebar fixed left-0 top-0 border-r border-border-primary">
            <Profile />
            <Menu />
        </div>
    )
}

export default Sidebar;
