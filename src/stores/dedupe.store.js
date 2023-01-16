import { action, makeObservable, observable } from "mobx" 

export class DedupeStore {
    assets = [1]
    constructor () {
        makeObservable(this, {assets:observable, getAssets:action})
    }
    getAssets = () => {
        console.log("Getting assets")
        this.assets = [2]
    }
}