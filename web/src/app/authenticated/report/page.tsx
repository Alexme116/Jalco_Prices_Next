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
            try {
                setLoading(true)
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
        <div className="p-5">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center max-md:text-xl">{"Reporte KPI's"}</h1>

            {/* Loading */}
            {loading && (
                <div className="mt-3 flex justify-center">
                    <ProgressSpinner />
                </div>
            )}

            {/* Error */}
            {error && (
                <h1 className="text-center">Error: {error}</h1>
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
                    {/* Grid Products Ranked */}
                    <GridProductsKPI
                        products={products}
                    />
                </div>
            )}
        </div>
    )
}