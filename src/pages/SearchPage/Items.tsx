import React, { useCallback, useContext } from "react";
import { SearchItemPageContext } from "./Page";

export const Items: React.FC = () => {

    const ctx = useContext(SearchItemPageContext)

    const renderer = useCallback(() => {
        if (ctx.isItemLoading) {
            return <div>loading...</div>
        } else {
            const items = ctx.items.map((item, i, all) =>
                <div key={item.name}>
                    {item.name}
                </div>
            )
            return <div>
                {items}
            </div>
        }
    }, [ctx.isItemLoading, ctx.items])

    return renderer()
}