

class Entity {
    
    constructor(){
        this.data = new Map();  
        this.selectedData = null;
        this.count = 0;
    }

    addData(key ,value){
        if(!this.isData(key)){
            this.data.set(key, value);
            this.selectedData = key;
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
            if(this.selectedData == key){
                this.selectedData = null;
            }
            return true;
        }
        return false;
    }

    clearData(){
        this.selectedData = null;
        this.data = new Map();
        this.count = 0;
    }

    /**
     * Select a specific data with its key
     * @param {string} key 
     * @returns true if a data is selected 
     * @returns false if data is null
     */
    selectData(key){
        if(this.isData(key))
        {
            this.selectedData = key;
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {string} key 
     * @returns the value mapped to the key
     */
    getData(key){
        if(this.isData(key)){
            return this.data.get(key);
        }
        return null;
    }

    /**
     * @returns a map of all data
     */
    getAllData(){
        return this.data;
    }
}

module.exports.Entity = Entity;