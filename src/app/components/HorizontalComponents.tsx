import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HoriComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-800">
      {/* <div className="flex h-20 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div> */}
      <HorizontalScrollCarousel />
      {/* <div className="flex h-20 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div> */}
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white dark:bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }:any) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HoriComponent;

const cards = [
  {
    url: "/Assets/Image1.png",
    title: "AI",
    id: 1,
  },
  {
    url: "/Assets/Image3.jpg",
    title: "Data Science",
    id: 2,
  },
  {
    url: "/Assets/Image5.jpg",
    title: "EC",
    id: 3,
  },
  {
    url: "/Assets/Image6.png",
    title: "Bio",
    id: 4,
  },
  {
    url: "/Assets/Image8.jpg",
    title: "Python",
    id: 5,
  },
  {
    url: "/Assets/Image9.jpg",
    title: "Sql",
    id: 6,
  },
  {
    url: "/Assets/Image15.jpg",
    title: "Network",
    id: 7,
  },
];