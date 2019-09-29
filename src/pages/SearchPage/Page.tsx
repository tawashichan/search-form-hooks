import React, { useState } from "react";
import { UseGetItems, SearchItems, Item, ItemsSetter } from "../../types/item";
import { LoadingSetter } from "../../types/loader";
import { useGetItemsImpl } from "../../hooks/useGetItems";
import { Items } from "./Items";
import { searchItemsImpl } from "../../reqs/searchItems";
import { SearchForm } from "./SearchForm";

export interface SearchItemPageProps {
    useGetItems: UseGetItems
    searchItems: SearchItems
}

export interface SearchItemPageContextProps {
    isItemLoading: boolean
    setItemLoading: LoadingSetter
    items: Item[],
    setItems: ItemsSetter
}

export const SearchItemPageContext = React.createContext<SearchItemPageContextProps>({
    isItemLoading: false,
    setItemLoading: () => { },
    items: [],
    setItems: () => { }
});

export const SearchItemPage: React.FC<SearchItemPageProps> = ({ useGetItems = useGetItemsImpl, searchItems = searchItemsImpl }) => {
    const [isItemLoading, setItemLoading] = useState<boolean>(false)
    const [items, setItems] = useState<Item[]>([])

    useGetItems(setItemLoading, setItems);

    return <SearchItemPageContext.Provider value={{
        isItemLoading,
        setItemLoading,
        items,
        setItems,
    }}>
        <SearchForm />
        <Items />
    </SearchItemPageContext.Provider>
}