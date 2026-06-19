import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*",
				destination:
					process.env.NODE_ENV === "production"
						? "https://api.idiadesigns.com/api/v1/:path*"
						: "http://localhost:5050/api/v1/:path*",
			},
		];
	},
};

export default nextConfig;
