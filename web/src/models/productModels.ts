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

export type ProductAddType = {
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
}

export type ProductAdminDetailsType = {
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
}

export type ProductUserDetailsType = {
    nombre: string;
    nombreGenerico: string;
    categoria: string;
    precioMayoreo: number;
    precioMenudeo: number;
    minimoMayoreo: number;
    codigoDeBarras: string;
    imagen: string;
}

export type ProductAccessoryDetailsType = {
    _id: string;
    nombre: string;
    precioMayoreo: number;
    imagen: string;
}