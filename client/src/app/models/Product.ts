export class Product {
    public constructor(
        public idProduct?: number,
        public name?: string,
        public picture?: FileList,
        public price?: number | string,
        public nameCategory?: string,
        public idCategory?: number,
        public amount?: number,
        public idShoppingCart?: number | null
    ){}

    public static convertToFormData(product: Product): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product?.name);
        myFormData.append("price", product?.price.toString());
        myFormData.append("nameCategory", product?.nameCategory);
        myFormData.append("idCategory", product?.idCategory.toString());
        if (product.picture) {
            myFormData.append("image", product.picture.item(0) as Blob);
        }
        return myFormData;
    }
}
