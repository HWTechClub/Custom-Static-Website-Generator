const {Product} = require('./product');

class Website {
    
    /**
     *  @param {Object} details
     */
    constructor(companyName){
        this.firstName = '';
        this.lastName = '';
        this.companyName = companyName;
        this.logoUrl = '';
        this.bannerUrl = '';
        this.desc = '';
        this.email = '';
        //uses key value pair to store product
        //key is the productId of the product
        //value is the product itself
        this.products = {};
    }

    /**
     * 
     * @param {Product} product 
     */
    addProduct(product){
        if(this.products[product.id] == undefined)
        {
            this.products[product.id] = product;
            return true
        }

        return false;
    }

    /**
     * 
     * @param {string} productId 
     * @returns {Product}
     */
    getProduct(productId){
        return this.products[productId];
    }

    /**
     * 
     * @param {string} productId 
     */
    deleteProduct(productId){
        if(this.products[productId] != undefined)
        {
            return delete this.products[productId];
        }

        return false;
    }


}

module.exports.Website = Website;