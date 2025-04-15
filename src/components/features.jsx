import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export function AnimatedVerticalCarousel({ features }) {
  const scrollRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          top: 180,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-[500px] z-20 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-neutral-200 snap-y snap-mandatory flex flex-col items-center space-y-4 p-4 bg-neutral rounded-box max-w-2xl"
    >
      {features.map((feature, idx) => (
        <CardWithEffect key={idx} feature={feature} />
      ))}
    </div>
  );
}

// 🧠 Subcomponent with scroll visibility detection
function CardWithEffect({ feature }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -40% 0px", once: false });

  // 👇 Force re-render of TextGenerateEffect when in view
  const [effectKey, setEffectKey] = useState(0);
  useEffect(() => {
    if (isInView) {
      setEffectKey((prev) => prev + 1);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="snap-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <CardContainer className="inter-var">
        <CardBody className="bg-white dark:bg-black border border-gray-200 dark:border-white/[0.2] w-60vw h-45vh rounded-xl p-6 group/card hover:shadow-xl transition flex flex-col justify-around items-center">
          <CardItem translateZ="50" className="text-3xl font-bold text-neutral-800 dark:text-white">
            {feature.title}
          </CardItem>
          <CardItem translateZ="60" as="p" className="text-neutral-500 max-w-sm mt-2 dark:text-neutral-300">
            <TextGenerateEffect key={effectKey} words={feature.description} />
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
