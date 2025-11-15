export interface Product {
    name: string;
    price: number;
    description?: string;
    category?: string;
    resources?: ProductResources;
}

export interface ProductResources {
    uri: string;
    spriteUri: string;
}