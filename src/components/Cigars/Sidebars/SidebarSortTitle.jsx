import React from "react";
import SidebarRow from "./SidebarRow";

const cigarsWithLetter = (letter, field) => {
  return letter === "#"
    ? field.toLowerCase().charAt(0).match(/\d+/)
    : field.toLowerCase().charAt(0) === letter;
};

const SidebarSortTitle = ({ filteredCigars, sort }) => {
  return (
    <>
      {"#abcdefghijklmnopqrstuvwxyz"
        .split("")
        .filter((letter) => {
          if (sort === "title") {
            return filteredCigars.some((c) =>
              cigarsWithLetter(letter, c.title.rendered)
            );
          }

          if (sort === "brand") {
            return filteredCigars.some((c) =>
              cigarsWithLetter(letter, c.brand.title)
            );
          }
        })
        .map((letter, i) => (
          <span key={i}>
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-6 py-1 text-sm font-medium text-gray-500">
              <h3 className="uppercase">{letter}</h3>
            </div>
            <ul className="relative z-0 divide-y divide-gray-200 dark:divide-gray-800 m-0">
              {filteredCigars
                .filter((c) => {
                  if (sort === "title") {
                    return cigarsWithLetter(letter, c.title.rendered);
                  }

                  if (sort === "brand") {
                    return cigarsWithLetter(letter, c.brand.title);
                  }
                })
                .sort((a, b) => {
                  if (sort === "title") {
                    if (
                      a.title.rendered.toLowerCase() <
                      b.title.rendered.toLowerCase()
                    ) {
                      return -1;
                    }
                    if (
                      a.title.rendered.toLowerCase() >
                      b.title.rendered.toLowerCase()
                    ) {
                      return 1;
                    }
                  }

                  if (sort === "brand") {
                    if (
                      a.brand.title.toLowerCase() < b.brand.title.toLowerCase()
                    ) {
                      return -1;
                    }
                    if (
                      a.brand.title.toLowerCase() > b.brand.title.toLowerCase()
                    ) {
                      return 1;
                    }
                  }

                  return 0;
                })
                .map((c, i) => (
                  <SidebarRow cigar={c} key={i} />
                ))}
            </ul>
          </span>
        ))}
    </>
  );
};

export default SidebarSortTitle;
