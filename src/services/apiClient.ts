export const apiClient = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1",

	async post<T>(path: string, body: unknown): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async get<T>(path: string, params?: object): Promise<T> {
		let fullPath = `${this.baseUrl}${path}`;

		if (params) {
			const query = Object.entries(params)
				.filter(([, value]) => value !== undefined && value !== null)
				.map(
					([key, value]) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
				)
				.join("&");

			if (query) fullPath += `?${query}`;
		}

		const res = await fetch(fullPath, {
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async put<T>(path: string, body: unknown): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async patch<T>(path: string, body: unknown): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async delete<T>(path: string): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "DELETE",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async upload<T>(path: string, formData: FormData): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			credentials: "include",
			body: formData, // Content-Type set kora hobe na, browser automatically multipart boundary set kore
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},
};
