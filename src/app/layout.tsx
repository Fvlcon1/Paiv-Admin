import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./styles/antd.css"
import "./components/loader.css";
import QueryProvider from "./QueryProvider";
import { AppContextProvider } from "./context/context";
import { AuthProvider } from "./context/authContext";
import ClientLayout from "./client-layout";
import AntdConfigProvider from "./utils/antdConfigProvider";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PAIV Admin",
	description: "PAIV Admin",
};

// This is a Server Component by default
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} antialiased`}>
				<QueryProvider>
					<AntdConfigProvider>
						<AuthProvider>
							<AppContextProvider>
								<ClientLayout>
									{children}
								</ClientLayout>
							</AppContextProvider>
						</AuthProvider>
					</AntdConfigProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
