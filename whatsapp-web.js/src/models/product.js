
class Product {

    constructor({ id = '', name = '', desc = '', cost = 0, image = null } = {}) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cost = cost;
        this.image = image;
        this.imageUrl = '';
    }

    /**
     * 
     * @param {Number} id 
     */
    setId(id){
        return this.id = id;
    }
    /**
     * 
     * @param {String} name 
     */
    setName(name){
        return this.name = name;
    }
    /**
     * 
     * @param {String} description 
     */
    setDesc(description){
        return this.desc = description;
    }
    /**
     * 
     * @param {Number} cost
     */
    setCost(cost){
        return this.cost = cost;
    }
    /**
     * 
     * @param {String} image 
     */
    setImage(image){
        return this.image = image;
    }

}

module.exports.Product = Product;
