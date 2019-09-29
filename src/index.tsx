import React from "react";
import * as ReactDom from "react-dom";
import { SearchItemPage } from "./pages/SearchPage/Page";

const App: React.FC = () => {
    return <SearchItemPage />
};

ReactDom.render(<App />, document.getElementById("root"));