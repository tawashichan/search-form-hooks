import React, { useCallback, useContext } from "react";
import { SearchItemPageContext } from "./Page";

export const Items: React.FC = () => {

    const ctx = useContext(SearchItemPageContext)

    const renderer = useCallback(() => {
        switch (true) {
            case ctx.isItemLoading:
                return <div>loading...</div>
            case ctx.items.length === 0:
                return <div>no items</div>
            default:
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