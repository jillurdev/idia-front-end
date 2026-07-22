import type { NextConfig } from "next";

const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*",
				destination: `${API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
