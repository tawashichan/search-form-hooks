import React, { useCallback, useContext, useState } from "react";
import { SearchItemPageContext, SearchItemPageProps, SearchItemPage } from "./Page";
import { searchItemsImpl } from "../../reqs/searchItems";

type Props = Pick<SearchItemPageProps, "searchItems">

export const SearchForm: React.FC<Props> = ({ searchItems = searchItemsImpl }) => {
    const [searchWord, setSearchWord] = useState<string>("")

    const ctx = useContext(SearchItemPageContext)

    const search = useCallback(() => {
        searchItems({
            name: searchWord,
        },
            ctx.setItemLoading,
            ctx.setItems
        )
    }, [searchWord, searchItems, ctx.setItemLoading, ctx.setItems])

    const setSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }, [setSearchWord])

    return <>
        <input value={searchWord} onChange={setSearch} />
        <div onClick={search}>
            search
        </div>
    </>
}