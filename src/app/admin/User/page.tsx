"use client";
import React, { useRef ,useState,useEffect} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Navbar } from "@/app/components/navbar";
import Link from "next/link";  
import { ClipPaths } from "@/app/components/ClipPath";
import HoriComponent from "@/app/components/HorizontalComponents";


const page = () => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Navbar />
      <div className="pt-[80px]">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2671&auto=format&fit=crop"
          subheading="Hi, Aspiring Learners👋"
          heading="Meet your alumini's"
        >
          <HighLPAContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          subheading="Diverse Domains"
          heading="Explore Various Subject Areas"
        >
          <DomainContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          subheading="Expand your knowledge"
          heading="Meet and Learn from Alumni"
        >
          <ChatContent />
        </TextParallaxContent>
      </div>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: any) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: any) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - 80px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: any) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-5xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-6xl">{heading}</p>
    </motion.div>
  );
};

const HighLPAContent = () => (
    <div>
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <motion.h2
          className="col-span-1 text-3xl font-bold md:col-span-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Here are the top performers who have achieved high LPA. Connect with them to learn their journey.
        </motion.h2>
        <motion.div
          className="col-span-1 md:col-span-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="mb-4 text-xl text-neutral-600 dark:text-gray-200 md:text-2xl">
            Discover the strategies and habits of these high LPA achievers. These individuals have demonstrated exceptional skill in their respective fields and are an inspiration to others.
          </p>
          <p className="mb-8 text-xl text-neutral-600 dark:text-gray-200 md:text-2xl">
            Learn more about their path to success and how you can follow in their footsteps.
          </p>
          <Link href="/admin/User/TalkWithAluminee">
  <button className="group w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors md:w-fit">
    Talk with Alumni 
    <FiArrowUpRight className="inline ml-2 transition-transform group-hover:rotate-45" />
  </button>
</Link>
        </motion.div>
      </div>
    </div>
  );

const DomainContent = () => (
<div className="relative text-center py-12">
  <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-6 md:text-5xl">
    Top Domains Trending
  </h1>
  <div>
    {/* <ClipPaths/> */}
    <HoriComponent/>
  </div>
</div>

);

const ChatContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Find people to chat with and collaborate on projects.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 dark:text-gray-200 md:text-2xl">
        Connect with like-minded individuals who share similar interests, skills, and goals. Whether you're looking for collaboration opportunities or just a friendly conversation, this is the place.
      </p>
      <p className="mb-8 text-xl text-neutral-600 dark:text-gray-200 md:text-2xl">
        Start a conversation and expand your network today.
      </p>
      <Link href="/admin/User/TalkWithAluminee">
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors md:w-fit">
        Start Chatting <FiArrowUpRight className="inline" />
      </button>
      </Link>
    </div>
  </div>
);

export default page;
