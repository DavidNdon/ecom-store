import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditIcon, Trash2Icon } from 'lucide-react';

import { useProductStore } from '../store/useProductStore';
import LoadingComponent from '../components/LoadingComponent';


const ProductDetail = () => {
  const { slug } = useParams();
  const { products, loading, error, fetchProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products]);

  // Find product by slug (generate slug from name if not present)
  const product = products && products.find(
    (p) => (p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) === slug
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Product Detail</h1>
      <div className="flex gap-4 mx-10">
        {loading ? (
          <div className="text-center">
            {" "}
            <LoadingComponent className="item text-center" />{" "}
          </div>
        ) : error ? (
          <div className="alert alert-error mb-8">{error}</div>
        ) : !product ? (
          <div className="text-center text-error">Product not found.</div>
        ) : (
          <>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-dvh object-cover my-4 rounded"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-white mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">${product.price}</span>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-secondary"> <EditIcon /> </button>
                  <button
                    className="btn btn-sm btn-error btn-outline"
                   onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
