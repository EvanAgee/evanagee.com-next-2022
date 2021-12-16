import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Filter from "@/components/Blog/Filters/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";

function Filters({ filters, onChange, results, className }) {
  const { breakpoint } = useBreakpoints();
  const [filtersVisible, setFiltersVisible] = React.useState(breakpoint.isLgUp);
  const updateFilters = function (payload) {
    const newFilters = { ...filters };
    newFilters[payload.type] =
      payload.field.length > 0 ? payload.field : { value: null };
    onChange(newFilters);
  };

  return (
    <div
      className={classNames(
        "bg-gradient-to-t from-primary-50 dark:from-primary-900 to-white dark:to-gray-900 p-4 flex w-full items-center text-sm whitespace-nowrap overflow-x-auto overflow-y-visible dark:text-gray-300",
        className,
        css`
          min-height: 70px;
        `
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
          "overflow-hidden flex items-center transition-all duration-300",
          css`
            max-width: ${filtersVisible ? "1000px" : 0};
          `
        )}
      >
          <div className="flex items-center mr-6">
            <strong className="inline-block font-display uppercase mr-4 text-xs">
              Albums
            </strong>
            <div style={{ minWidth: "250px" }}>
              <Filter
                filters={filters}
                isMulti={true}
                querySlug="photo_album"
                filterKey="photo_album"
                onChange={updateFilters}
              />
            </div>
          </div>

          <div className="flex items-center mr-6">
            <strong className="inline-block font-display uppercase mr-4 text-xs">
              Tags
            </strong>
            <div style={{ minWidth: "250px" }}>
              <Filter
                isMulti={true}
                filters={filters}
                querySlug="photo_tags"
                filterKey="photo_tags"
                onChange={updateFilters}
              />
            </div>
          </div>
        </div>

      <div className="ml-auto flex items-center">
        {results > 0 && (
          <div
            className={classNames({
              "mr-6": breakpoint.isLgUp || filtersVisible,
            })}
          >
            <strong className="text-black dark:text-white">{results}</strong> Photos Found
          </div>
        )}

        {(breakpoint.isLgUp || filtersVisible) && (
          <div className="flex items-center font-display">
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
    </div>
  );
}

export default React.memo(Filters);
