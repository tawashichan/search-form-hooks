import { StateSetter } from "./setter";
import { LoadingSetter } from "./loader";

export interface Item {
    name: string
}

export interface SearchItemsQuery {
    name: string
    page: number
}

export type ItemSetter = StateSetter<Item>
export type ItemsSetter = StateSetter<Item[]>
export type ItemsResponseSetter = StateSetter<ItemsResponse>

export interface ItemsResponse {
    items: Item[],
    total: number
}

export type SearchItemWordSetter = StateSetter<string>

export type UseGetItems = (query: SearchItemsQuery, setLoading: LoadingSetter, setItemsResponse: ItemsResponseSetter) => void

export type SearchItems = (query: SearchItemsQuery, setLoading: LoadingSetter, setItemsResponse: ItemsResponseSetter) => void    