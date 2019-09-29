

import { SearchItems } from "../types/item"

export const searchItemsImpl: SearchItems = (query, setLoading, setItems) => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
        const itemsPerPage = 10
        const fetchedItems = [{
            name: "typescript"
        },
        {
            name: "rust"
        },
        {
            name: "haskell"
        },
        {
            name: "sml"
        },
        {
            name: "ocaml"
        },
        {
            name: "go"
        },
        {
            name: "kotlin"
        },
        {
            name: "javascript"
        },
        {
            name: "elm"
        },
        {
            name: "isabelle"
        },
        {
            name: "coq"
        }
        ]

        const filterdItems = (() => {
            if (query.name !== "") {
                return fetchedItems.filter((item, i, all) => item.name === query.name)
            } else {
                return fetchedItems
            }
        })()

        const offset = query.page * itemsPerPage
        const limit = offset + itemsPerPage

        const items = filterdItems.slice(offset, limit)
        const total = Math.floor(filterdItems.length / itemsPerPage)

        setItems({
            items,
            total
        })
    }, 1000)
};
