import React from "react";
import classNames from "classnames";
import PostGridWrapper from "@/components/Blog/PostGridWrapper";
import useMatchHeight from "@/hooks/useMatchHeight";
import useBreakpoints from "@/hooks/useBreakpoints";

const GridWrapper = function ({
  className,
  children,
  largeFirst,
  wrapItems,
  columns,
  "data-test-id": dataTestId,
}) {
  const { breakpoint } = useBreakpoints();
  const { ref, updateMatchedHeights } = useMatchHeight();

  React.useEffect(() => {
    updateMatchedHeights();
  }, [children]);

  return (
    <div
      data-test-id={dataTestId}
      ref={ref}
      className={classNames(
        "grid border-t border-gray-300 dark:border-gray-300 divide-x divide-gray-300 dark:divide-gray-300",
        {
          "divide-y": children.length > 2 || breakpoint.isMdDown || largeFirst,
          "lg:grid-cols-2": columns === 2,
          "lg:grid-cols-3": columns === 3,
          "lg:grid-cols-4": columns === 4,
        },
        className
      )}
    >
      {children.map((c, i) => {
        return wrapItems ? (
          <PostGridWrapper key={i} counter={i} largeFirst={largeFirst}>
            {c}
          </PostGridWrapper>
        ) : (
          <React.Fragment key={i}>{c}</React.Fragment>
        );
      })}
    </div>
  );
};

GridWrapper.defaultProps = {
  largeFirst: false,
  wrapItems: true,
  columns: 2
};

export default React.memo(GridWrapper);
