import type { UploadFn } from "@/components/ui/types";

/**
 * TEMPORARY mock upload function — no backend call yet.
 * Simulates progress and resolves with a local blob URL so you can see
 * the full FileUpload flow (preview, progress, done state) in the console.
 *
 * Replace this with a real implementation once your backend is ready —
 * just swap the body of this function, everything else (FileUpload,
 * CategoryForm) stays the same since the UploadFn shape won't change.
 */
export const uploadFile: UploadFn = (file, onProgress) =>
	new Promise(resolve => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += 20;
			onProgress(Math.min(progress, 100));
			if (progress >= 100) {
				clearInterval(interval);
				const result = {
					url: URL.createObjectURL(file),
					name: file.name,
					size: file.size,
					type: file.type,
				};
				console.log("[mock upload] done:", result);
				resolve(result);
			}
		}, 200);
	});
