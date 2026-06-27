"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function CustomerDashboard() {
	const { user, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className="p-10 animate-pulse text-center text-[#7c6a4a]">
				Loading...
			</div>
		);
	if (!user) return null;

	return (
		<div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
			{/* Welcome Hero */}
			<div className="rounded-3xl bg-gradient-to-r from-[#fffdf9] via-[#f9f5ee] to-[#f3ecdf] p-8 shadow-[0_15px_40px_rgba(13,13,13,0.06)]">
				<h1 className="text-3xl md:text-4xl font-bold text-[#0d0d0d]">
					Hi, {user.name} 👋
				</h1>
				<p className="mt-2 text-lg text-[#7c6a4a]">
					Welcome back to your dashboard
				</p>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard title="Orders" value={12} />
				<StatCard title="Profile Completion" value="80%" />
				<StatCard title="Notifications" value={3} />
				<StatCard title="Pending Actions" value={2} />
			</div>

			{/* Recent Orders / Activity */}
			<div className="rounded-2xl border border-[#eadfce] bg-white/80 backdrop-blur-sm p-6 shadow-[0_8px_30px_rgba(13,13,13,0.04)]">
				<h2 className="text-xl font-semibold text-[#0d0d0d] mb-4">
					Recent Orders
				</h2>
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="text-[#7c6a4a] border-b border-[#e4d8c4]">
							<th className="py-2 px-3">Order ID</th>
							<th className="py-2 px-3">Date</th>
							<th className="py-2 px-3">Status</th>
							<th className="py-2 px-3">Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr className="hover:bg-[#f5f0e8]/50 transition">
							<td className="py-2 px-3 font-medium text-[#0d0d0d]">#1001</td>
							<td className="py-2 px-3 text-[#6f675b]">2026-04-05</td>
							<td className="py-2 px-3 text-[#c8a96e] font-semibold">
								Delivered
							</td>
							<td className="py-2 px-3 text-[#0d0d0d] font-medium">$45.00</td>
						</tr>
						<tr className="hover:bg-[#f5f0e8]/50 transition">
							<td className="py-2 px-3 font-medium text-[#0d0d0d]">#1002</td>
							<td className="py-2 px-3 text-[#6f675b]">2026-04-03</td>
							<td className="py-2 px-3 text-[#7c6a4a] font-semibold">
								Processing
							</td>
							<td className="py-2 px-3 text-[#0d0d0d] font-medium">$75.00</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function StatCard({ title, value }: { title: string; value: string | number }) {
	return (
		<div className="rounded-xl bg-gradient-to-br from-[#fffdf9] via-[#f9f5ee] to-[#f3ecdf] p-5 shadow-md flex flex-col items-center justify-center">
			<p className="text-sm text-[#7c6a4a] font-medium">{title}</p>
			<p className="text-2xl font-bold text-[#0d0d0d] mt-2">{value}</p>
		</div>
	);
}
