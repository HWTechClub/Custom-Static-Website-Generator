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
        this.logo = '';
        this.banner = '';
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
     * returns all the products in the website
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

    /**
     * @returns {Product}
     */
    getSelectedProduct()
    {
        return this.getProduct(this.products.selectedData);
    }

    toJson(){
        let j = {};
        j["firstName"] = this.firstName;
        j["lastName"] = this.lastName;
        j["companyName"] = this.companyName;
        j["logoUrl"] = this.logoUrl;
        j["bannerUrl"] = this.bannerUrl;
        j["email"] = this.email;
        j["description"] = this.desc;
        
        let csv = '';
        for (let prod of this.products.getAllData().values())
        {
            let m = [prod.id, prod.name, prod.desc, prod.cost, prod.imageUrl].join(',');
            csv += `${m}\n`;
        }
        j['csv'] = csv;

        return JSON.stringify(j);
    }


}

module.exports.Website = Website;