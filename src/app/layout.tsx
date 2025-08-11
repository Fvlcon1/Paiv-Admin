import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./components/loader.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./QueryProvider";
import { AppContextProvider } from "./context/context";
import { AuthProvider } from "./context/authContext";
import Siderbar from "./components/sidebar/sidebar";
import Topbar from "./components/topbar/topbar";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PAIV Admin",
	description: "PAIV Admin",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} antialiased`}>
				<QueryProvider>
					<AuthProvider>
						<AppContextProvider>
							<Toaster />
							<Siderbar />
							<Topbar />
							<div className="ml-[250px] mt-[60px]">
								{children}
							</div>
						</AppContextProvider>
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
