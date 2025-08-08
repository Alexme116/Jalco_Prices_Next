/* eslint-disable @next/next/no-img-element */
'use client'

import Image from "next/image";
import { ProductCatalogType } from "@/models/productModels";
import ImageNotFound from "@/assets/Images/ImageNotFound.png"


export default function ProductsGrid(
    { products, itemToSearch } :
    { products: ProductCatalogType[], itemToSearch: string }
) {

    const filteredProducts = itemToSearch == "" ? products : products.filter(product => product.nombre.toLowerCase().startsWith(itemToSearch.toLowerCase()));

    const handleGoToProductDetails = (productId: string) => {
        window.location.href = `/authenticated/productDetails/${productId}`;
    }
    
    return (
        <section className="flex justify-center">
            {/* No Products Message */}
            {filteredProducts.length == 0 &&
                <p className="text-gray-500">No se encontraron productos.</p>
            }

            {/* Products Grid */}
            {filteredProducts.length > 0 &&
                <div className="w-full flex justify-center">
                    <div
                        className={`
                            grid w-fit mx-auto gap-4
                            ${filteredProducts.length == 3 ? "grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1" :
                            filteredProducts.length == 2 ? "grid-cols-2 max-md:grid-cols-1" :
                            filteredProducts.length == 1 ? "grid-cols-1" :
                            "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"}
                        `}
                    >
                        {filteredProducts
                        .sort((a, b) => a.nombre.localeCompare(b.nombre))
                        .map((product) => (    
                            <button
                                key={product._id}
                                className="flex flex-col bg-white w-72 border border-[#0000001f] rounded-lg shadow-lg shadow-[#0000003b] max-md:w-60 hover:cursor-pointer"
                                onClick={() => handleGoToProductDetails(product._id)}
                            >
                                {/* Product Image */}
                                <div className="w-full flex justify-center pt-5 max-md:pt-4">
                                    <div className="w-52 h-52 overflow-hidden max-md:w-40 max-md:h-40 rounded-3xl">
                                        {product.imagen ?
                                            <img
                                                src={product.imagen}
                                                alt="Imagen"
                                                className="w-full h-full object-cover"
                                            />
                                            :
                                            <Image
                                                src={ImageNotFound}
                                                alt="Imagen"
                                            />
                                        }
                                        
                                    </div>
                                </div>

                                {/* Product Name */}
                                <div className="flex-1 w-full flex justify-center items-center">
                                    <div className="p-2 max-lg:py-4 max-md:py-3">
                                        <h2 className="font-bold text-center max-md:text-sm">{product.nombre}</h2>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}