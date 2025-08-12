/* eslint-disable @next/next/no-img-element */
'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { ProductReportType } from "@/models/productModels";
import ImageNotFound from "@/assets/Images/ImageNotFound.png";

export default function GridProductsKPI(
    { products } :
    { products: ProductReportType[] }
) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [inputCurrentPage, setInputCurrentPage] = useState<number>(1);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const PRODUCTS_PER_PAGE = 12;

    const sortedProducts = [...products].sort((a, b) => b.vecesVisto - a.vecesVisto);
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

    const currentProducts = sortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const goToNextPage = () => {
        setCurrentPage((prev) => {
            const newPage = prev < totalPages ? prev + 1 : prev;
            setTimeout(scrollToBottom, 100);
            setInputCurrentPage(newPage);
            return newPage;
        });
    };
    
    const goToPrevPage = () => {
        setCurrentPage((prev) => {
            const newPage = prev > 1 ? prev - 1 : prev;
            setTimeout(scrollToBottom, 100);
            setInputCurrentPage(newPage);
            return newPage;
        });
    };

    const handleChangePage = (page: number) => {
        if (page < 1 || isNaN(page)) {
            setCurrentPage(1);
            setInputCurrentPage(1);
            return
        } else if (page > totalPages) {
            setCurrentPage(totalPages);
            setInputCurrentPage(totalPages);
            return
        }
        
        setTimeout(scrollToBottom, 100);
        setCurrentPage(page);
        setInputCurrentPage(page);
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-lg font-bold text-center max-md:text-xl">Productos Más Buscados</h1>

            {/* Grid */}
            <div className="w-full flex justify-center gap-0">
                <div className="grid w-fit mx-auto gap-4 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {currentProducts.map((product) => (
                        <div
                            key={product.nombre}
                            className="flex flex-col bg-white w-72 border border-[#0000001f] rounded-lg shadow-lg shadow-[#0000003b] max-md:w-60"
                        >
                            {/* Product Image */}
                            <div className="w-full flex justify-center pt-5 max-md:pt-4">
                                <div className="w-52 h-52 overflow-hidden max-md:w-40 max-md:h-40 rounded-3xl">
                                    {product.imagen ?
                                        <img src={product.imagen} alt="Imagen" className="w-full h-full object-cover" />
                                        :
                                        <Image src={ImageNotFound} alt="Imagen no encontrada" className="w-full h-full object-cover" />
                                    }
                                </div>
                            </div>

                            {/* Product Name */}
                            <div className="flex-1 w-full flex justify-center items-center">
                                <div className="flex flex-col gap-5 p-2 max-lg:py-4 max-md:py-3">
                                    <h2 className="font-bold text-center max-md:text-sm">{product.nombre}</h2>
                                    <h2 className="text-center max-md:text-sm">{`Busquedas: ${product.vecesVisto}`}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Page Controls */}
            <div className="mt-3 flex justify-center gap-10 items-center px-4">
                <button
                    onClick={goToPrevPage}
                    className="px-4 py-1 bg-gray-800 text-white rounded disabled:opacity-50 hover:cursor-pointer"
                    disabled={currentPage == 1}
                >
                    Anterior
                </button>

                <p className="text-sm text-center text-gray-600 font-medium">
                    <span>{"Página: "}</span>
                    <span>
                        <input
                            className={`text-center bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none
                                ${inputCurrentPage > 9 || currentPage > 9 ? "w-5" : "w-3"}`}
                            type="number"
                            value={inputCurrentPage}
                            onChange={(e) => setInputCurrentPage(parseInt(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    const target = e.target as HTMLInputElement;
                                    handleChangePage(parseInt(target.value));
                                }
                            }}
                            onBlur={() => handleChangePage(inputCurrentPage)}
                        />
                    </span>
                    <span>{`/ ${totalPages}`}</span>
                </p>

                <button
                    onClick={goToNextPage}
                    className="px-4 py-1 bg-gray-800 text-white rounded disabled:opacity-50 hover:cursor-pointer"
                    disabled={currentPage == totalPages}
                >
                    Siguiente
                </button>
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
