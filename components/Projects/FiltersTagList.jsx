import React from "react";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import axios from "axios";
import settings from "@/settings";
import TagList from "@/components/TagList";

function Filters({ filters, onChange, results, className }) {
  const { isLoading, error, data } = useQuery("projectTags", async () => {
    const { data } = await axios.get(`${settings.apiBase}/projects/tags`);
    return data;
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="my-6 mx-auto max-w-screen-md">
      <TagList
        showActive={true}
        resetPath="/portfolio"
        className="justify-center"
        items={data.map((t, i) => ({
          name: (
            <>
              {t.name}&nbsp;<span className="font-normal">({t.count})</span>
            </>
          ),
          link: `/portfolio/tags/${t.term_id}|${t.name}`,
        }))}
      />
    </div>
  );
}

export default React.memo(Filters);
