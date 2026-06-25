type Props = {
	eyebrow: string;
	title: string;
	subtitle: string;
	light?: boolean;
};

export default function SectionHeader({
	eyebrow,
	title,
	subtitle,
	light = false,
}: Props) {
	return (
		<div className="text-center max-w-xl mx-auto">
			<p
				className={`text-[10px] tracking-[0.3em] uppercase font-medium mb-3 ${
					light ? "text-brand-cyan/70" : "text-brand-purple-dark"
				}`}>
				{eyebrow}
			</p>

			<h2
				className={`font-serif text-3xl sm:text-4xl font-semibold leading-tight ${
					light ? "text-brand-white" : "text-brand-navy"
				}`}>
				{title}
			</h2>

			<div className="flex items-center justify-center gap-3 my-4">
				<div
					className={`h-[1px] w-10 ${
						light ? "bg-brand-purple/20" : "bg-brand-purple/30"
					}`}
				/>
				<span
					className={`text-[8px] ${
						light ? "text-brand-cyan/40" : "text-brand-purple/50"
					}`}>
					✦
				</span>
				<div
					className={`h-[1px] w-10 ${
						light ? "bg-brand-purple/20" : "bg-brand-purple/30"
					}`}
				/>
			</div>

			<p
				className={`text-[14px] font-light leading-relaxed ${
					light ? "text-brand-white/45" : "text-text-secondary/70"
				}`}>
				{subtitle}
			</p>
		</div>
	);
}
