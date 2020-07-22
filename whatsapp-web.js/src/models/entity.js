

class Entity {
    
    constructor(){
        this.data = new Map();  
        this.count = 0;
    }

    addData(key ,value){
        if(!this.isData(key)){
            this.data[key] = value;
            return true;
        }
        return false;
    }

    /**
     * check if key exists
     * @param {string} key 
     */
    isData(key){
        return this.data[key] != undefined ? true : false;
    }

    deleteData(key){
        if(this.isData(key)){
            return delete this.data[key];
        }
        return false;
    }

    clearData(){
        this.data = new Map();
        this.count = 0;
    }

    getData(key){
        if(this.isData(key)){
            return this.data[key];
        }
        return null;
    }
}

module.exports.Entity = Entity;