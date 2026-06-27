"use client";

import { useEffect, useState, useTransition } from "react";
import {
	UserCog,
	UserPlus,
	Trash2,
	Loader2,
	Check,
	ShieldAlert,
	Crown,
} from "lucide-react";
import { ROLE_CONFIG } from "@/types/roles";

type ManagedRole = "ADMIN" | "OWNER";

interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: ManagedRole;
	createdAt: string;
	isActive: boolean;
}

export default function AdminManageSection() {
	const [admins, setAdmins] = useState<AdminUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [showInvite, setShowInvite] = useState(false);
	const [invite, setInvite] = useState({
		email: "",
		name: "",
		role: "ADMIN" as ManagedRole,
	});
	const [isPending, startTransition] = useTransition();
	const [actionId, setActionId] = useState<string | null>(null);
	const [inviteSuccess, setInviteSuccess] = useState(false);
	const [inviteError, setInviteError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/admin/admins")
			.then(r => r.json())
			.then(data => {
				setAdmins(data.admins ?? []);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	function handleInvite() {
		setInviteError(null);
		if (!invite.email || !invite.name) {
			setInviteError("Name and email are required.");
			return;
		}
		startTransition(async () => {
			const res = await fetch("/api/admin/admins", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(invite),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				setInviteError(data.message ?? "Failed to create admin.");
				return;
			}
			const data = await res.json();
			setAdmins(prev => [...prev, data.user]);
			setInvite({ email: "", name: "", role: "ADMIN" });
			setShowInvite(false);
			setInviteSuccess(true);
			setTimeout(() => setInviteSuccess(false), 3000);
		});
	}

	function handleRevoke(id: string) {
		setActionId(id);
		startTransition(async () => {
			await fetch(`/api/admin/admins/${id}/revoke`, { method: "PATCH" });
			setAdmins(prev =>
				prev.map(a =>
					a.id === id
						? { ...a, role: "ADMIN" as ManagedRole, isActive: false }
						: a,
				),
			);
			setActionId(null);
		});
	}

	function handleRoleChange(id: string, role: ManagedRole) {
		setActionId(id);
		startTransition(async () => {
			await fetch(`/api/admin/admins/${id}/role`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ role }),
			});
			setAdmins(prev => prev.map(a => (a.id === id ? { ...a, role } : a)));
			setActionId(null);
		});
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<UserCog className="w-4 h-4 text-[#c8a96e]" />
					<h2 className="text-[15px] font-semibold text-[#0d0d0d]">
						Manage admins
					</h2>
				</div>
				<button
					onClick={() => setShowInvite(p => !p)}
					className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#c8a96e] text-[#0d0d0d] text-[13px] font-medium hover:bg-[#b8996e] transition-colors">
					<UserPlus className="w-3.5 h-3.5" />
					Add admin
				</button>
			</div>

			{inviteSuccess && (
				<p className="text-[12px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg flex items-center gap-1.5">
					<Check className="w-3.5 h-3.5" /> Admin added and invite sent.
				</p>
			)}

			{/* Invite form */}
			{showInvite && (
				<div className="p-4 rounded-xl border border-[#e4d8c4] bg-[#faf7f2] space-y-3">
					<p className="text-[13px] font-medium text-[#0d0d0d]">New admin</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<InputField
							label="Full name"
							value={invite.name}
							onChange={v => setInvite(p => ({ ...p, name: v }))}
							placeholder="Karim Hossain"
						/>
						<InputField
							label="Email address"
							value={invite.email}
							onChange={v => setInvite(p => ({ ...p, email: v }))}
							placeholder="karim@example.com"
							type="email"
						/>
					</div>
					<div className="space-y-1.5">
						<label className="text-[11px] font-medium text-[#9c8e7e] uppercase tracking-wider">
							Role
						</label>
						<div className="flex gap-2">
							{(["ADMIN", "OWNER"] as ManagedRole[]).map(r => {
								const conf = ROLE_CONFIG[r];
								return (
									<button
										key={r}
										onClick={() => setInvite(p => ({ ...p, role: r }))}
										className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-medium transition-all ${
											invite.role === r
												? "border-[#c8a96e] bg-[#fdf6e8]"
												: "border-[#e4d8c4] bg-white hover:bg-[#faf7f2]"
										}`}>
										{r === "OWNER" ? (
											<Crown
												className="w-3.5 h-3.5"
												style={{ color: conf.dot }}
											/>
										) : (
											<ShieldAlert
												className="w-3.5 h-3.5"
												style={{ color: conf.dot }}
											/>
										)}
										<span style={{ color: conf.text }}>{conf.label}</span>
									</button>
								);
							})}
						</div>
					</div>
					{inviteError && (
						<p className="text-[12px] text-red-500">{inviteError}</p>
					)}
					<div className="flex gap-2 pt-1">
						<button
							onClick={handleInvite}
							disabled={isPending}
							className="px-4 py-2 rounded-xl bg-[#c8a96e] text-[#0d0d0d] text-[13px] font-medium hover:bg-[#b8996e] transition-colors flex items-center gap-1.5 disabled:opacity-60">
							{isPending ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : (
								<Check className="w-3.5 h-3.5" />
							)}
							Create & invite
						</button>
						<button
							onClick={() => setShowInvite(false)}
							className="px-4 py-2 rounded-xl border border-[#e4d8c4] text-[13px] text-[#5c5244] hover:bg-[#f5f0e8] transition-colors">
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Admin list */}
			{loading ? (
				<div className="space-y-2">
					{Array(3)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className="h-16 rounded-xl bg-[#f5f0e8] animate-pulse"
							/>
						))}
				</div>
			) : admins.length === 0 ? (
				<p className="text-sm text-[#9c8e7e] text-center py-6">
					No admins yet.
				</p>
			) : (
				<div className="space-y-2">
					{admins.map(admin => {
						const conf = ROLE_CONFIG[admin.role];
						return (
							<div
								key={admin.id}
								className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-colors ${
									admin.isActive
										? "border-[#eadfce] bg-[#faf7f2]"
										: "border-[#e4d8c4] bg-[#f5f0e8] opacity-60"
								}`}>
								{/* Avatar initial */}
								<div
									className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
									style={{ backgroundColor: conf.bg, color: conf.text }}>
									{admin.name.charAt(0).toUpperCase()}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<p className="text-[13px] font-medium text-[#0d0d0d] truncate">
											{admin.name}
										</p>
										<span
											className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
											style={{ backgroundColor: conf.bg, color: conf.text }}>
											{conf.label}
										</span>
									</div>
									<p className="text-[11px] text-[#9c8e7e] truncate">
										{admin.email}
									</p>
								</div>
								{/* Actions */}
								<div className="flex items-center gap-1.5 shrink-0">
									{/* Promote to super admin */}
									{admin.role === "ADMIN" && (
										<button
											onClick={() => handleRoleChange(admin.id, "OWNER")}
											disabled={isPending && actionId === admin.id}
											title="Promote to Super Admin"
											className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9c8e7e] hover:bg-[#fdf6e8] hover:text-[#c8a96e] transition-colors">
											{isPending && actionId === admin.id ? (
												<Loader2 className="w-3.5 h-3.5 animate-spin" />
											) : (
												<Crown className="w-3.5 h-3.5" />
											)}
										</button>
									)}
									{/* Downgrade super admin */}
									{admin.role === "OWNER" && (
										<button
											onClick={() => handleRoleChange(admin.id, "ADMIN")}
											disabled={isPending && actionId === admin.id}
											title="Downgrade to Admin"
											className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9c8e7e] hover:bg-[#f5f0e8] hover:text-[#5c5244] transition-colors">
											{isPending && actionId === admin.id ? (
												<Loader2 className="w-3.5 h-3.5 animate-spin" />
											) : (
												<ShieldAlert className="w-3.5 h-3.5" />
											)}
										</button>
									)}
									{/* Revoke */}
									{admin.isActive && (
										<button
											onClick={() => handleRevoke(admin.id)}
											disabled={isPending && actionId === admin.id}
											title="Revoke access"
											className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9c8e7e] hover:bg-red-50 hover:text-red-500 transition-colors">
											<Trash2 className="w-3.5 h-3.5" />
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

function InputField({
	label,
	value,
	onChange,
	placeholder,
	type = "text",
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	type?: string;
}) {
	return (
		<div className="space-y-1.5">
			<label className="text-[11px] font-medium text-[#9c8e7e] uppercase tracking-wider">
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full px-3 py-2.5 rounded-xl border border-[#e4d8c4] bg-white text-sm text-[#0d0d0d] outline-none focus:border-[#c8a96e] focus:ring-2 focus:ring-[#c8a96e]/20 transition-all placeholder:text-[#c0b4a4]"
			/>
		</div>
	);
}
