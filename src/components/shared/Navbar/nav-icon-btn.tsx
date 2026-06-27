export function NavIconBtn({
	icon,
	label,
	badge,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	badge?: number;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			className="relative p-2 rounded-full text-brand-black/50 hover:text-brand-navy hover:bg-surface-subtle/60 transition-colors duration-200">
			{icon}
			{badge ? (
				<span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-brand-purple text-brand-navy text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
					{badge > 9 ? "9+" : badge}
				</span>
			) : null}
		</button>
	);
}
