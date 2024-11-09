"use client";
import React, { useRef ,useState,useEffect} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Navbar } from "@/app/components/navbar";
import Link from "next/link";  


const page = () => {
    // const [token, setToken] = useState<string | null>(null);
    // const [user, setUser] = useState<any>(null);
  
    // useEffect(() => {
    //   if (typeof window !== "undefined") {
    //     const tokenFromStorage = localStorage.getItem("auth_token");
    //     const userFromStorage = localStorage.getItem("user");
  
    //     if (tokenFromStorage && userFromStorage) {
    //       const decodedToken = jwtDecode(tokenFromStorage);
    //       setToken(tokenFromStorage);
    //       setUser(decodedToken);
    //       console.log(decodedToken);
          
    //     }
    //   }
    // }, []);
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <div className="pt-[80px]">
        {/* <AuroraHero/> */}
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Hi Aspiring Professionals👋"
          heading="Meet your alumini"
        >
          <HighLPAContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Diverse Domains"
          heading="Explore Various Subject Areas"
        >
          <DomainContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Find Your Match"
          heading="People to Connect and Chat With"
        >
          <ChatContent />
        </TextParallaxContent>
        {/* <div className="pt-[80px]"> */}
        {/* Token Display */}
        {/* @ts-ignore */}
        {/* <h1>Welcome, {user?.userId || 'Guest'}</h1>
      {token ? <p>Your token is: {token}</p> : <p>Please log in.</p>} */}
        {/* Your other components here */}
        {/* <h1>Page Content</h1> */}
      {/* </div> */}
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
    {/* <CompanyScroll /> */}
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Here are the top performers who have achieved high LPA. Connect with them to learn their journey.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Discover the strategies and habits of these high LPA achievers. These individuals have demonstrated exceptional skill in their respective fields and are an inspiration to others.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Learn more about their path to success and how you can follow in their footsteps.
      </p>
      <Link href="/admin/User/TalkWithAluminee">
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          Talk with Alumni <FiArrowUpRight className="inline" />
        </button>
      </Link>
    </div>
  </div>
  </div>
);

const DomainContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Explore various domains of subjects and discover your passion.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Whether you're interested in technology, business, or creative arts, there's a domain for everyone. Find courses, resources, and mentors in your area of interest.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Explore the various fields and start building your expertise today.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Explore Domains <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

const ChatContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Find people to chat with and collaborate on projects.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Connect with like-minded individuals who share similar interests, skills, and goals. Whether you're looking for collaboration opportunities or just a friendly conversation, this is the place.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Start a conversation and expand your network today.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Start Chatting <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

export default page;
