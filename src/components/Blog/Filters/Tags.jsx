import React from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import settings from "@/settings";
import Select from "react-select";
import { decode } from "html-entities";

function Tags() {
  const { isLoading, error, data, isFetching } = useQuery("allTags", () =>
    axios.get(`${settings.apiBase}/tags`, {
      params: {
        per_page: 100,
        hide_empty: "true",
      },
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data && "data" in data && (
        <Select
          isMulti={true}
          options={data.data.map((d) => {
            return {
              value: d.id,
              label: decode(d.name),
            };
          })}
        />
      )}
    </>
  );
}

export default React.memo(Tags);
