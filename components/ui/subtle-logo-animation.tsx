"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = [
    "/logos/openai.png",
    "/logos/anthropic.png",
    "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemma-social-share.width-1300.jpg", // Google
    "https://i0.wp.com/siliconvalleyjournals.com/wp-content/uploads/2023/02/meta_PNG12.png", // Meta
    "https://i.pinimg.com/736x/ec/58/f4/ec58f46664a9e1173243799d25a9d48d.jpg", // Microsoft
    // Add others if desired, keep the count reasonable (e.g., 5-8)
];

// Staggered animation for individual logos
const logoVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: (i: number) => ({ // Pass index for stagger calculation
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2, // Stagger delay
      duration: 0.5,
      ease: "easeOut"
    }
  }),
};

// Function to generate random positions and animation properties
const generateAnimationProps = () => {
    const duration = Math.random() * 20 + 25; // Random duration between 25s and 45s
    const delay = Math.random() * 5; // Random start delay up to 5s
    // Ensure movement stays generally within view, adjust range as needed
    const xRange = [-15, 15]; // Horizontal movement range (vw)
    const yRange = [-10, 10]; // Vertical movement range (vh)

    return {
        animate: {
            x: [`${Math.random() * (xRange[1]-xRange[0]) + xRange[0]}vw`, `${Math.random() * (xRange[1]-xRange[0]) + xRange[0]}vw`],
            y: [`${Math.random() * (yRange[1]-yRange[0]) + yRange[0]}vh`, `${Math.random() * (yRange[1]-yRange[0]) + yRange[0]}vh`],
            rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10], // Slight random rotation
            scale: [1, 1.05, 1], // Subtle pulse
        },
        transition: {
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "mirror" as const, // Use "mirror" for smooth back-and-forth
            ease: "easeInOut"
        }
    };
};


export function SubtleLogoAnimation() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background via-background/80 to-background opacity-90"></div> {/* Optional subtle gradient overlay */}
            {LOGOS.map((logoSrc, i) => {
                const { animate, transition } = generateAnimationProps();
                // Random initial positions - adjust positioning logic as needed
                const initialX = `${Math.random() * 80 + 10}vw`;
                const initialY = `${Math.random() * 80 + 10}vh`;

                return (
                    <motion.div
                        key={logoSrc + i}
                        className="absolute"
                        style={{
                            top: initialY,
                            left: initialX,
                            width: 'clamp(40px, 6vw, 70px)', // Responsive size
                            height: 'auto',
                         }}
                        custom={i} // Pass index to variants
                        variants={logoVariants}
                        initial="initial"
                        animate="animate" // Initial fade-in and scale-up
                    >
                        <motion.div
                            animate={animate} // Continuous drift animation
                            transition={transition}
                         >
                            <Image
                                src={logoSrc}
                                alt="" // Decorative, hide from screen readers
                                width={70} // Provide base width/height
                                height={70}
                                className="object-contain aspect-square opacity-5 dark:opacity-[0.03] pointer-events-none" // Very low opacity
                                priority={i < 3} // Prioritize loading first few logos
                            />
                         </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}