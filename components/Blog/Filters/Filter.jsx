import React, { useContext } from "react";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import axios from "axios";
import settings from "@/settings";
import Select from "react-select";
import { decode } from "html-entities";
import { ThemeContext } from "@/context/ThemeContext";

function Filter({
  querySlug,
  filters,
  filterKey,
  onChange,
  isMulti,
  options,
  displayFunction,
  setFunction,
  showCounts,
  isClearable,
}) {
  const { pageTheme } = useContext(ThemeContext);
  const fetchTerms = async function ({ pageParam = 0 }) {
    const data = await axios.get(`${settings.apiBase}/${querySlug}`, {
      params: {
        page: pageParam + 1,
        per_page: 100,
        hide_empty: true,
      },
    });
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(["filterData", filterKey], fetchTerms, {
    getNextPageParam: (lastPage, pages) => {
      return parseInt(lastPage.headers["x-wp-totalpages"]) >=
        lastPage.config.params.page + 1
        ? lastPage.config.params.page
        : null;
    },
  });

  React.useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) return fetchNextPage();
  }, [data]);

  const customStyles = React.useMemo(() => {
    return {
      control: (provided, state) => ({
        ...provided,
        borderColor:
          pageTheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
        "&:hover": {
          borderWidth: 1,
        },
        boxShadow: "none",
        backgroundColor:
          pageTheme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,1)",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor:
          state.isSelected || state.isFocused
            ? pageTheme === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.1)"
            : pageTheme === "dark"
            ? "rgba(0,0,0,0.8)"
            : "rgba(255,255,255,0.8)",
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor:
          pageTheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color:
          pageTheme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
      }),
      menuList: (provided) => ({
        ...provided,
        backgroundColor:
          pageTheme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
        color:
          pageTheme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor:
          pageTheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      }),
    };
  }, [pageTheme]);

  const dynamicOptions = React.useMemo(() => {
    return querySlug && data && "pages" in data
      ? data.pages
          .map((p) => {
            return p.data.map((d) => {
              return displayFunction
                ? displayFunction(d)
                : {
                    value: "id" in d ? d.id : d.term_id,
                    label: `${decode(d.name)} ${
                      showCounts ? ` (${d.count})` : ""
                    }`,
                  };
            });
          })
          .flat()
      : options
      ? options
      : [];
  }, [data, querySlug, filterKey, displayFunction]);

  const defaultValue = React.useMemo(() => {
    if (dynamicOptions.length < 1) return [];
    return "value" in filters[filterKey] && filters[filterKey].value !== null
      ? dynamicOptions.filter(
          (d) => parseInt(d.value) === parseInt(filters[filterKey].value)
        )
      : [];
  }, [filters, filterKey, dynamicOptions]);

  if (querySlug && isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Select
        isMulti={isMulti}
        isClearable={isClearable}
        styles={customStyles}
        value={defaultValue.length > 0 ? defaultValue : undefined}
        onChange={(e) => {
          onChange(
            setFunction ? setFunction(e) : { type: filterKey, field: e }
          );
        }}
        options={dynamicOptions}
        menuPortalTarget={document.querySelector("body")}
      />
    </>
  );
}

Filter.defaultProps = {
  isMulti: false,
  querySlug: false,
  options: false,
  showCounts: true,
  isClearable: true,
};

export default React.memo(Filter);
