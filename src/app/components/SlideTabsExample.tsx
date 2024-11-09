import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const SlideTabsExample = () => {
  return (
    <div>
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit bg-white "
    >
     <Tab setPosition={setPosition}>
        <Link href="/admin/About">
          About
        </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href="/admin/Contact">
          Contact
        </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href="/admin/Report">
          Report
        </Link>
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }:any) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
         // @ts-ignore
         const { width } = ref.current.getBoundingClientRect();
         
         setPosition({
        // @ts-ignore
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-sm uppercase text-black md:px-5 md:py-3 "
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }:any) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-gray-200  md:h-11"
    />
  );
};
