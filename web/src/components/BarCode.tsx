import { useState } from "react"
import { MinusIcon, PlusIcon } from "@/icons/Icons"
import Barcode from "react-barcode"

export default function BarCode(
    { codigoDeBarras, setShowBarCode, nombre } :
    { codigoDeBarras: string, setShowBarCode: (show: boolean) => void, nombre: string }
) {
    const [step, setStep] = useState(0)
    const [amount, setAmount] = useState(1)

    return (
        <div className="z-10 absolute top-0 left-0 h-svh w-svw flex justify-center items-center bg-[#00000096] cursor-default" onClick={() => {setShowBarCode(false)}}>
            <div
                className="
                    w-3/4 flex flex-col gap-3 p-3 rounded-lg bg-[rgb(239,243,246)] border-2 border-[#edbd63]
                    max-w-[32rem]"
                onClick={(e) => { e.stopPropagation() } }
            >
                {/* Title */}
                <h1
                    className="text-2xl font-bold text-center
                    max-lg:text-xl max-md:text-base"
                >
                    Codigo de barras
                </h1>

                {/* BarCode */}
                <div
                    className="w-full flex flex-col items-center"
                >
                    {/* BarCode Image */}
                    {(step == 0 && codigoDeBarras || step == 1) &&
                        <div className="w-full flex justify-center">
                            <Barcode
                                value={step == 0 ? codigoDeBarras : step == 1 ? String(amount) : ""}
                                displayValue={false}
                            />
                        </div>
                    }

                    {/* Product Name */}
                    {step == 0 &&
                        <div className="w-full mt-2">
                            <p className="font-bold text-center max-lg:text-sm max-md:text-xs">
                                {nombre}
                            </p>
                        </div>
                    }

                    {/* Product Quantity */}
                    {step == 1 &&
                        <div className="mt-3 w-full flex flex-col items-center">
                            <p className="font-bold text-center max-lg:text-sm max-md:text-xs">Cantidad</p>

                            <div className="mt-2 flex items-center gap-3">
                                <button
                                    className="p-1 rounded-full bg-[#4d4d4d] hover:cursor-pointer"
                                    onClick={() => {
                                        if (amount > 1) {
                                            setAmount(amount - 1);
                                        } else {
                                            setAmount(1);
                                        }
                                    }}
                                >
                                    <MinusIcon color="white" w={"15px"} h={"15px"} />
                                </button>

                                <input type="number" value={amount}
                                    className="w-16 text-center bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none"
                                    min={1}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setAmount(isNaN(value) ? 0 : value);
                                    }}
                                />

                                <button
                                    className="p-1 rounded-full bg-[#4d4d4d] hover:cursor-pointer"
                                    onClick={() => setAmount(amount + 1)}
                                >
                                    <PlusIcon color="white" w={"15px"} h={"15px"} />
                                </button>
                            </div>
                        </div>
                    }
                </div>

                {/* Action Buttons */}
                <div className="mt-5 w-full flex justify-around items-center">
                    {step > 0 &&
                        <button
                            className="rounded-lg w-24 pb-[10px] pt-2 flex justify-center items-center bg-[#4d4d4d] hover:cursor-pointer
                                max-lg:text-sm max-md:text-xs max-lg:pb-[8px] max-lg:pt-[6px]"
                            onClick={() => {
                                if (step != 0) {
                                    setStep(step - 1);
                                } else {
                                    setStep(0);
                                }
                            }}
                        >
                            <p className="text-sm font-bold max-lg:text-sm max-md:text-xs text-white">
                                Anterior
                            </p>
                        </button>
                    }

                    <button
                        className="rounded-lg w-24 pb-[10px] pt-2 flex justify-center items-center bg-[#e0ae51] hover:cursor-pointer
                            max-lg:text-sm max-md:text-xs max-lg:pb-[8px] max-lg:pt-[6px]"
                        onClick={() => {
                            if (step != 1) {
                                setStep(step + 1);
                            } else {
                                setShowBarCode(false);
                            }
                        }}
                    >
                        <p className="text-sm font-bold max-lg:text-sm max-md:text-xs text-white">
                            {step != 1 ? "Siguiente" : "Cerrar"}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}