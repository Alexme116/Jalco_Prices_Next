

export default function CellInput(
    { label, placeholder, value, setValue, handleEnter, isPrice = false, isNumber = false, widthFull = false } :
    { label: string; placeholder?: string; value: string | number; setValue: (value: string ) => void; handleEnter: () => void; isPrice?: boolean; isNumber?: boolean; widthFull?: boolean }
) {
    return (
        <div className={`relative flex flex-col ${widthFull ? "w-full" : "w-72"}`}>
            {/* Title */}
            <p className="text-xs font-bold">{label}</p>
            {isPrice &&
                <div className="absolute left-[9px] top-[20px] max-sm:left-[9.5px] max-sm:top-[19.5px]">
                    <p className="text-[10px] max-sm:text-[9px]">
                        $
                    </p>
                </div>
            }
            <input
                type={isPrice || isNumber ? "number" : "text"}
                placeholder={placeholder || label}
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (isPrice || isNumber) {
                        if (isNaN(Number(inputValue)) || Number(inputValue) < 0 || inputValue == "") {
                            setValue("0")
                        } else {
                            setValue(inputValue)
                        }
                    } else {
                        setValue(inputValue)
                    }
                }}
                onKeyDown={(e) => {if (e.key === "Enter") { handleEnter() }}}
                className={`text-[16px] w-full rounded-md border-2 pb-[2px] bg-white ${isPrice ? "pr-2 pl-[14px]" : "px-2"}`}
            />
        </div>
    )
}