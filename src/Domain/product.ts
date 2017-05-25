
type ProductId = number

class Product {
    constructor(public id : ProductId, public name : string) {}
}

class ProductRepository {
    getAll() : Product[] {
        return [new Product(100, "Red Shirt"), new Product(12, "Green trousers")];
    }

    getById(productId : number) : Product {
        let allProducts = this.getAll()

        return allProducts.filter(p => p.id == productId)[0];
    }
}