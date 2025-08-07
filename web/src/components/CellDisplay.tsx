

export default function CellDisplay(
    { label, value, isPrice = false, widthFull = false } :
    { label: string; value: string | number; isPrice?: boolean; widthFull?: boolean }
) {
    return (
        <div className={`relative flex flex-col ${widthFull ? "w-full" : "w-72"}`}>
            {/* Title */}
            <h1 className="text-xs font-bold">{label}</h1>
            {isPrice &&
                <div className="absolute left-[9px] top-[20px] max-sm:left-[9.5px] max-sm:top-[19.5px]">
                    <p className="text-[10px] max-sm:text-[9px]">
                        $
                    </p>
                </div>
            }
            <p className={`w-full rounded-md border-2 pb-[2px] bg-white max-sm:text-sm ${isPrice ? "pr-2 pl-[14px]" : "px-2"}`}>
                {value}
            </p>
        </div>
    )
}