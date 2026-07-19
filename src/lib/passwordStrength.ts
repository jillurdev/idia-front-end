export function getPasswordStrength(password: string) {
	if (!password) return { score: 0, label: "", color: "", textColor: "" };

	let score = 0;
	if (password.length >= 8) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	const levels = [
		{ score: 1, label: "Weak", color: "bg-red-400", textColor: "text-red-400" },
		{
			score: 2,
			label: "Fair",
			color: "bg-amber-400",
			textColor: "text-amber-500",
		},
		{
			score: 3,
			label: "Good",
			color: "bg-brand-purple",
			textColor: "text-brand-purple-dark",
		},
		{
			score: 4,
			label: "Strong",
			color: "bg-emerald-500",
			textColor: "text-emerald-600",
		},
	];

	return levels[score - 1] ?? { score: 0, label: "", color: "", textColor: "" };
}
