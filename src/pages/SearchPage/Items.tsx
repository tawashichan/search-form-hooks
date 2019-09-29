import React, { useCallback, useContext, useMemo } from "react";
import { SearchItemPageContext, SearchItemPageProps } from "./Page";
import { searchItemsImpl } from "../../reqs/searchItems";

type Props = Pick<SearchItemPageProps, "searchItems">

export const Items: React.FC<Props> = ({ searchItems = searchItemsImpl }) => {

    const ctx = useContext(SearchItemPageContext)

    const itemsRenderer = useCallback(() => {
        switch (true) {
            case ctx.isItemLoading:
                return <div>loading...</div>
            case ctx.itemsResponse.items.length === 0:
                return <div>no items</div>
            default:
                const items = ctx.itemsResponse.items.map((item, i, all) =>
                    <div key={item.name}>
                        {item.name}
                    </div>
                )
                return <div>
                    {items}
                </div>
        }
    }, [ctx.isItemLoading, ctx.itemsResponse.items])

    const search = useCallback((page: number) => {
        searchItems({
            name: ctx.searchWord,
            page: page,
        },
            ctx.setItemLoading,
            ctx.setItemsResponse
        )
    }, [searchItems, ctx.setItemLoading, ctx.setItemsResponse, ctx.currentPage, ctx.setSearchWord])

    const goNext = useCallback(() => {
        const nextPage = Math.min(ctx.currentPage + 1, ctx.itemsResponse.total)
        ctx.setCurrentPage(nextPage)
        search(nextPage)
    }, [ctx.setCurrentPage, ctx.currentPage, ctx.itemsResponse.total])

    const goPrev = useCallback(() => {
        const prevPage = Math.max(0, ctx.currentPage - 1)
        ctx.setCurrentPage(prevPage)
        search(prevPage)
    }, [ctx.setCurrentPage, ctx.currentPage])

    const isNextDisabled = useMemo(() => {
        return ctx.currentPage === ctx.itemsResponse.total || ctx.isItemLoading
    }, [ctx.currentPage, ctx.itemsResponse.total, ctx.isItemLoading])

    const isPrepDisabled = useMemo(() => {
        return ctx.currentPage === 0 || ctx.isItemLoading
    }, [ctx.currentPage, ctx.isItemLoading])


    return <>
        {itemsRenderer()}
        <div>
            {ctx.currentPage}
            <button onClick={goPrev} disabled={isPrepDisabled}>
                prev
            </button>
            <button onClick={goNext} disabled={isNextDisabled}>
                next
            </button>
        </div>
    </>
}