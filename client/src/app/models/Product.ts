export class Product {
    public constructor(
        public idProduct?: number,
        public name?: string,
        public picture?: string | Blob,
        public price?: number | string,
        public nameCategory?: string,
        public idCategory?: number,
        public amount?: number,
        public idShoppingCart?: number | null
    ){}

}
