/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from "next/image";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProductsByGenericNameController } from "@/controllers/productController";
import { ProductAccessoryDetailsType } from "@/models/productModels"
import { CaretUpIcon, CaretDownIcon, CheckIcon } from "@/icons/Icons"
import ImageNotFound from "@/assets/Images/ImageNotFound.png";

export default function SameProducts(
    { nombreGenerico, id, accessory, setAccessory } :
    { nombreGenerico: string, id: string, accessory: ProductAccessoryDetailsType | null, setAccessory: (accessory: ProductAccessoryDetailsType | null) => void }
) {
    const [showSimilarProducts, setShowSimilarProducts] = useState<boolean>(false)
    const [similarProducts, setSimilarProducts] = useState<ProductAccessoryDetailsType[] | null>(null)

    const router = useRouter()

    const handleSelectAccessory = (product: ProductAccessoryDetailsType) => {
        if (!accessory) {
            setAccessory(product);
        } else {
            if (accessory._id == product._id) {
                setAccessory(null);
            } else {
                setAccessory(product);
            }
        }
    }

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const products = await getProductsByGenericNameController(nombreGenerico)
                setSimilarProducts(products)
            } catch (error) {
                console.error("Error fetching similar products:", error)
            }
        }

        fetchSimilarProducts()
    }, [])

    return (
        <div className="w-full flex flex-col items-center gap-5">
            {/* Title Section */}
            <button
                className="flex items-center gap-2 hover:cursor-pointer"
                onClick={() => setShowSimilarProducts(!showSimilarProducts)}
            >
                <h1 className=" font-bold pb-1">Productos Similares</h1>
                <div>
                    {!showSimilarProducts ?
                        <CaretUpIcon color="black" h={"23"} w={"23"} />
                        :
                        <CaretDownIcon color="black" h={"23"} w={"23"} />
                    }
                </div>
                
            </button>

            {/* Products Section */}
            {showSimilarProducts && similarProducts && similarProducts.length > 0 &&
                <div className="w-full flex justify-center pb-3">
                    <div
                        className={`
                            grid mx-auto gap-4
                            ${similarProducts.length == 3 ? "grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1" :
                                similarProducts.length == 2 ? "grid-cols-2 max-md:grid-cols-1" :
                                similarProducts.length == 1 ? "grid-cols-1" :
                            "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"}
                        `}
                    >
                        {similarProducts
                            .filter((product) => {
                                return product._id !== id
                            })
                            .map((product) => (
                                <div
                                    key={product._id}
                                    className="w-72 max-md:w-60 flex flex-col border rounded-lg shadow-lg bg-white border-[#0000001f] shadow-[#0000003b]"
                                >
                                    {/* Product Container */}
                                    <button
                                        className="flex flex-col hover:cursor-pointer"
                                        onClick={() => router.push(`/authenticated/productDetails/${product._id}`)}
                                    >
                                        {/* Product Image */}
                                        <div className="w-full flex justify-center pt-5 max-md:pt-4">
                                            <div className="w-52 h-52 overflow-hidden max-md:w-40 max-md:h-40 rounded-3xl">
                                                {product.imagen ?
                                                    <img src={product.imagen} alt="Imagen" className="w-full h-full object-cover" />
                                                    :
                                                    <Image src={ImageNotFound} alt="Imagen" className="w-full h-full object-cover" />
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

                                    {/* Select Product Button */}
                                    <div className="flex-1 flex items-end">
                                        <button
                                            className="w-full flex justify-center items-center gap-3 p-2 hover:cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectAccessory(product);
                                            }}
                                        >
                                            {/* check box */}
                                            <div className={`w-6 h-6 flex justify-center items-center border rounded-md border-black
                                                    ${accessory && accessory._id == product._id ? "bg-green-500" : "bg-white"}
                                                `}
                                            >
                                                {accessory && accessory._id == product._id &&
                                                    <CheckIcon color="white" h={"20"} w={"20"} stroke={3} />
                                                }
                                            </div>
                                            <h2 className="text-sm font-bold">
                                                {accessory && accessory._id == product._id ? "Seleccionado" : "Seleccionar"}
                                            </h2>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}