import { useAuth } from "@clerk/react";
import { Link, useNavigate, useParams } from "react-router";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";
import type { Product } from "../types/product.types";

const EditProductPage = () => {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(id || "");
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner reference="Editor" />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Product not found" : "You don't own this product"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate({id: id || "", productData: formData as Partial<Product>}, {
          onSuccess:()=>navigate(`/product/${id}`)
        })
      }}
    />
  );
};

export default EditProductPage;
