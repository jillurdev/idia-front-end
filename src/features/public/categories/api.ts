import { httpClient } from "@/services/httpClient";
import { Category } from "../product/types";

export const categoriesApi = {
	getAll: () => httpClient.get<ApiResponse<Category[]>>("/categories"),
};
