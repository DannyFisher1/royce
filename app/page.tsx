"use client";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users,
  Lock,
  DatabaseZap,
  Scale,
  ChevronDown,
  ArrowRight,
  Check,
  AlertTriangle,
  BarChart2,
  Globe,
  Clock,
  Zap,
  Gauge,
  Layers
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const RiskGlobe = dynamic(() => import('@/components/RiskGlobe'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-900/50 rounded-xl" />
});

const LOGOS = [
  "/logos/openai.png",
  "/logos/anthropic.png",
  // "/logos/google.png",
  // "/logos/meta.png",
  // "/logos/mistral.png",
  // "/logos/cohere.png",
];

// 3D Logo Component
const LogoSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useTexture(LOGOS);

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => {
        const angle = (i / LOGOS.length) * Math.PI * 2;
        const x = Math.sin(angle) * 5;
        const z = Math.cos(angle) * 5;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} transparent />
          </mesh>
        );
      })}
    </group>
  );
};

// Animated Background
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <LogoSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

// Safety Score Ticker
const SafetyScoreTicker = () => {
  const scores = [
    { provider: 'GPT-4o', score: 9.2 },
    { provider: 'Claude 3', score: 8.9 },
    { provider: 'Gemini Pro', score: 8.5 },
    { provider: 'Llama 3', score: 8.1 },
    { provider: 'Mistral Large', score: 7.9 },
    { provider: 'Cohere Command', score: 7.6 },
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg">
      <motion.div 
        animate={{ x: ['0%', '-100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex py-4"
      >
        {[...scores, ...scores].map((item, i) => (
          <div key={i} className="flex items-center px-8 whitespace-nowrap">
            <span className="font-medium mr-2">{item.provider}</span>
            <div className="w-12 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full" 
                style={{ width: `${item.score * 10}%` }}
              />
            </div>
            <span className="ml-2 font-bold">{item.score.toFixed(1)}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Compliance Badge Showcase
const BadgeShowcase = () => {
  const badges = [
    { name: 'SOC-2 Type 2', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'ISO 27001', icon: <DatabaseZap className="w-5 h-5" /> },
    { name: 'EU AI Act', icon: <Scale className="w-5 h-5" /> },
    { name: 'NIST CSF', icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="p-4 border rounded-lg flex flex-col items-center bg-white/5 backdrop-blur-sm"
        >
          <div className="text-primary mb-2">{badge.icon}</div>
          <span className="text-sm font-medium">{badge.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Safety Timeline
const SafetyTimeline = () => {
  const events = [
    { year: '2021', event: 'First AI Safety Summit' },
    { year: '2022', event: 'EU AI Act Proposed' },
    { year: '2023', event: 'White House AI Executive Order' },
    { year: '2024', event: 'Global AI Safety Pledge' },
  ];

  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-primary to-purple-600 transform -translate-x-1/2" />
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`relative mb-12 ${i % 2 === 0 ? 'pr-8 text-left' : 'pl-8 text-right'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-primary ${i % 2 === 0 ? '-right-2' : '-left-2'}`} />
          <div className="text-sm font-medium text-primary">{event.year}</div>
          <div className="text-lg font-medium">{event.event}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Feature Cards
const FeatureCards = () => {
  const features = [
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Comprehensive Metrics",
      description: "Detailed scoring across 5 safety pillars with submetric analysis"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Standards",
      description: "Mapped to international AI safety frameworks and regulations"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Historical Tracking",
      description: "Version-by-version safety performance over time"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Risk Detection",
      description: "Automated identification of emerging safety concerns"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Benchmarking",
      description: "Compare providers across key safety dimensions"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Multi-Layer Analysis",
      description: "From model architecture to deployment practices"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="p-6 border rounded-xl bg-white/5 backdrop-blur-sm"
        >
          <div className="text-primary mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatedBackground />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6"
            >
              AI Safety Dashboard
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Transparent metrics for responsible AI development
            </motion.p>
          </motion.div>

          {/* Pillar Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-4xl mb-16"
          >
            <h2 className="text-lg font-semibold uppercase text-muted-foreground tracking-wider mb-6">
              Key Safety Pillars
            </h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { name: "Content", Icon: ShieldCheck, color: "text-blue-500" },
                { name: "Bias", Icon: Users, color: "text-amber-500" },
                { name: "Privacy", Icon: Lock, color: "text-emerald-500" },
                { name: "Security", Icon: DatabaseZap, color: "text-red-500" },
                { name: "Ethics", Icon: Scale, color: "text-purple-500" },
              ].map(({ name, Icon, color }, i) => (
                <motion.div
                  key={name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.7 + i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className={`p-4 rounded-full bg-white/5 backdrop-blur-sm shadow-lg mb-3 ${color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="font-medium">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8"
          >
            <Link href="/providers" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-purple-600"
                >
                  Explore Providers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.a>
            </Link>
          </motion.div>

          {/* Scrolling Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-4 h-8 border-2 border-primary rounded-full">
                <motion.div
                  animate={{ y: [0, 4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="w-1 h-1 bg-primary rounded-full mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive AI Safety Analysis</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our dashboard provides the most complete view of AI safety metrics across leading providers
              </p>
            </motion.div>

            <FeatureCards />
          </div>
        </section>

        {/* Live Metrics Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Safety Metrics</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Continuously updated scores based on the latest evaluations
              </p>
            </motion.div>

            <SafetyScoreTicker />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6">Global Risk Assessment</h3>
                <RiskGlobe 
                  data={[
                    { lat: 37.09, lng: -95.71, value: 0.8 }, // US
                    { lat: 35.68, lng: 139.76, value: 0.6 },  // Japan
                    { lat: 51.51, lng: -0.13, value: 0.7 },   // UK
                    { lat: 52.52, lng: 13.41, value: 0.65 },  // Germany
                    { lat: 39.90, lng: 116.40, value: 0.5 },  // China
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6">Compliance Overview</h3>
                <BadgeShowcase />
                <h3 className="text-xl font-semibold mt-10 mb-6">Safety Milestones</h3>
                <SafetyTimeline />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-purple-600/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore AI Safety?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Dive deep into comprehensive safety evaluations of leading AI providers
              </p>
              <Link href="/providers" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-purple-600"
                  >
                    View Provider Comparisons
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  );
}