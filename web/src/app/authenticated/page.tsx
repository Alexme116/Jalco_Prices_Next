'use client'

import { useState, useEffect } from "react"
import { getAllProductsCatalogController } from "@/controllers/productController";
import { ProductCatalogType } from "@/models/productModels";
import { ProgressSpinner } from "@/icons/Icons";
import SearchBar from "@/components/SearchBar";
import ProductsGrid from "@/components/ProductsGrid";

export default function Dashboard() {
    const [products, setProducts] = useState<ProductCatalogType[]>([]);
    const [itemToSearch, setItemToSearch] = useState<string>("");
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            const productsData = await getAllProductsCatalogController();
            if (productsData) {
                setProducts(productsData);
            }
            setLoadingProducts(false);
        }
        
        fetchProducts()
    }, [])

    return (
        <main className="h-full w-full">
            <section className="p-5 flex flex-col gap-5">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center max-md:text-xl">Productos</h1>

                {/* Loading Spinner */}
                {loadingProducts &&
                    <div className="flex justify-center">
                        <ProgressSpinner />
                    </div>
                }

                {products.length == 0 && !loadingProducts &&
                    <div className="flex justify-center">
                        <p className="text-gray-500">No hay productos disponibles.</p>
                    </div>
                }

                {products.length > 0 && !loadingProducts &&
                    <div className="flex flex-col gap-5">
                        {/* Search Bar */}
                        <SearchBar
                            products={products}
                            itemToSearch={itemToSearch}
                            setItemToSearch={setItemToSearch}
                        />

                        {/* Products Grid */}
                        <ProductsGrid
                            products={products}
                            itemToSearch={itemToSearch}
                        />
                    </div>
                }
            </section>
        </main>
    )
}