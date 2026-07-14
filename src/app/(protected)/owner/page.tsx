import Link from "next/link";
import { Package, FolderTree, ShoppingCart, DollarSign } from "lucide-react";

const STATS = [
	{ label: "Total Products", value: "0", icon: Package },
	{ label: "Total Categories", value: "0", icon: FolderTree },
	{ label: "Total Purchases", value: "0", icon: ShoppingCart },
	{ label: "Total Revenue", value: "$0.00", icon: DollarSign },
];

export default function OwnerDashboardPage() {
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

			{/* Stat cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{STATS.map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className="p-5 rounded-xl border border-border bg-brand-white">
						<div className="flex items-center justify-between mb-3">
							<div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center">
								<Icon className="w-5 h-5 text-brand-purple-dark" />
							</div>
						</div>
						<p className="font-serif text-2xl font-semibold text-brand-navy">
							{value}
						</p>
						<p className="text-[12px] text-text-secondary/50 mt-1">{label}</p>
					</div>
				))}
			</div>

			{/* Quick actions */}
			<div className="mt-10">
				<h2 className="font-serif text-lg font-semibold text-brand-navy mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<Link
						href="/owner/categories"
						className="p-5 rounded-xl border border-border bg-brand-white hover:border-brand-purple/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)] transition-all duration-300 group">
						<FolderTree className="w-5 h-5 text-brand-purple-dark mb-3" />
						<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
							Create New Category
						</p>
						<p className="text-[12px] text-text-secondary/50 mt-1">
							Add a category before creating products
						</p>
					</Link>

					<Link
						href="/owner/products"
						className="p-5 rounded-xl border border-border bg-brand-white hover:border-brand-purple/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)] transition-all duration-300 group">
						<Package className="w-5 h-5 text-brand-purple-dark mb-3" />
						<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
							Add New Product
						</p>
						<p className="text-[12px] text-text-secondary/50 mt-1">
							Upload a new motion graphics asset
						</p>
					</Link>

					<Link
						href="/owner/emails"
						className="p-5 rounded-xl border border-border bg-brand-white hover:border-brand-purple/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)] transition-all duration-300 group">
						<ShoppingCart className="w-5 h-5 text-brand-purple-dark mb-3" />
						<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
							Send Broadcast Email
						</p>
						<p className="text-[12px] text-text-secondary/50 mt-1">
							Notify your customers about updates
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
