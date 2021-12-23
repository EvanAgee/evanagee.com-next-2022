import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import Filter from "@/components/Blog/Filters/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";
import Select from "react-select";

function Filters({ filters, onChange, results, className }) {
  const { breakpoint } = useBreakpoints();
  const [filtersVisible, setFiltersVisible] = React.useState();

  React.useEffect(() => {
    setFiltersVisible(breakpoint.isLgUp);
  }, [breakpoint]);

  const setFilterValue = (payload) => {
    return payload.field.length > 0
      ? payload.field
      : "value" in payload.field
      ? { value: payload.field.value }
      : { value: null };
  };

  const updateFilters = function (payload) {
    const newFilters = { ...filters };
    if (Array.isArray(payload)) {
      payload.map((p) => (newFilters[p.type] = setFilterValue(p)));
    } else {
      newFilters[payload.type] = setFilterValue(payload);
    }

    onChange(newFilters);
  };

  return (
    <div
      className={classNames(
        "bg-gradient-to-t from-secondary-50 dark:from-gray-700 to-white dark:to-gray-900 p-4 flex w-full items-center text-sm whitespace-nowrap overflow-x-auto overflow-y-visible dark:text-gray-300 border-b",
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
      {filtersVisible && (
        <>
          <div className="flex items-center mr-6">
            <strong className="inline-block font-display uppercase mr-4 text-xs">
              Year
            </strong>
            <div style={{ minWidth: "150px" }}>
              <Filter
                isMulti={false}
                filters={filters}
                isClearable={true}
                querySlug="projects/dates"
                filterKey="year"
                setFunction={(field) => {
                  return [
                    {
                      type: "after",
                      field: field
                        ? {
                            ...field,
                            value: `${field.value - 1}-12-31T00:00:00`,
                          }
                        : { value: null },
                    },
                    {
                      type: "before",
                      field: field
                        ? {
                            ...field,
                            value: `${field.value + 1}-01-01T00:00:00`,
                          }
                        : { value: null },
                    },
                  ];
                }}
                displayFunction={(item) => {
                  return {
                    value: item.year,
                    label: `${item.year} (${item.count})`,
                  };
                }}
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
                querySlug="projects/tags"
                filterKey="tags"
                showCounts={false}
                onChange={updateFilters}
              />
            </div>
          </div>
        </>
      )}

      <div className="ml-auto flex items-center">
        {results > 0 && (
          <div
            className={classNames({
              "mr-6": breakpoint.isLgUp || filtersVisible,
            })}
          >
            <strong>{results}</strong> Projects Found
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
