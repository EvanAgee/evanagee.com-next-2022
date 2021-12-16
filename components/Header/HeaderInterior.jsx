import React, { useState, useContext, useEffect, useRef } from "react";
import { css } from "@emotion/css";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import settings from "@/settings";
import useBreakpoints from "@/hooks/useBreakpoints";
import { HeaderContext } from "@/context/HeaderContext";
import { ThemeContext } from "@/context/ThemeContext";
import CurrentLocation from "@/components/CurrentLocation";

export default function HeaderInterior() {
  const { metaData, ogData, currentPage } = useContext(HeaderContext);
  
  return (<>
    <header className="relative h-44 lg:h-48 flex-col flex lg:flex-row items-center justify-center text-white select-none uppercase tracking-widest">
      <motion.h1
        initial={{
          x: -40,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="m-0 border-4 border-white px-5 py-3"
      >
        {currentPage?.title}
      </motion.h1>
      <motion.strong
        initial={{
          x: 40,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="font-display text-primary-500 mt-2 lg:ml-5 lg:mt-0"
      >
        <Link href="/">EvanAgee.com</Link>
      </motion.strong>
    </header>
  </>)
}