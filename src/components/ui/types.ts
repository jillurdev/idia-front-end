export type FileKind = "image" | "video" | "pdf" | "other";

export interface UploadedFile {
	url: string;
	name: string;
	size: number;
	type: string;
	publicId?: string;
	[key: string]: unknown;
}

export type FileUploadValue = UploadedFile | UploadedFile[] | null | undefined;

export type UploadFn = (
	file: File,
	onProgress: (percent: number) => void,
) => Promise<UploadedFile>;

export interface FileItem {
	id: string;
	file?: File;
	previewUrl: string;
	name: string;
	size?: number;
	type?: string;
	kind: FileKind;
	status: "uploading" | "done" | "error";
	progress: number;
	uploaded?: UploadedFile;
	error?: string;
}
