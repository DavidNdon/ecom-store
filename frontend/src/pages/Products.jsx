import { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';

export default function Products() {
    const { products, fetchProducts, loading, error } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
    if (error) return <div className="alert alert-error my-8">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
                    >
                        <div className="w-full flex justify-center mb-4 overflow-hidden rounded-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
                            />
                        </div>
                        <h2 className="text-lg font-semibold mb-2 text-center">{product.name}</h2>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-2 text-center">{product.description}</p>
                        <p className="text-primary font-bold text-lg">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}