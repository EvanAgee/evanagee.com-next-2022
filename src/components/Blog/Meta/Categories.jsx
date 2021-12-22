import React from "react";
import TagList from "@/components/TagList";

function Categories({ categories }) {
  return (
    <>
      {categories && (
        <TagList
          data-test-id="blog-post-categories"
          label="Categories"
          className="justify-center"
          items={categories.map((c) => ({
            name: c.name,
            link: `/blog/categories/${c.term_id}%7C${c.name}`,
          }))}
        />
      )}
    </>
  );
}

export default React.memo(Categories);
