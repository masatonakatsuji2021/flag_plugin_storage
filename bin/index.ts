import StorageType from "plugin-storage/StorageType";

export default class Storage{

    public type = StorageType.LOCAL;

    public id = "fstorage";

    public handleWriteBefore(data : any) : void{}

    public handleReadBefore(data : any) : void{}

    public read() : any;

    public read(name : string) : any;

    public read(name? : string) : any{

        let data;
        if(this.type == StorageType.LOCAL){
            data = localStorage.getItem(this.id);
        }
        else if(this.type == StorageType.SESSION){
            data = sessionStorage.getItem(this.id);
        }

        if(data){
            data = JSON.parse(data);
        }

        if(this.handleReadBefore){
            this.handleReadBefore(data);
        }

        if(name){
            return data[name];
        }
        else{
            return data;
        }
    }

    public write(writeData : Object) : Storage;

    public write(name : string, data : any) : Storage;

    public write(arg1 : string | Object, arg2? : any) : Storage{

        let data = this.read();

        if(arg2){
            const key = arg1;
            let val = arg2;
            // @ts-ignore
            data[key] = val;
        }
        else{
            const c = Object.keys(arg1);
            for(let n = 0 ; n < c.length ; n++){
                const key = c[n];
                const val = arg1[key];
                data[key] = val;
            }
        }

        if(this.handleWriteBefore){
            this.handleWriteBefore(data);
        }
 
        if(this.type == StorageType.LOCAL){
            localStorage.setItem(this.id, JSON.stringify(data));
        }
        else if(this.type == StorageType.SESSION){
            sessionStorage.setItem(this.id, JSON.stringify(data));
        }

        return this;
    }

    public delete(name : string) : Storage{

        let data = this.read();

        if(!data[name]){
            return this;
        }
        
        delete data[name];

        if(this.type == StorageType.LOCAL){
            localStorage.setItem(this.id, JSON.stringify(data));
        }
        else if(this.type == StorageType.SESSION){
            sessionStorage.setItem(this.id, JSON.stringify(data));
        }

        return this;
    }

    public clear() : Storage{

        if(this.type == StorageType.LOCAL){
            localStorage.removeItem(this.id);
        }
        else if(this.type == StorageType.SESSION){
            sessionStorage.removeItem(this.id);
        }

        return this;
    }
}