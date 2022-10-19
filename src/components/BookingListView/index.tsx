import React, { useState, useEffect } from "react";
import SearchService from "./SearchService";
import TableListView from "./TableListView";

function ListView() {
  const [listServiceFilter, setListServiceFilter] = useState<string[]>([]);
  return (
    <div className="text-left  w-screen px-5 space-y-6">
      <SearchService setListServiceFilter={setListServiceFilter} listServiceFilter ={listServiceFilter} />
      <TableListView listServiceFilter={listServiceFilter} />
    </div>
  );
}

export default ListView;
