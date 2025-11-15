export interface Filters {
    categories?: string[];
    price?: PriceFilter;
}

export interface PriceFilter {
    min?: number;
    max?: number;
}