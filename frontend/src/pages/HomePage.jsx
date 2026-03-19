import React, { useEffect } from 'react'
import { PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { EditIcon, Trash2Icon } from 'lucide-react';

import { useProductStore } from '../store/useProductStore'
import LoadingComponent from '../components/LoadingComponent'

const HomePage = () => {

  const {products, loading, error, fetchProducts, deleteProduct} = useProductStore()
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
   console.log("Products:", products)

  return (
    <div className='max-w-7xl px-4 mx-auto py-8'>
        <div className='flex justify-between items-center mb-8'>
          <button className='btn btn-primary' onClick={() => navigate('/add-product')}>
            <PlusCircleIcon/>
            Add Product
          </button>
        </div>

        {error && <div className='alert alert-error mb-8'>{error}</div>} 
        {loading ? (
          <div className='text-center'> <LoadingComponent /> </div>
        ) : (      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => {
            // Generate slug from product name if not present
            const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/products/${slug}`)}
              >
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                {/* <p className='text-gray-600 mb-4'>{product.description}</p> */}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">
                    ${product.price}
                  </span>
                  <div className="flex gap-2">
                  <button className="btn btn-sm btn-secondary mr"><EditIcon /></button>
                  <button
                    className="btn btn-sm btn-error btn-outline"
                     onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>)}

    </div>
  )
}

export default HomePage