import { useStoreContext } from "../context/store.context"
import { observer } from "mobx-react"

const Assets = () => {
    const {dedupeStore} = useStoreContext()
    const {assets, getAssets} = dedupeStore
    const handleGetAssets = () => {
        // console.log("Handle get assets")
        getAssets()
    }
    return (
        <div>
            <button onClick={handleGetAssets}>Load Assets </button>
            <div>loaded assets: {assets}</div>
        </div>
    )
}

export default observer(Assets)