import { useEffect, useState } from "react";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Search…",
	debounceMs = 400,
}: SearchInputProps) {
	const [local, setLocal] = useState(value);

	useEffect(() => setLocal(value), [value]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (local !== value) onChange(local);
		}, debounceMs);
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [local]);

	return (
		<input
			type="text"
			value={local}
			onChange={e => setLocal(e.target.value)}
			placeholder={placeholder}
			className="h-9 w-full max-w-xs rounded-md border border-border bg-surface px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-glow"
		/>
	);
}
