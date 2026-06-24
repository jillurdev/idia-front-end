import { cn } from "@/lib/utils";
import { NavUser } from "./types";

export function NavAvatar({
	user,
	size = "md",
}: {
	user: NavUser;
	size?: "sm" | "md";
}) {
	const dim = size === "sm" ? "w-7 h-7 text-[11px]" : "w-9 h-9 text-[13px]";
	if (user.avatar) {	
		return (
			<img
				src={user.avatar}
				alt={user?.name}
				className={cn("rounded-full object-cover", dim)}
			/>
		);
	}
	return (
		<span
			className={cn(
				"rounded-full bg-brand-navy text-brand-white font-semibold flex items-center justify-center",
				dim,
			)}>
			{user?.name?.charAt(0).toUpperCase()}
		</span>
	);
}
