"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StorageType_1 = require("plugin-storage/StorageType");
class Storage {
    constructor() {
        this.type = StorageType_1.default.LOCAL;
        this.id = "fstorage";
    }
    handleWriteBefore(data) { }
    handleReadBefore(data) { }
    read(name) {
        let data;
        if (this.type == StorageType_1.default.LOCAL) {
            data = localStorage.getItem(this.id);
        }
        else if (this.type == StorageType_1.default.SESSION) {
            data = sessionStorage.getItem(this.id);
        }
        if (data) {
            data = JSON.parse(data);
        }
        if (this.handleReadBefore) {
            this.handleReadBefore(data);
        }
        if (name) {
            return data[name];
        }
        else {
            return data;
        }
    }
    write(arg1, arg2) {
        let data = this.read();
        if (arg2) {
            const key = arg1;
            let val = arg2;
            // @ts-ignore
            data[key] = val;
        }
        else {
            const c = Object.keys(arg1);
            for (let n = 0; n < c.length; n++) {
                const key = c[n];
                const val = arg1[key];
                data[key] = val;
            }
        }
        if (this.handleWriteBefore) {
            this.handleWriteBefore(data);
        }
        if (this.type == StorageType_1.default.LOCAL) {
            localStorage.setItem(this.id, JSON.stringify(data));
        }
        else if (this.type == StorageType_1.default.SESSION) {
            sessionStorage.setItem(this.id, JSON.stringify(data));
        }
        return this;
    }
    delete(name) {
        let data = this.read();
        if (!data[name]) {
            return this;
        }
        delete data[name];
        if (this.type == StorageType_1.default.LOCAL) {
            localStorage.setItem(this.id, JSON.stringify(data));
        }
        else if (this.type == StorageType_1.default.SESSION) {
            sessionStorage.setItem(this.id, JSON.stringify(data));
        }
        return this;
    }
    clear() {
        if (this.type == StorageType_1.default.LOCAL) {
            localStorage.removeItem(this.id);
        }
        else if (this.type == StorageType_1.default.SESSION) {
            sessionStorage.removeItem(this.id);
        }
        return this;
    }
}
exports.default = Storage;
