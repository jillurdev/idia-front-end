import { httpClient } from "@/services/httpClient";

export const downloadsApi = {
	// POST /downloads/:productId — verifies a COMPLETED purchase exists,
	// logs the download, and returns the file URL
	request: (productId: string) =>
		httpClient.post<ApiResponse<{ fileUrl: string }>>(
			`/downloads/${productId}`,
			{},
		),
};
