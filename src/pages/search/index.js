import Meta from "@/components/Meta";
import SearchForm from "@/components/Search";

function Search({ term }) {
  return (
    <div>
      <Meta title={term ? `Search results for "${term}"` : "Search"} />
      <SearchForm term={term} />
    </div>
  );
}

export default Search;
