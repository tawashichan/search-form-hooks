

import { SearchItems } from "../types/item"

export const searchItemsImpl: SearchItems = (query, setLoading, setItems) => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
        const items = [{
            name: "typescript"
        },
        {
            name: "rust"
        },
        {
            name: "haskell"
        }].filter((item, i, all) => item.name === query.name)
        setItems(items)
    }, 1000)
};
