const {Product} = require('./product');

class Website {
    
    /**
     *  @param {Map<string,string>} details
     */
    constructor(details){
        this.details = details;
        this.products = [];
    }

    /**
     * 
     * @param {Product} product 
     */
    addProduct(product){
        this.products.push(product);
    }

}

module.exports.Website = Website;