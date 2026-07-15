"use client";

import Link from "next/link";
import { Package, FolderTree, ShoppingCart, DollarSign } from "lucide-react";
import { StatCard } from "@/features/owner/overview/components/StatCard";
import { useOwnerOverview } from "../hooks/useOverview";

const QUICK_ACTIONS = [
	{
		href: "/owner/categories",
		icon: FolderTree,
		title: "Create New Category",
		description: "Add a category before creating products",
	},
	{
		href: "/owner/products",
		icon: Package,
		title: "Add New Product",
		description: "Upload a new motion graphics asset",
	},
	{
		href: "/owner/emails",
		icon: ShoppingCart,
		title: "Send Broadcast Email",
		description: "Notify your customers about updates",
	},
];

export default function OwnerOverviewPage() {
	const { data, isLoading, isError } = useOwnerOverview();

	const stats = [
		{
			label: "Total Products",
			value: data?.totalProducts ?? "0",
			icon: Package,
		},
		{ label: "Total Users", value: data?.totalUsers ?? "0", icon: FolderTree },
		{
			label: "Total Purchases",
			value: data?.totalPurchases ?? "0",
			icon: ShoppingCart,
		},
		{
			label: "Total Revenue",
			value:
				data?.totalRevenueUsd !== undefined
					? `$${data.totalRevenueUsd.toLocaleString()}`
					: "$0.00",
			icon: DollarSign,
		},
	];

	return (
		<div>
			<div className="mb-8">
				<h1 className="font-serif text-2xl font-semibold text-brand-navy">
					Dashboard
				</h1>
				<p className="text-[13px] text-text-secondary/60 mt-1">
					Overview of your store's performance
				</p>
			</div>

			{isError && (
				<div className="mb-6 rounded-lg border border-border bg-brand-white p-6 text-center text-sm text-red-600">
					Failed to load dashboard stats.
				</div>
			)}

			{/* Stat cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{stats.map(({ label, value, icon }) => (
					<StatCard
						key={label}
						label={label}
						value={value}
						icon={icon}
						isLoading={isLoading}
					/>
				))}
			</div>

			{/* Quick actions */}
			<div className="mt-10">
				<h2 className="font-serif text-lg font-semibold text-brand-navy mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{QUICK_ACTIONS.map(({ href, icon: Icon, title, description }) => (
						<Link
							key={href}
							href={href}
							className="p-5 rounded-xl border border-border bg-brand-white hover:border-brand-purple/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)] transition-all duration-300 group">
							<Icon className="w-5 h-5 text-brand-purple-dark mb-3" />
							<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
								{title}
							</p>
							<p className="text-[12px] text-text-secondary/50 mt-1">
								{description}
							</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
