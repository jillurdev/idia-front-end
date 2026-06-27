export default function ProductsEmpty() {
	return (
		<div className="min-h-[400px] rounded-2xl border border-dashed border-brand-parchment bg-white flex items-center justify-center">
			<div className="text-center space-y-2">
				<h3 className="text-xl font-semibold text-brand-navy">
					No products found
				</h3>
				<p className="text-sm text-brand-black/60">
					Try changing your search or filters.
				</p>
			</div>
		</div>
	);
}
