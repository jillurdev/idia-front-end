import { Suspense } from "react";
import ProductsPage from "@/features/public/product/components";

export const metadata = {
	title: "Browse Products",
};

const page = () => {
	return (
		<Suspense fallback={null}>
			<ProductsPage />
		</Suspense>
	);
};

export default page;
