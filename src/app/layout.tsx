import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "IdiaDesigns – %s",
		default: "IdiaDesigns — Where Elegance Meets Excellence",
	},
	description: "Premium motion graphics, templates, and digital assets.",
	icons: {
		icon: "/favicon.svg",
	},
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body>
				<Providers>
					{children}  
				</Providers>
			</body>
		</html>
	);
}
