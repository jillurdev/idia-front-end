"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { downloadsApi } from "../api";

export function useDownload() {
	const mutation = useMutation({
		mutationFn: (productId: string) => downloadsApi.request(productId),
		onSuccess: res => {
			window.open(res.data.fileUrl, "_blank");
		},
		onError: (err: unknown) => {
			const message = err instanceof Error ? err.message : "Download failed";
			toast.error(message);
		},
	});

	return {
		download: (productId: string) => mutation.mutate(productId),
		downloadingId: mutation.isPending ? mutation.variables : null,
	};
}
