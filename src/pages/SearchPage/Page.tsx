import React, { useState } from "react";
import { UseGetItems, SearchItems, Item, SearchItemWordSetter, ItemsResponse, ItemsResponseSetter } from "../../types/item";
import { LoadingSetter } from "../../types/loader";
import { useGetItemsImpl } from "../../hooks/useGetItems";
import { Items } from "./Items";
import { searchItemsImpl } from "../../reqs/searchItems";
import { SearchForm } from "./SearchForm";
import { CurrentPageSetter } from "../../types/page";

export interface SearchItemPageProps {
    useGetItems: UseGetItems
    searchItems: SearchItems
}

interface QueryParams {
    page: number
    word: string
}

interface Props extends SearchItemPageProps, QueryParams { }

export interface SearchItemPageContextProps {
    isItemLoading: boolean
    setItemLoading: LoadingSetter
    itemsResponse: ItemsResponse,
    setItemsResponse: ItemsResponseSetter,
    currentPage: number,
    setCurrentPage: CurrentPageSetter,
    searchWord: string,
    setSearchWord: SearchItemWordSetter
}

export const SearchItemPageContext = React.createContext<SearchItemPageContextProps>({
    isItemLoading: false,
    setItemLoading: () => { },
    itemsResponse: {
        items: [],
        total: 0
    },
    setItemsResponse: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    searchWord: "",
    setSearchWord: () => { }
});

export const SearchItemPage: React.FC<Props> = (
    {
        useGetItems = useGetItemsImpl,
        searchItems = searchItemsImpl,
        page = 0,
        word = ""
    }
) => {
    const [isItemLoading, setItemLoading] = useState<boolean>(false)
    const [itemsResponse, setItemsResponse] = useState<ItemsResponse>({
        items: [],
        total: 0
    })
    const [currentPage, setCurrentPage] = useState<number>(page)
    const [searchWord, setSearchWord] = useState<string>(word)

    useGetItems(
        {
            name: word,
            page
        },
        setItemLoading,
        setItemsResponse
    );

    return <SearchItemPageContext.Provider value={{
        isItemLoading,
        setItemLoading,
        itemsResponse,
        setItemsResponse,
        currentPage,
        setCurrentPage,
        searchWord,
        setSearchWord
    }}>
        <SearchForm searchItems={searchItems} />
        <Items searchItems={searchItems} />
    </SearchItemPageContext.Provider>
}