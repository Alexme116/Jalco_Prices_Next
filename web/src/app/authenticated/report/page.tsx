'use client';

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getAllProductsReportController } from "@/controllers/productController";
import { ProductReportType } from "@/models/productModels";
import { ProgressSpinner } from "@/icons/Icons"
import GridProductsKPI from "@/components/GridProductsKPI";

export default function ReportPage() {
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<ProductReportType[] | null>(null)

    const router = useRouter()

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const data = await getAllProductsReportController()
                setProducts(data)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error obteniendo productos")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts();
    }, [])

    // Check User Authentication
    useEffect(() => {
        if (user) {
            if (user.rol != "admin") {
                router.push("/authenticated")
            }
        }
    }, [user, router])

    return (
        <div className="overflow-auto flex-1 p-5 bg-[#eff3f6]">
            {/* Loading */}
            {loading || !user && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ProgressSpinner />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="w-full pt-5">
                    <h1 className="text-center">Error: {error}</h1>
                </div>
                
            )}

            {/* No Products */}
            {!loading && !error && products && products.length == 0 && user && (
                <div className="w-full pt-5">
                    <p className="text-center">No hay productos disponibles</p>
                </div>
            )}

            {/* Report KPI's */}
            {!loading && !error && products && products.length > 0 && (
            <div className="flex flex-col gap-5">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center max-md:text-xl">{"Reporte KPI's"}</h1>

                {/* Grid Products Ranked */}
                <GridProductsKPI
                    products={products}
                />
            </div>
            )}
        </div>
    )
}