const { Entity } = require('./entity');
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
        this.products = new Entity();
    }

    /**
     * 
     * @param {Product} product 
     */
    addProduct(product){
        return this.products.addData(product.id, product);
    }

    /**
     * 
     * @param {string} productId 
     * @returns {Product}
     */
    getProduct(productId){
        return this.products.getData(productId);
    }

    /**
     * 
     * @returns {[]} 
     */
    getAllProduct(){
        return this.products.getAllData().values();
    }

    /**
     * 
     * @param {string} productId 
     */
    deleteProduct(productId){
        
        return this.products.deleteData(productId);
    }

    selectProduct(productId){
        return this.products.selectData(productId);
    }

    getSelectedProduct()
    {
        return this.products.selectedData;
    }


}

module.exports.Website = Website;