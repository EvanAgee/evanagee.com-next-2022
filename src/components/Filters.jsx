import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Filter from "@/components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";

function Filters({ filters, onChange, results, className }) {
  const { breakpoint, mediaQueries } = useBreakpoints();
  const [filtersVisible, setFiltersVisible] = React.useState();

  React.useEffect(() => {
    setFiltersVisible(true);
  }, [breakpoint]);

  const setFilterValue = (newFilters, payload) => {
    return (newFilters[payload.type] = {
      ...newFilters[payload.type],
      value: payload?.field?.value
        ? payload.field.value
        : Array.isArray(payload?.field)
        ? payload?.field[0]?.value
        : null,
    });
  };

  const updateFilters = function (payload) {
    const newFilters = { ...filters };

    if (Array.isArray(payload)) {
      payload.map((p) => setFilterValue(newFilters, p));
    } else {
      setFilterValue(newFilters, payload);
    }

    onChange(newFilters);
  };

  return (
    <div
      className={classNames(
        "bg-gradient-to-t from-secondary-50 dark:from-secondary-900 to-white dark:to-gray-900 p-4 flex flex-col xl:flex-row w-full items-start xl:items-center text-sm whitespace-nowrap overflow-x-auto overflow-y-visible scroll-smooth dark:text-gray-300 min-h-[70px]",
        className
      )}
    >
      <button
        className="mr-2 text-xl"
        onClick={() => setFiltersVisible(!filtersVisible)}
      >
        <FontAwesomeIcon icon={["fas", "filter"]} />
      </button>
      <div
        className={classNames(
          "overflow-hidden flex flex-col xl:flex-row items-center transition-all duration-300 flex-grow max-h-0 xl:max-w-0",{
            "max-h-[200px] xl:max-w-[2000px]": filtersVisible,
          }
        )}
      >
        {Object.keys(filters)
          .filter((f) =>
            [
              "categories",
              "tags",
              "search",
              "photo_tags",
              "photo_album",
              "year",
            ].includes(f)
          )
          .map((filter, index) => {
            return (
              <div key={index} className="flex items-center mb-2 xl:mb-0 mr-6">
                <strong className="inline-block text-xs font-display uppercase mr-4 [min-width:80px] xl:[min-width:0]">
                  {filter.replace("_", " ")}
                </strong>
                <div className="[min-width:250px] xl:[min-width:150px]">
                  {filter === "search" ? (
                    <input
                      type="search"
                      className="form-input py-1 border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-inherit w-full dark:bg-black dark:border-gray-700"
                      onChange={(e) =>
                        updateFilters({
                          type: "search",
                          field: [
                            {
                              value: e.target.value,
                            },
                          ],
                        })
                      }
                    />
                  ) : (
                    <Filter
                      filters={filters}
                      isMulti={filters[filter]?.isMulti ? true : false}
                      querySlug={
                        filters[filter]?.querySlug
                          ? filters[filter]?.querySlug
                          : filter
                      }
                      filterKey={filter}
                      showCounts={
                        filters[filter]?.showCounts === false ? false : true
                      }
                      onChange={updateFilters}
                      setFunction={
                        typeof filters[filter]?.setFunction === "function"
                          ? filters[filter]?.setFunction
                          : null
                      }
                      displayFunction={
                        typeof filters[filter]?.displayFunction === "function"
                          ? filters[filter]?.displayFunction
                          : null
                      }
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <div className="xl:ml-auto mt-2 xl:mt-0 flex items-center justify-center lg:justify-start">
        {results > 0 && (
          <div
            className={classNames({
              "mr-6": breakpoint.isLgUp || filtersVisible,
            })}
          >
            <strong className="text-black dark:text-white">{results}</strong>{" "}
            <span className="capitalize">
              {filters?.post_type?.value
                ? `${filters?.post_type?.value}s`
                : "Posts"}{" "}
              Found
            </span>
          </div>
        )}

        {(breakpoint.isLgUp || filtersVisible) && (
          <div className="flex items-center">
            <div className="flex items-center mb-0 cursor-pointer bg-black bg-opacity-10 leading-none rounded-md px-2 py-1 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <div
                className={classNames("", {
                  hidden: filters.order.value === "asc",
                })}
                onClick={() =>
                  onChange({
                    ...filters,
                    order: { value: "asc" },
                    orderby: { value: "date" },
                  })
                }
              >
                Newest First <FontAwesomeIcon icon={["fal", "angle-down"]} />
              </div>
              <div
                className={classNames("", {
                  hidden: filters.order.value === "desc",
                })}
                onClick={() =>
                  onChange({
                    ...filters,
                    order: { value: "desc" },
                    orderby: { value: "date" },
                  })
                }
              >
                Oldest First <FontAwesomeIcon icon={["fal", "angle-up"]} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="filter-dropdowns"></div>
    </div>
  );
}

export default React.memo(Filters);
