'use client'

import { useState } from "react";
import { ProductCatalogType } from "@/models/productModels";
import { SearchIcon } from "@/icons/Icons";

export default function SearchBar(
    { products, itemToSearch, setItemToSearch } :
    { products: ProductCatalogType[], itemToSearch: string, setItemToSearch: (item: string) => void }
) {
    const [searchIsFocus, setSearchIsFocus] = useState(false);

    const filteredSuggestions = products.filter(product => product.nombre.toLowerCase().startsWith(itemToSearch.toLowerCase()));
    
    const handle_search_input_change = (name: string) => {
        setItemToSearch(name);
    }
    
    return (
        <div className={`flex justify-center h-10 w-3/5 max-lg:w-[35rem] max-md:w-[33rem] max-sm:w-[21rem] self-center border-2 rounded-md ${searchIsFocus ? "border-[#edbd63]" : "border-[#eff3f6]"} transition-all duration-300`}>
            {/* Search Input */}
            <div className="relative flex flex-col w-full h-full">
                <input
                    id="search_item"
                    autoComplete="off"
                    type="text"
                    placeholder="Buscar Producto"
                    className="text-[16px] w-full h-full px-2 pb-[2px] outline-none rounded-l-md bg-white"
                    value={itemToSearch}
                    onChange={(e) => { handle_search_input_change(e.target.value); setSearchIsFocus(true);}}
                    onKeyDown={(e) => {if (e.key === "Enter") { setSearchIsFocus(false) }}}
                    onFocus={() => setSearchIsFocus(true)}
                    onBlur={() => setSearchIsFocus(false)}
                />

                {/* Search Suggestions */}
                {(itemToSearch.length > 0 && searchIsFocus && filteredSuggestions.length > 0) && (
                    <div className={`absolute top-8 -left-0.5 w-[100.4%] max-lg:w-[32.25rem] max-md:w-[30.3rem] max-sm:w-[18.44rem] m-0 rounded-b-md bg-white border-2 border-[#edbd63] ${itemToSearch.length > 0 && searchIsFocus ? "border-t-0" : "border-t-2"}`}>
                        <ul>
                            {filteredSuggestions
                                .map((product, index) => (
                                    <button key={index} className="w-full text-left h-10 flex items-center justify-start px-2 pb-[2px] hover:bg-[#edbd63] hover:text-white transition-all"
                                        onMouseDown={() => {setItemToSearch(product.nombre)}}
                                    >
                                        <p className="truncate">{product.nombre}</p>
                                    </button>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Search Button */}
            <button
                onClick={() => { setSearchIsFocus(false) }}
                className={`flex justify-center items-center w-12 bg-[#edbd63] ${searchIsFocus ? "rounded-r-sm" : "rounded-r-md"} transition-all duration-300`}
            >
                <div className="flex items-center justify-center overflow-hidden">
                    <SearchIcon color="black" w={"25px"} h={"25px"} />
                </div>
            </button>
        </div>
    )
}