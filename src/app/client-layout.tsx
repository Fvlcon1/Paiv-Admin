'use client';

import { usePathname } from "next/navigation";
import { noTempalteRoutes } from "@/utils/constants";
import { Toaster } from "react-hot-toast";
import Siderbar from "./components/sidebar/sidebar";
import Topbar from "./components/topbar/topbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTemplateRoute = !noTempalteRoutes.some(route => pathname?.startsWith(route));
  
  return (
    <>
      <Toaster />
      {
        isTemplateRoute && (
          <>
            <Siderbar />
            <Topbar />
          </>
        )
      }
      <div className={`h-full ${isTemplateRoute ? "ml-[250px] mt-[60px]" : ""}`}>
        {children}
      </div>
    </>
  );
}
