"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
                                               children,
                                               loginFormRef,
                                               className,
                                             }: {
  children: React.ReactNode;
  loginFormRef: React.RefObject<HTMLDivElement>;
  className?: string;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [beams, setBeams] = useState<
      {
        id: number;
        initialX: number;
        translateX: number;
        initialY: string;
        translateY: string;
        duration: number;
        delay: number;
        repeatDelay: number;
        rotate: number;
        className?: string;
      }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined" && parentRef.current) {
      const containerWidth = parentRef.current.offsetWidth;
      const containerHeight = parentRef.current.offsetHeight;
      const generateRandomBeams = (numberOfBeams: number) => {
        const beamsArray = [];
        const baseRotation = 0; // Base rotation angle in degrees
        const rotationVariation = 0;

        for (let i = 0; i < numberOfBeams; i++) {
          const initialX = Math.random()*containerWidth;

          const initialY = -100;
          const translateY = containerHeight + 400;

          const deltaY = translateY - initialY;
          const rotation =
              baseRotation +
              (Math.random() * rotationVariation * 2 - rotationVariation);
          const angleInRadians = (rotation * Math.PI) / 180;

          const deltaX = deltaY * Math.tan(angleInRadians);
          const translateX = initialX + deltaX;

          const duration = Math.random() * 6 + 6;
          const delay = Math.random() * 6;
          const repeatDelay = Math.random() * 5;
          const beamHeight = ["h-11", "h-12", "h-14", "h-16", "h-20", "h-24", "h-28", "h-32"][Math.floor(Math.random()*8)]
          const beam = {
            id: i,
            initialX,
            translateX,
            initialY: `${initialY}px`,
            translateY: `${translateY}px`,
            duration,
            delay,
            repeatDelay,
            rotate: -rotation,
            className: `h-${beamHeight}`,
          };
          beamsArray.push(beam);
        }
        return beamsArray;
      };

      const randomBeams = generateRandomBeams(15);
      setBeams(randomBeams);
    }
  }, []);

  return (
      <div
          ref={parentRef}
          className={cn(
              "bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden h-screen",
              className
          )}
      >
        {beams.map((beam) => (
            <CollisionMechanism
                key={`beam-${beam.id}-${beam.initialX}`}
                beamOptions={beam}
                containerRef={loginFormRef}
                containerRef2={containerRef}
                parentRef={parentRef}
            />
        ))}
        {children}
        <div
            ref={containerRef}
            className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
            style={{
              boxShadow:
                  "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
            }}
        ></div>
      </div>
  );
};

const CollisionMechanism = React.forwardRef<
    HTMLDivElement,
    {
      containerRef: React.RefObject<HTMLDivElement>;
      parentRef: React.RefObject<HTMLDivElement>;
      containerRef2: React.RefObject<HTMLDivElement>;
      beamOptions?: {
        initialX?: number;
        translateX?: number;
        initialY?: number;
        translateY?: number;
        rotate?: number;
        className?: string;
        duration?: number;
        delay?: number;
        repeatDelay?: number;
      };
    }
>(({ parentRef, containerRef, containerRef2, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && parentRef.current && !cycleCollisionDetected && containerRef2.current) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        const containerRect = containerRef2.current.getBoundingClientRect();

        // Collision with bottom of the page
        if (beamRect.bottom >= containerRect.top) {
          // Collision detected with bottom
          const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY =
              beamRect.bottom - parentRect.top; // Bottom edge
          console.log("Collided!", beamRect.top-beamRect.bottom)
          console.log(beamRef.current.className)
          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
          return;
        }


        // Collision with login form
        if (containerRef?.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          if (
              beamRect.bottom >= containerRect.top-10 &&
              beamRect.top < containerRect.top &&
              beamRect.left < containerRect.right &&
              beamRect.right > containerRect.left
          ) {
            // Collision detected with login form
            const relativeX =
                beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY =
                beamRect.top - parentRect.top + beamRect.height;

            setCollision({
              detected: true,
              coordinates: {
                x: relativeX,
                y: relativeY,
              },
            });
            setCycleCollisionDetected(true);
            return;
          }
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);
      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
      <>
        {/* Render the beam only if there's no collision detected */}
        {!collision.detected && (
            <motion.div
                key={beamKey}
                ref={beamRef}
                animate="animate"
                initial={{
                  translateY: beamOptions.initialY || "-200px",
                  translateX: beamOptions.initialX || "0px",
                  rotate: beamOptions.rotate || 0,
                }}
                variants={{
                  animate: {
                    translateY: beamOptions.translateY || "1800px",
                    translateX: beamOptions.translateX || "0px",
                    rotate: beamOptions.rotate || 0,
                  },
                }}
                transition={{
                  duration: beamOptions.duration || 8,
                  // Remove repeat and repeatType to stop animation
                  ease: "linear",
                  delay: beamOptions.delay || 0,
                  // repeatDelay: beamOptions.repeatDelay || 0,
                }}
                className={cn(
                    "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
                    beamOptions.className
                )}
            />
        )}
        <AnimatePresence>
          {collision.detected && collision.coordinates && (
              <Explosion
                  key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                  style={{
                    left: `${collision.coordinates.x}px`,
                    top: `${collision.coordinates.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
              />
          )}
        </AnimatePresence>
      </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";
const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
