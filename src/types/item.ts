import { StateSetter } from "./setter";
import { LoadingSetter } from "./loader";

export interface Item { 
    name: string
}

export interface SearchItemsQuery { 
    name: string 
}

export type ItemSetter = StateSetter<Item>
export type ItemsSetter = StateSetter<Item[]>

export type UseGetItems = (setLoading: LoadingSetter,setItems: ItemsSetter) => void

export type SearchItems = (query: SearchItemsQuery,setLoading: LoadingSetter,setItems: ItemsSetter) => void