import { httpClient } from "@/services/httpClient";

export interface UploadedImage {
	url: string;
	publicId: string;
}

export const uploadApi = {
	// POST /uploads/image — single image (multipart)
	image: (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		return httpClient.upload<ApiResponse<UploadedImage>>(
			"/uploads/image",
			formData,
		);
	},

	// POST /uploads/images — up to 10 images at once (multipart)
	images: (files: File[]) => {
		const formData = new FormData();
		files.forEach(file => formData.append("files", file));
		return httpClient.upload<ApiResponse<UploadedImage[]>>(
			"/uploads/images",
			formData,
		);
	},

	// POST /uploads/video — preview video (multipart)
	video: (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		return httpClient.upload<ApiResponse<UploadedImage>>(
			"/uploads/video",
			formData,
		);
	},

	// POST /uploads/file — the actual downloadable product file: zip, psd,
	// ai, mp4 source, etc. (multipart, uploaded as Cloudinary 'raw')
	file: (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		return httpClient.upload<ApiResponse<UploadedImage>>(
			"/uploads/file",
			formData,
		);
	},
};
