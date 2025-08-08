'use server'

import { ProductCatalogType, ProductAddType, ProductAdminDetailsType, ProductUserDetailsType } from "@/models/productModels";

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
        console.error("Error fetching products:", error);
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
        console.error("Error fetching product:", error);
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
        console.error("Error fetching product:", error);
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