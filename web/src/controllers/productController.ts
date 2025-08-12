'use server'

import { ProductCatalogType, ProductAddType, ProductAdminDetailsType, ProductUserDetailsType, ProductAccessoryDetailsType, ProductReportType } from "@/models/productModels";

const { BACKEND_HOST, BACKEND_BEARER_TOKEN } = process.env;

export async function getAllProductsCatalogController(): Promise<ProductCatalogType[]> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/catalog`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const { products } : { products: ProductCatalogType[] } = await response.json();
        return products;
    } catch (error) {
        throw error;
    }
}

export async function getProductByIdForAdminController(productId: string): Promise<ProductAdminDetailsType | null> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/admin/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        const { product } : { product: ProductAdminDetailsType } = data;
        return product;
    } catch (error) {
        throw error;
    }
}

export async function getProductByIdForUserController(productId: string): Promise<ProductUserDetailsType | null> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/user/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        const { product } : { product: ProductUserDetailsType } = data;
        return product;
    } catch (error) {
        throw error;
    }
}

export async function getProductsByGenericNameController(genericName: string): Promise<ProductAccessoryDetailsType[] | null> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/generic/${genericName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al obtener productos");
        }

        const { products } : { products: ProductAccessoryDetailsType[] } = data;
        return products;
    } catch (error) {
        throw error;
    }
}

export async function getAllProductsReportController(): Promise<ProductReportType[]> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/report/report`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al obtener productos");
        }

        const { products } : { products: ProductReportType[] } = data;
        return products;
    } catch (error) {
        throw error;
    }
}

export async function addProductController(productData: ProductAddType) {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al agregar producto");
        }

        const { product } : { product: ProductAddType } = data;
        return product;
    } catch (error) {
        throw error;
    }
}

export async function updateProductByIdController(productId: string, productData: ProductAdminDetailsType | ProductUserDetailsType) {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al actualizar producto");
        }

        const { product } : { product: ProductAddType } = data;
        return product;
    } catch (error) {
        throw error;
    }
}

export async function deleteProductByIdController(productId: string) {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/product/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar producto");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}