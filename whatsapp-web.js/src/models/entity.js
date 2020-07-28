

class Entity {
    
    constructor(){
        this.data = new Map();  
        this.count = 0;
    }

    addData(key ,value){
        if(!this.isData(key)){
            this.data.set(key, value);
            return true;
        }
        return false;
    }

    /**
     * check if key exists
     * @param {string} key 
     */
    isData(key){
        return this.data.has(key) ? true : false;
    }

    deleteData(key){
        if(this.isData(key)){
            this.data.delete(key);
            return true;
        }
        return false;
    }

    clearData(){
        this.data = new Map();
        this.count = 0;
    }

    getData(key){
        if(this.isData(key)){
            return this.data.get(key);
        }
        return null;
    }

    getAllData(){
        return this.data;
    }
}

module.exports.Entity = Entity;