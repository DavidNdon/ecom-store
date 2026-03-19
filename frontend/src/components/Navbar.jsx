import React from 'react'
import { BoxIcon, ShoppingBagIcon, ShoppingCart } from 'lucide-react'
import { Link, useResolvedPath } from 'react-router-dom'
import { ThemeSelector } from './ThemeSelector';
import { useProductStore } from '../store/useProductStore';

const Navbar = () => {
      const {pathname} = useResolvedPath();
      const isHomePage = pathname == '/'

      const {products} = useProductStore()

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-conten/10 sticky top-0 z 50">
        <div className='max-w-7xl mx-auto'>
        <div className='navbar flex px-10 py-4 justify-between'>
            <Link to='/'>
            <div className='flex justify-between gap-3'>
                <BoxIcon data-theme="forest" />
                <p className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">EcomStore</p>
            </div>
            </Link>
            <div className='flex gap-4'>
               <ThemeSelector/>
                {isHomePage && (
                    <div className='indicator'>
                       <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
                         <Link to='/products'><ShoppingBagIcon className='size-5'/></Link>
                         <span className='badge badge-sm badge-primary indicator-item'>{products.length}</span>
                       </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar