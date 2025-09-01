'use client'

import Menu from "./components/menu";
import Profile from "./components/profile";

const Sidebar = () => {
    return (
        <div 
            className="w-[250px] h-full z-[51] bg-bg-sidebar fixed left-0 top-0 border-r border-border-primary"
            style={{
                backgroundImage: "url('/assets/prod/sidebar-bg-3.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-bg-sidebar/90">
                <Profile />
                <Menu />
            </div>
        </div>
    )
}

export default Sidebar;