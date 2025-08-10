/* eslint-disable @next/next/no-img-element */
'use client';

import Image from "next/image";
import { useState, useEffect, use } from "react"
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { getProductByIdForAdminController, getProductByIdForUserController, updateProductByIdController, deleteProductByIdController } from "@/controllers/productController";
import { ProductAdminDetailsType, ProductUserDetailsType } from "@/models/productModels"
import { ArrowReturnIcon, ProgressSpinner, TrashIcon } from "@/icons/Icons"
import ImageNotFound from "@/assets/Images/ImageNotFound.png";
import CellInput from "@/components/CellInput"
import CellDisplay from "@/components/CellDisplay"
import BarCode from "@/components/BarCode";
import VerificationAlert from "@/components/VerificationAlert";

export default function ProductDetails(
    paramsPromise: { params: Promise<{ id: string }> }
) {
    const { id } = use(paramsPromise.params);
    const { user } = useUser();
    const [loadingProduct, setLoadingProduct] = useState(true)
    const [productData, setProductData] = useState<ProductAdminDetailsType | ProductUserDetailsType | null>(null)
    const [showBarCode, setShowBarCode] = useState(false)
    const [warningPrice, setWarningPrice] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [canUpdate, setCanUpdate] = useState(true)
    const [canDelete, setCanDelete] = useState(true)

    const handleUpdateProduct = async () => {
        if (!canUpdate || !productData) {
            return;
        }
        setCanUpdate(false)
        const updatingProduct = toast.loading("Actualizando Producto", {
            position: "top-center",
        });

        try {
            await updateProductByIdController(id, productData);
            toast.update(updatingProduct, {
                render: "Producto actualizado",
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanUpdate(true)
        } catch (error) {
            toast.update(updatingProduct, {
                render: error instanceof Error ? error.message : "Error al actualizar el producto",
                type: "error",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanUpdate(true)
        }
    }

    const handleDeleteProduct = async () => {
        if (!canDelete) {
            return;
        }
        setCanDelete(false)
        const deletingProduct = toast.loading("Eliminando Producto", {
            position: "top-center",
        });

        try {
            await deleteProductByIdController(id);
            toast.update(deletingProduct, {
                render: "Producto eliminado",
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            setShowDeleteAlert(false)
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanDelete(true)
            window.location.href = "/authenticated"
        } catch (error) {
            toast.update(deletingProduct, {
                render: error instanceof Error ? error.message : "Error al eliminar el producto",
                type: "error",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanDelete(true)
        }
    }

    const handleChangeMayoreo = (value: string) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue) || numberValue < 0) {
            if (productData) {
                setProductData({
                    ...productData,
                    precioMayoreo: 0,
                    precioMenudeo: 0
                });
            }
        } else {
            if (productData) {
                const newProductData = { ...productData };
                newProductData.precioMayoreo = numberValue;
                newProductData.precioMenudeo = Number((numberValue * 2).toFixed(2));
                if (user?.rol == "admin" && "precioPolitica" in productData && "precioConIva" in productData) {
                    changeRealUtilityPercentage(newProductData, numberValue, productData.precioConIva);
                    checkWarningPrice(numberValue, productData.precioPolitica)
                }
                setProductData(newProductData);
            }
        }
    }

    const handleSetPrecioTienda = (value: string) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue) || numberValue < 0) {
            if (productData) {
                setProductData({
                    ...productData,
                    precioTienda: 0,
                    precioConIva: 0,
                    precioPolitica: 0
                });
            }
        } else {
            if (productData && "precioTienda" in productData) {
                const newProductData = { ...productData };
                const newPrecioConIva = Number((numberValue * 1.16).toFixed(2))
                const newPrecioPolitica = Number(((numberValue * 1.16) * 1.4).toFixed(2))
                newProductData.precioTienda = numberValue;
                newProductData.precioConIva = newPrecioConIva;
                newProductData.precioPolitica = newPrecioPolitica;

                changeRealUtilityPercentage(newProductData, productData.precioMayoreo, newPrecioConIva);
                checkWarningPrice(productData.precioMayoreo, newPrecioPolitica);
                setProductData(newProductData);
            }
        }
    }

    const changeRealUtilityPercentage = (newProductData: ProductAdminDetailsType | ProductUserDetailsType, mayoreo: number, precioConIva: number) => {
        if (productData && "precioConIva" in productData && "precioMayoreo" in productData) {
            if (precioConIva > 0 && mayoreo > 0 && "porcentajeUtilidadReal" in newProductData) {
                newProductData.porcentajeUtilidadReal = Number(((mayoreo / precioConIva) * 100).toFixed(2))
            }
        }
    };

    const checkWarningPrice = (mayoreo: number, politica: number) => {
        if (!isNaN(politica) && !isNaN(mayoreo)) {
            if (mayoreo < politica) {
                setWarningPrice(true);
            } else {
                setWarningPrice(false);
            }
        }
    };

    // Fetch Product
    useEffect(() => {
        const fetchProduct = async () => {
            if (user && id) {
                setLoadingProduct(true);
                if (user.rol == "admin") {
                    getProductByIdForAdminController(id)
                        .then(product => {
                            setProductData(product as ProductAdminDetailsType);
                            setLoadingProduct(false);
                        });
                } else {
                    getProductByIdForUserController(id)
                        .then(product => {
                            setProductData(product as ProductUserDetailsType);
                            setLoadingProduct(false);
                        });
                }
            }
        };

        fetchProduct();
    }, [user, id]);

    return (
        <div className="h-full w-full bg-[#eff3f6]">

            {(loadingProduct) &&
                <div className="h-full flex justify-center items-center">
                    <ProgressSpinner />
                </div>
            }

            {!productData ?
                <div className="flex justify-center">
                    <h1>No se encontró el producto</h1>
                </div>
                :
                <div className="p-5">
                    {/* Delete Alert */}
                    {showDeleteAlert && (
                        <VerificationAlert
                            title="Eliminar Producto"
                            description={`¿Estás seguro de que deseas eliminar el producto: ${productData.nombre}?`}
                            setShowAlert={setShowDeleteAlert}
                            handleConfirm={handleDeleteProduct}
                        />
                    )}

                    <div className="flex flex-col gap-10">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-center max-md:text-xl">Detalles del producto</h1>

                        {/* Product Image */}
                        <div className="w-full flex justify-center max-md:pt-4">
                            <div className="overflow-hidden w-52 h-52 border border-[#0000001f] shadow-lg shadow-[#0000003b] rounded-3xl max-md:w-40 max-md:h-40">
                                {productData.imagen ?
                                    <img src={productData.imagen} alt="Imagen" className="w-full h-full object-cover" />
                                    :
                                    <Image src={ImageNotFound} alt="Imagen" className="w-full h-full object-cover" />
                                }
                            </div>
                        </div>

                        {/* Show CodeBar Button */}
                        <div className="flex justify-center">
                            <button
                                className="rounded-md bg-black hover:cursor-pointer"
                                onClick={() => {setShowBarCode(true)}}
                            >
                                <p className="px-4 p-2 text-white max-md:text-sm">Codigo de barras</p>
                            </button>
                        </div>

                        {/* Main Container */}
                        <div className="flex-1">
                            {/* Form Section */}
                            <div className="flex justify-center">
                                {/* Form Container */}
                                <div className="flex flex-col items-center gap-4">
                                    {/* Generic Name */}
                                    {"nombreGenerico" in productData &&
                                        <CellInput label={"Nombre Generico"} value={productData.nombreGenerico} setValue={(value) => setProductData({...productData, nombreGenerico: value})} handleEnter={handleUpdateProduct} />
                                    }

                                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                                        {/* Categoria */}
                                        {user?.rol == "admin" ?
                                            <CellInput label={"Categoria"} value={productData.categoria} setValue={(value) => setProductData({...productData, categoria: value})} handleEnter={handleUpdateProduct} />
                                            :
                                            <CellDisplay label={"Categoria"} value={productData.categoria} />
                                        }

                                        {/* Product Name */}
                                        {user?.rol == "admin" ?
                                            <CellInput label={"Nombre De Producto"} value={productData.nombre} setValue={(value) => setProductData({...productData, nombre: value})} handleEnter={handleUpdateProduct} />
                                            :
                                            <CellDisplay label={"Nombre De Producto"} value={productData.nombre} />
                                        }

                                        {/* Mayoreo */}
                                        {user?.rol == "admin" ?
                                            <div className="relative flex flex-col w-72">
                                                <div className="flex gap-3">
                                                    <h1 className="text-xs font-bold">Mayoreo</h1>
                                                    {warningPrice &&
                                                        <button className="text-yellow-500 text-xs font-bold"
                                                            onClick={() => {setWarningPrice(false)}}
                                                        >
                                                            ⚠️ El precio es menor al precio politica
                                                        </button>
                                                    }
                                                </div>
                                                {/* Price Format */}
                                                <div className="absolute left-[9px] top-[20px]">
                                                    <p className="text-[10px]">
                                                        $
                                                    </p>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="Mayoreo"
                                                    value={productData.precioMayoreo}
                                                    onChange={(e) => handleChangeMayoreo(e.target.value)}
                                                    onKeyDown={(e) => {if (e.key === "Enter") { handleUpdateProduct() }}}
                                                    className="w-72 rounded-md border-2 pr-2 pl-[14px] pb-[2px] max-sm:text-sm bg-white"
                                                />
                                            </div>
                                            :
                                            <CellDisplay label={"Mayoreo"} value={productData.precioMayoreo} isPrice={true} />
                                        }

                                        {/* Menudeo */}
                                        <CellDisplay label={"Menudeo"} value={productData.precioMenudeo} isPrice={true} />

                                        {/* Precio Tienda */}
                                        {"precioTienda" in productData &&
                                            <CellInput label={"Precio Tienda"} value={productData.precioTienda} setValue={handleSetPrecioTienda} handleEnter={handleUpdateProduct} isPrice={true} />
                                        }

                                        {/* Precio Con IVA */}
                                        {"precioConIva" in productData &&
                                            <CellDisplay label={"Precio Con IVA"} value={productData.precioConIva} isPrice={true} />
                                        }

                                        {/* Precio Politica */}
                                        {"precioPolitica" in productData &&
                                            <CellDisplay label={"Precio Politica"} value={productData.precioPolitica} isPrice={true} />
                                        }

                                        {/* Porcentaje Utilidad Real */}
                                        {"porcentajeUtilidadReal" in productData &&
                                            <CellDisplay label={"Porcentaje Utilidad Real"} value={`${productData.porcentajeUtilidadReal}%`} />
                                        }

                                        {/* Proveedor */}
                                        {"proveedor" in productData &&
                                            <CellInput label={"Proveedor"} value={productData.proveedor} setValue={(value) => setProductData({...productData, proveedor: value})} handleEnter={handleUpdateProduct} />
                                        }

                                        {/* Minimo Mayoreo */}
                                        {user?.rol == "admin" &&
                                            <CellInput label={"Minimo Mayoreo"} value={productData.minimoMayoreo} setValue={(value) => setProductData({...productData, minimoMayoreo: parseFloat(value)})} handleEnter={handleUpdateProduct} isNumber={true} />
                                        }
                                    </div>

                                    {/* Minimo Mayoreo */}
                                    {user?.rol == "user" &&
                                        <CellDisplay label={"Minimo Mayoreo"} value={productData.minimoMayoreo} />
                                    }

                                    {/* Codigo De Barras */}
                                    {user?.rol == "admin" &&
                                        <CellInput label={"Codigo De Barras"} value={productData.codigoDeBarras} setValue={(value) => setProductData({...productData, codigoDeBarras: value})} handleEnter={handleUpdateProduct} widthFull={true} />
                                    }

                                    {/* Imagen */}
                                    {user?.rol == "admin" &&
                                        <CellInput label={"Imagen"} value={productData.imagen} setValue={(value) => setProductData({...productData, imagen: value})} handleEnter={handleUpdateProduct} widthFull={true} />
                                    }

                                    {/* Update Button */}
                                    {user?.rol == "admin" &&
                                        <button
                                            className="mt-6 w-72 p-2 rounded-md bg-black hover:cursor-pointer"
                                            onClick={handleUpdateProduct}
                                        >
                                            <p className="max-md:text-sm text-white">
                                                Actualizar
                                            </p>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Same Generic Names Products */}
                        {/* <SameProducts from={"admin"} nombreGenerico={nombreGenerico} id={id} filterName={filterName} accessory={accessory} setAccessory={setAccessory} /> */}

                        {/* Delete Button */}
                        {user?.rol == "admin" &&
                            <div className="absolute right-5">
                                <button
                                    className="flex justify-center items-center p-1 pb-[5px] rounded-full bg-[#bb1717] hover:cursor-pointer"
                                    onClick={() => {setShowDeleteAlert(true)}}
                                >
                                    <TrashIcon color="#FFF" h="20px" w="20px" />
                                </button>
                            </div>
                        }

                        {/* Return Button */}
                        <div className="absolute left-5">
                            <button
                                className="flex justify-center items-center pt-1 pl-1 pr-[5px] pb-[5px] rounded-full bg-black hover:cursor-pointer"
                                onClick={() => window.location.href = `/authenticated`}
                            >
                                <ArrowReturnIcon color="#FFF" h="20px" w="20px" />
                            </button>
                        </div>
                    </div>

                    {/* Bar Code */}
                    { showBarCode && 
                        <BarCode codigoDeBarras={productData.codigoDeBarras} setShowBarCode={setShowBarCode} nombre={productData.nombre} />
                    }
                </div>
            }
        </div>
    )
}