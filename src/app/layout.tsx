import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./components/loader.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./QueryProvider";
import { AppContextProvider } from "./context/context";
import { AuthProvider } from "./context/authContext";

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
				<AuthProvider>
					<AppContextProvider>
						<QueryProvider>
							<Toaster />
							{children}
						</QueryProvider>
					</AppContextProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
