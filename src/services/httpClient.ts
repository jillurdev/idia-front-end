// services/httpClient.ts

const BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

// Custom error class — so callers can check error.status
export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public data?: unknown,
	) {
		super(message);
		this.name = "ApiError";
	}
}

type QueryParams = Record<string, string | number | boolean | null | undefined>;

// Core fetch wrapper — single place for all fetch logic
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw new ApiError(
			res.status,
			data.message || "Something went wrong",
			data,
		);
	}

	return data as T;
}

// Build query string cleanly
function buildQuery(params: QueryParams): string {
	const query = Object.entries(params)
		.filter(([, v]) => v !== undefined && v !== null)
		.map(
			([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
		)
		.join("&");

	return query ? `?${query}` : "";
}

export const httpClient = {
	get<T>(path: string, params?: QueryParams): Promise<T> {
		const fullPath = params ? `${path}${buildQuery(params)}` : path;
		return request<T>(fullPath);
	},

	post<T>(path: string, body: unknown): Promise<T> {
		return request<T>(path, {
			method: "POST",
			body: JSON.stringify(body),
		});
	},

	put<T>(path: string, body: unknown): Promise<T> {
		return request<T>(path, {
			method: "PUT",
			body: JSON.stringify(body),
		});
	},

	patch<T>(path: string, body: unknown): Promise<T> {
		return request<T>(path, {
			method: "PATCH",
			body: JSON.stringify(body),
		});
	},

	delete<T>(path: string): Promise<T> {
		return request<T>(path, { method: "DELETE" });
	},

	// Upload — no Content-Type header, browser sets multipart boundary
	upload<T>(path: string, formData: FormData): Promise<T> {
		return request<T>(path, {
			method: "POST",
			body: formData,
			headers: {}, // override to remove Content-Type
		});
	},
};
