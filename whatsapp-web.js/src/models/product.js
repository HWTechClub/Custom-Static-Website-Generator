
class Product {

    constructor({ id = '', name = '', desc = '', cost = 0, image = null } = {}) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cost = cost;
        this.image = image;
    }
}

module.exports.Product = Product;
