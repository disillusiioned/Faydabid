export class Product {
    NAME: string;
    SKU_CODE: string;
    PRICE: number;
}
export class Warehouse {
    NAME: string;
    WH_CODE: string;
    PINCODE: string;
    MAX_CAPACITY: number;
}
export class Stock {
    ID: number;
    SKU_CODE: string;
    WH_CODE: string;
    ITEM_COUNT: number;
    LOW_ITEM_THRESHOLD: number;
    NAME: string;
    PRICE: number;
}