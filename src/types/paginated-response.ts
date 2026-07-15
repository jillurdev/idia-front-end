export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface PaginatedApiResponse<T> {
	statusCode: number;
	success: boolean;
	message: string | null;
	timestamp: string;
	requestId: string;
	path: string;
	method: string;
	meta: PaginationMeta | null;
	data: T[];
}
