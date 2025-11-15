export interface Item {
    name: string;
    price: number;
    description?: string;
    category?: string;
    resources?: ItemResources;
}

export interface ItemResources {
    uri: string;
    spriteUri: string;
}