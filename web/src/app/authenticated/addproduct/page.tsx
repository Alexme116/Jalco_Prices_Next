/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import { useUser } from "@/context/UserContext";
import { addProductController } from "@/controllers/productController";
import { ProductAddType } from "@/models/productModels";
import { ProgressSpinner } from "@/icons/Icons";
import ImageNotFound from "@/assets/Images/ImageNotFound.png";
import CellInput from "@/components/CellInput";
import CellDisplay from "@/components/CellDisplay";

export default function AddProductPage() {
    const { user } = useUser();
    const [loadingUser, setLoadingUser] = useState(true);
    const [warningPrice, setWarningPrice] = useState(false);
    const [newProductData, setNewProductData] = useState<ProductAddType>(
        {
            nombre: "",
            nombreGenerico: "",
            categoria: "",
            precioMayoreo: 0,
            precioMenudeo: 0,
            precioTienda: 0,
            precioConIva: 0,
            precioPolitica: 0,
            porcentajeUtilidadReal: 0,
            proveedor: "",
            minimoMayoreo: 0,
            codigoDeBarras: "",
            imagen: ""
        }
    );

    const router = useRouter();

    const handleAddProduct = async () => {
        const addingProduct = toast.loading("Agregando producto...", {
            position: "top-center",
        });

        try {
            await addProductController(newProductData);
            toast.update(addingProduct, {
                render: "Producto agregado exitosamente",
                type: "success",
                isLoading: false,
                autoClose: 1500
            });
            clearProductData();
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error) {
            toast.update(addingProduct, {
                render: error instanceof Error ? error.message : "Error al agregar el producto",
                type: "error",
                isLoading: false,
                autoClose: 1500
            });
        }
    }

    const clearProductData = () => {
        setNewProductData({
            nombre: "",
            nombreGenerico: "",
            categoria: "",
            precioMayoreo: 0,
            precioMenudeo: 0,
            precioTienda: 0,
            precioConIva: 0,
            precioPolitica: 0,
            porcentajeUtilidadReal: 0,
            proveedor: "",
            minimoMayoreo: 0,
            codigoDeBarras: "",
            imagen: ""
        });
    }

    const handleChangeMayoreo = (value: string) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue) || numberValue < 0) {
            setNewProductData({
                ...newProductData,
                precioMayoreo: 0,
                precioMenudeo: 0
            });
        } else {
            setNewProductData({
                ...newProductData,
                precioMayoreo: numberValue,
                precioMenudeo: Number((numberValue * 2).toFixed(2))
            });
        }
    }

    const handleSetPrecioTienda = (value: string) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue) || numberValue < 0) {
            setNewProductData({
                ...newProductData,
                precioTienda: 0,
                precioConIva: 0,
                precioPolitica: 0
            });
        } else {
            setNewProductData({
                ...newProductData,
                precioTienda: numberValue,
                precioConIva: Number((numberValue * 1.16).toFixed(2)),
                precioPolitica: Number(((numberValue * 1.16) * 1.4).toFixed(2))
            });
        }
    }

    // Warning Price
    useEffect(() => {
        if (!isNaN(newProductData.precioPolitica) && !isNaN(newProductData.precioMayoreo)) {
            if (newProductData.precioMayoreo < newProductData.precioPolitica) {
                setWarningPrice(true);
            } else {
                setWarningPrice(false);
            }
        }
    }, [newProductData.precioPolitica, newProductData.precioMayoreo]);

    // Change Porcentaje Utilidad Real
    useEffect(() => {
        if (newProductData.precioConIva > 0 && newProductData.precioMayoreo > 0) {
            setNewProductData({
                ...newProductData,
                porcentajeUtilidadReal: Number(((newProductData.precioMayoreo / newProductData.precioConIva) * 100).toFixed(2))
            })
        }
    }, [newProductData.precioConIva, newProductData.precioMayoreo])

    // Check User Permissions
    useEffect(() => {
        if (user) {
            if (user.rol != "admin") {
                router.replace("/authenticated");
            } else {
                setLoadingUser(false);
            }
        }
    }, [user]);

    return (
        <section className="p-5">
            {loadingUser ?
                <div className="flex justify-center">
                    <ProgressSpinner />
                </div>
                :
                <div className="flex flex-col gap-10">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center max-md:text-xl">Agregar Producto</h1>

                    {/* Product Image */}
                    <div className="w-full flex justify-center max-md:pt-4">
                        <div className="overflow-hidden w-52 h-52 border border-[#0000001f] shadow-lg shadow-[#0000003b] rounded-3xl max-md:w-40 max-md:h-40">
                            {newProductData.imagen ?
                                <img src={newProductData.imagen} alt="Imagen" className="w-full h-full object-cover" />
                                :
                                <Image src={ImageNotFound} alt="Imagen" className="w-full h-full object-cover" />
                            }
                        </div>
                    </div>

                    {/* Main Container */}
                    <div className="flex-1">
                        {/* Form Section */}
                        <div className="flex justify-center">
                            {/* Form Container */}
                            <div className="flex flex-col items-center gap-4">
                                {/* Generic Name Input */}
                                <CellInput label={"Nombre Generico"} value={newProductData.nombreGenerico} setValue={(value) => setNewProductData({ ...newProductData, nombreGenerico: value })} handleEnter={handleAddProduct} />

                                {/* SubGrid Inputs */}
                                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                                    {/* Categoria Input */}
                                    <CellInput label={"Categoria"} value={newProductData.categoria} setValue={(value) => setNewProductData({ ...newProductData, categoria: value })} handleEnter={handleAddProduct} />

                                    {/* Product Input */}
                                    <CellInput label={"Nombre De Producto"} value={newProductData.nombre} setValue={(value) => setNewProductData({ ...newProductData, nombre: value })} handleEnter={handleAddProduct} />

                                    {/* Precio Tienda Input */}
                                    <CellInput label={"Precio Tienda"} value={newProductData.precioTienda} setValue={handleSetPrecioTienda} handleEnter={handleAddProduct} isPrice={true} />

                                    {/* Precio Con IVA */}
                                    <CellDisplay label={"Precio Con IVA"} value={newProductData.precioConIva} isPrice={true} />

                                    {/* Precio Politica */}
                                    <CellDisplay label={"Precio Politica"} value={newProductData.precioPolitica} isPrice={true} />

                                    {/* Mayoreo Input */}
                                    <div className="relative flex flex-col w-72">
                                        <div className="flex gap-3">
                                            <h1 className="text-xs font-bold">Mayoreo</h1>
                                            {warningPrice &&
                                                <button
                                                    className="text-yellow-500 text-xs font-bold"
                                                    onClick={() => {setWarningPrice(false)}}
                                                >
                                                    ⚠️ El precio es menor al precio politica
                                                </button>
                                            }
                                        </div>
                                        <div className="absolute left-[9px] top-[20px]">
                                            <p className="text-[10px]">
                                                $
                                            </p>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Mayoreo"
                                            className="text-[16px] w-72 rounded-md border-2 pr-2 pl-[14px] pb-[2px] bg-white"
                                            value={newProductData.precioMayoreo}
                                            onChange={(e) => handleChangeMayoreo(e.target.value)}
                                            onKeyDown={(e) => {if (e.key === "Enter") {handleAddProduct()}}}
                                        />
                                    </div>

                                    {/* Menudeo */}
                                    <CellDisplay label={"Menudeo"} value={newProductData.precioMenudeo} isPrice={true} />

                                    {/* Porcentaje Utilidad Real */}
                                    <CellDisplay label={"Porcentaje Utilidad Real"} value={`${newProductData.porcentajeUtilidadReal}%`} />

                                    {/* Proveedor Input */}
                                    <CellInput label={"Proveedor"} value={newProductData.proveedor} setValue={(value) => setNewProductData({ ...newProductData, proveedor: value })} handleEnter={handleAddProduct} />

                                    {/* Minimo Mayoreo Input */}
                                    <CellInput label={"Minimo Mayoreo"} value={newProductData.minimoMayoreo} setValue={(value) => setNewProductData({ ...newProductData, minimoMayoreo: parseFloat(value) })} handleEnter={handleAddProduct} isNumber={true} />
                                </div>

                                {/* Codigo De Barras Input */}
                                <CellInput label={"Codigo De Barras"} placeholder={"Codigo De Barras"} value={newProductData.codigoDeBarras} setValue={(value) => setNewProductData({ ...newProductData, codigoDeBarras: value })} handleEnter={handleAddProduct} widthFull={true} />

                                {/* Imagen Input */}
                                <CellInput label={"Imagen"} placeholder={"URL de Imagen"} value={newProductData.imagen} setValue={(value) => setNewProductData({ ...newProductData, imagen: value })} handleEnter={handleAddProduct} widthFull={true} />

                                {/*Add Button */}
                                <button
                                    className="w-72 rounded-md mt-6 bg-black text-white hover:cursor-pointer"
                                    onClick={handleAddProduct}
                                >
                                    <p className="pb-2 pt-1 max-md:pt-0 max-md:pb-[6px] max-md:text-sm">Agregar</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}