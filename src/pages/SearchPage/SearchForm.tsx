import React, { useCallback, useContext, useState } from "react";
import { SearchItemPageContext, SearchItemPageProps } from "./Page";
import { searchItemsImpl } from "../../reqs/searchItems";

type Props = Pick<SearchItemPageProps, "searchItems">

export const SearchForm: React.FC<Props> = ({ searchItems = searchItemsImpl }) => {
    const ctx = useContext(SearchItemPageContext)

    const [searchWord, setSearchWord] = useState<string>(ctx.searchWord)

    const search = useCallback(() => {
        ctx.setSearchWord(searchWord)
        ctx.setCurrentPage(0)
        searchItems({
            name: searchWord,
            page: 0,
        },
            ctx.setItemLoading,
            ctx.setItemsResponse
        )
    }, [searchWord, searchItems, ctx.setItemLoading, ctx.setItemsResponse, ctx.currentPage, ctx.setSearchWord])

    const setSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }, [setSearchWord])

    return <>
        <input value={searchWord} onChange={setSearch} />
        <button onClick={search} disabled={ctx.isItemLoading}>
            search
        </button>
    </>
}