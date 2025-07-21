import ProductForm from "@features/Product/Components/Product/ProductForm"

import { useParams } from 'react-router-dom';


export default function EditProductPage() {
  const { productCode } = useParams<{ productCode: string }>();

  return <ProductForm mode="edit" productCode={productCode} />;
}
