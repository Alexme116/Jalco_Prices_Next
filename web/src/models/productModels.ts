export type ProductType = {
    _id: string;
    nombre: string;
    nombreGenerico: string;
    categoria: string;
    precioMayoreo: number;
    precioMenudeo: number;
    precioTienda: number;
    precioConIva: number;
    precioPolitica: number;
    porcentajeUtilidadReal: number;
    proveedor: string;
    minimoMayoreo: number;
    codigoDeBarras: string;
    imagen: string;
    vecesVisto?: number;
}

export type ProductCatalogType = {
    _id: string;
    nombre: string;
    imagen: string;
}