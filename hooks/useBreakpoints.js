/**
 * Example:
 * import useBreakpoint from './useBreakpoint'
 *
 * const MyComponent = () => {
 *   const { breakpoint, mediaQueries } = useBreakpoint();
 *
 *   {breakpoint.isMdUp && <AnotherComponent />}
 *   {breakpoint.xl && <AnotherComponent />}
 *
 * <div className={css`
 *    display: inline;
 *
 *    ${mediaQueries.lg} {
 *      display: block;
 *    }
 * `} />
 * };
 */
 import { useState, useEffect, useMemo } from "react";
 import throttle from "lodash.throttle";
 
 const breakpoints = {
   xs: { minWidth: 0, rank: 0, label: "xs" },
   sm: { minWidth: 640, rank: 1, label: "sm" },
   md: { minWidth: 768, rank: 2, label: "md" },
   lg: { minWidth: 1024, rank: 3, label: "lg" },
   xl: { minWidth: 1280, rank: 4, label: "xl" },
 };
 
 const getBreakpoint = (width) => {
   if (width < breakpoints.sm.minWidth) {
     return breakpoints.xs;
   } else if (
     width >= breakpoints.sm.minWidth &&
     width < breakpoints.md.minWidth
   ) {
     return breakpoints.sm;
   } else if (
     width >= breakpoints.md.minWidth &&
     width < breakpoints.lg.minWidth
   ) {
     return breakpoints.md;
   } else if (
     width >= breakpoints.lg.minWidth &&
     width < breakpoints.xl.minWidth
   ) {
     return breakpoints.lg;
   } else if (width >= breakpoints.xl.minWidth) {
     return breakpoints.xl;
   }
 };
 
 const useBreakpoint = () => {
   const [brkPnt, setBrkPnt] = useState(() => getBreakpoint(typeof window === "undefined" ? 0 : window.innerWidth));
 
   useEffect(() => {
     const calcInnerWidth = throttle(() => {
       setBrkPnt(getBreakpoint(typeof window === "undefined" ? 0 : window.innerWidth));
     }, 200);
 
     window.addEventListener("resize", calcInnerWidth);
     return () => window.removeEventListener("resize", calcInnerWidth);
   }, []);
 
   const breakpoint = useMemo(() => {
     return {
       breakpoint: brkPnt.label,
       xs: brkPnt.label === "xs",
       sm: brkPnt.label === "sm",
       md: brkPnt.label === "md",
       lg: brkPnt.label === "lg",
       xl: brkPnt.label === "xl",
       isSmUp: brkPnt.rank >= 1,
       isMdUp: brkPnt.rank >= 2,
       isLgUp: brkPnt.rank >= 3,
       isXlUp: brkPnt.rank === 4,
       isSmDown: brkPnt.rank <= 1,
       isMdDown: brkPnt.rank <= 2,
       isLgDown: brkPnt.rank <= 3,
       isXlDown: brkPnt.rank <= 4,
     };
   }, [brkPnt]);
 
   const mediaQueries = useMemo(() => {
     const mq = {
       custom: (minWidth) => `@media (min-width: ${minWidth})`,
     };
     Object.keys(breakpoints).map((b) => {
       mq[b] = `@media (min-width: ${breakpoints[b].minWidth}px)`;
     });
     return mq;
   }, [breakpoints]);
 
   return {
     breakpoint,
     mediaQueries,
   };
 };
 
 export default useBreakpoint;
 