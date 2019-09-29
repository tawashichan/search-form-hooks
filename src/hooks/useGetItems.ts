import { useEffect } from "react";
import { UseGetItems } from "../types/item"

export const useGetItemsImpl: UseGetItems = (setLoading, setItems) => {
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setItems([{
                name: "typescript"
            },
            {
                name: "rust"
            },
            {
                name: "haskell"
            }])
        }, 1000)
    }, []);
};
