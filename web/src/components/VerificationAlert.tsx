

export default function VerificationAlert(
    { title, description, setShowAlert, handleConfirm } :
    { title: string, description: string, setShowAlert: (show: boolean) => void, handleConfirm: () => void }
) {
    return (
        <div
            className="z-10 absolute top-0 left-0 h-svh w-svw flex justify-center items-center bg-[#00000096] cursor-default"
            onClick={() => {setShowAlert(false)}}
        >
            <div
                className="w-72 flex flex-col gap-3 p-3 rounded-lg bg-[rgb(239,243,246)] border-2 border-[#edbd63]"
                onClick={(e) => { e.stopPropagation() } }
            >
                {/* Title */}
                <h1 className="text-2xl font-bold text-center">{title}</h1>

                {/* Description */}
                <p className="text-sm text-center">{description}</p>

                {/* Buttons */}
                <div className="flex justify-around mt-3">
                    {/* Cancel Button */}
                    <button
                        className="py-1 px-2 rounded-lg bg-[#0000001a] hover:cursor-pointer"
                        onClick={() => {setShowAlert(false)}}
                    >
                        <h1 className="">Cancelar</h1>
                    </button>

                    {/* Confirm Button */}
                    <button className="py-1 px-2 rounded-lg bg-[#edbd63] hover:cursor-pointer"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}