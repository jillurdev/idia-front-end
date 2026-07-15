import ProductsPage from '@/features/public/product/components';
import React from 'react'
export const metadata = {
	title: "Browse Products",
};

const page = () => {
  return (
	<div>
	  <ProductsPage/>
	</div>
  )
}

export default page
