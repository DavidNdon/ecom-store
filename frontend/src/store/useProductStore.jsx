import {create} from 'zustand'
import axios from 'axios'

const BASE_URL ="http://localhost:3001";

export const useProductStore = create((set, get) => ({
    //product state
    products:[],
    loading:false,
    errorr: null,

    fetchProducts: async () => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/getproducts`)
            set({products:response.data.data, error:null});
        } catch (error) {
            if(error.status === 429){
                set({error:"Too many requests. Please try again later."});
            } else {
                set({error:"An error occurred while fetching products."});
            }
        }finally{
            set({loading:false})
        }
    },
    fetchProductById: async (id) => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`)
            set({products:response.data.data, error:null})
        } catch (error) {
            if(error.status === 429){
                set({error:"Too many requests. Please try again later."});
            } else {
                set({error:"An error occurred while fetching products."});
            }
        } finally {
            set({loading:false});
        }
    },
    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            // Remove the deleted product from the state
            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
                error: null,
                
            }));
        } catch (error) {
            if(error.status === 429){
                set({error:"Too many requests. Please try again later."});
            } else {
                set({error:"An error occurred while deleting the product."});
            }
        } finally {
            set({loading:false});
        }
    }
}))

export default useProductStore;