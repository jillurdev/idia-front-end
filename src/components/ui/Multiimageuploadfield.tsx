"use client";

import { useRef, useState } from "react";
import { Link2, Upload, X } from "lucide-react";
import { toast } from "sonner";

export interface GalleryImageItem {
	url: string; // pasted URL, or a local blob preview if `file` is set
	file?: File; // present only for not-yet-uploaded items — parent uploads these at submit time
	id?: string; // present only for images already saved on the product (edit mode)
}

interface MultiImageUploadFieldProps {
	label: string;
	value: GalleryImageItem[];
	onChange: (images: GalleryImageItem[]) => void;
	maxImages?: number;
}

// Product gallery (preview images shown on the detail page, in addition to
// the main Thumbnail). Add by URL or by selecting files — nothing uploads
// until the parent form actually submits and calls uploadApi on each
// pending `file`. `thumbnailUrl` on the product remains the single cover
// image; there's no separate "cover" concept among gallery images.
export function MultiImageUploadField({
	label,
	value,
	onChange,
	maxImages = 10,
}: MultiImageUploadFieldProps) {
	const [urlInput, setUrlInput] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const addItems = (items: GalleryImageItem[]) => {
		const room = maxImages - value.length;
		if (room <= 0) {
			toast.error(`Maximum ${maxImages} images allowed`);
			return;
		}
		onChange([...value, ...items.slice(0, room)]);
	};

	const handleAddUrl = () => {
		if (!urlInput.trim()) return;
		addItems([{ url: urlInput.trim() }]);
		setUrlInput("");
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (files.length === 0) return;

		const invalid = files.find(f => !f.type.startsWith("image/"));
		if (invalid) {
			toast.error("Please select only image files");
			return;
		}

		addItems(files.map(file => ({ url: URL.createObjectURL(file), file })));
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const removeAt = (index: number) => {
		const item = value[index];
		if (item.file) URL.revokeObjectURL(item.url);
		onChange(value.filter((_, i) => i !== index));
	};

	return (
		<div className="space-y-2">
			<label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-brand-purple-dark">
				{label} ({value.length}/{maxImages})
			</label>

			<div className="flex gap-2">
				<div className="relative flex-1">
					<Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
					<input
						type="text"
						value={urlInput}
						onChange={e => setUrlInput(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAddUrl();
							}
						}}
						placeholder="Paste an image URL and press Enter"
						className="w-full pl-9 pr-3 py-2.5 text-sm bg-brand-white border border-surface-subtle rounded-[6px] text-brand-black placeholder:text-brand-black/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all"
					/>
				</div>
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					className="flex items-center gap-1.5 px-4 py-2.5 border border-dashed border-surface-subtle rounded-[6px] text-[12px] text-text-muted hover:border-brand-purple/40 hover:text-brand-purple-dark transition-colors whitespace-nowrap">
					<Upload className="w-3.5 h-3.5" />
					Upload
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						multiple
						onChange={handleFileSelect}
						className="hidden"
					/>
				</button>
			</div>

			{value.length > 0 && (
				<div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
					{value.map((img, i) => (
						<div key={img.url + i} className="relative group">
							<img
								src={img.url}
								alt={`Image ${i + 1}`}
								className="w-full aspect-square object-cover rounded-lg border border-surface-subtle"
							/>
							{img.file && (
								<span className="absolute bottom-1 left-1 right-1 text-center text-[8px] px-1 py-0.5 bg-brand-navy/90 text-brand-white rounded-full truncate">
									On submit
								</span>
							)}
							<button
								type="button"
								onClick={() => removeAt(i)}
								className="absolute top-1 right-1 w-5 h-5 bg-brand-white/90 rounded-full flex items-center justify-center text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
								<X className="w-3 h-3" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
