
class Product {

    constructor({ id = '', name = '', desc = '', cost = 0, image = null }) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cost = cost;
        this.image = image;
    }

    getId(){
        return this.id;
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setDesc(desc){
        this.desc = desc;
    }

    getDesc(){
        return this.desc;
    }

    setCost(cost){
        this.cost = cost;
    }

    getCost(){
        return this.cost;
    }

    setImage(image){
        this.imageUrl = image;
    }
    
    getImage(){
        return this.imageUrl;
    }

}

module.exports.Product = Product;
