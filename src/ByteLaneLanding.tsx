import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Play,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Rocket,
  ShoppingCart,
} from "lucide-react";

// ... (keep all the animation components and utilities from previous version)
/** Enhanced motion wrappers */
const FadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerChildren = ({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`w-full py-20 md:py-28 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

/** Enhanced Feature Card with hover effects */
const FeatureCard = ({
  title,
  children,
  icon: Icon = CheckCircle2,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    className="group rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-300"
  >
    <div className="mb-3 flex items-center gap-3">
      <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <h4 className="font-semibold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
        {title}
      </h4>
    </div>
    <p className="text-sm leading-relaxed text-blue-700 group-hover:text-blue-800 transition-colors duration-300">
      {children}
    </p>
  </motion.div>
);

/** Enhanced Plan Card with interactive pricing */
const PlanCard = ({
  title,
  upfront,
  price,
  items,
  featured = false,
  ctaHref = "#contact",
  ctaLabel = "Get Started",
}: {
  title: string;
  upfront: string;
  price: string;
  items: string[];
  featured?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex flex-col rounded-3xl border-2 ${
        featured
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-lg"
          : "border-blue-200 bg-white shadow-sm"
      } p-8 transition-all duration-300 hover:shadow-xl`}
    >
      {featured && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg"
        >
          Most Popular
        </motion.span>
      )}

      <motion.div
        animate={{
          scale: isHovered && featured ? 1.05 : 1,
          rotate: isHovered && featured ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
        <div className="mt-6 space-y-2">
          <p className="text-3xl font-bold text-blue-900">
            {upfront}{" "}
            <span className="text-sm font-medium text-blue-500">upfront</span>
          </p>
          <p className="text-blue-700">
            <span className="font-semibold text-lg">{price}</span> / month
          </p>
        </div>
      </motion.div>

      <ul className="mt-8 space-y-4 text-sm text-blue-700 flex-1">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600 flex-shrink-0" />
            <span>{it}</span>
          </motion.li>
        ))}
      </ul>

      <motion.a
        href={ctaHref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-8 inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-3 font-medium shadow-lg transition-all duration-300 ${
          featured
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
            : "bg-blue-100 text-blue-900 hover:bg-blue-200 hover:text-blue-950"
        }`}
      >
        {ctaLabel}
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

/** Animated counter for impact section */
const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.floor(stepValue * currentStep), value));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-blue-900">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/** Floating elements for background */
const FloatingShape = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      y: [0, -15, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute rounded-full bg-blue-200/30 blur-xl"
    style={{
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
    }}
  />
);

export default function ByteLaneLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-900 selection:bg-blue-200/60 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingShape key={i} delay={i * 0.8} />
        ))}
      </div>

      {/* Professional Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-blue-200/80 bg-white/95 backdrop-blur-lg shadow-sm"
            : "border-b border-blue-200/60 bg-white/90 backdrop-blur"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
            >
              <Globe className="h-6 w-6 text-blue-600" />
              ByteLane
            </motion.a>

            {/* Professional Navigation */}
            <nav className="hidden gap-8 text-sm md:flex">
              {["Services", "Approach", "Solutions", "Results", "Contact"].map(
                (item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ y: -2 }}
                    className="font-medium text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    {item}
                  </motion.a>
                )
              )}
            </nav>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-600 md:inline-flex"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg bg-blue-100 p-2 text-blue-600 md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-blue-200 bg-white/95 backdrop-blur-lg md:hidden"
            >
              <Container>
                <div className="flex flex-col gap-4 py-6">
                  {[
                    "Services",
                    "Approach",
                    "Solutions",
                    "Results",
                    "Contact",
                  ].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      className="font-medium text-blue-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      {item}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Start Your Project
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <Section className="pt-32">
        <Container>
          <div className="text-center">
            <FadeIn delay={0.1} duration={0.8}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-sm text-blue-600 backdrop-blur-sm"
              >
                <Rocket className="h-4 w-4" />
                Trusted by 50+ Ghanaian Businesses
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.8}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Digital Growth{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.8}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-700 md:text-xl">
                Professional websites, e-commerce, and digital tools that drive
                real business growth. No technical expertise required.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} duration={0.8}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="#solutions"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-600"
                >
                  View Solutions
                  <ArrowRight className="h-5 w-5" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  className="group inline-flex items-center gap-2 text-base font-medium text-blue-700 underline-offset-4 hover:underline"
                >
                  <Play className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Book Consultation
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-white/50">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Comprehensive{" "}
                <span className="text-blue-600">Digital Services</span>
              </h2>
              <p className="mt-4 text-lg text-blue-700">
                Everything your business needs to thrive online
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-3">
            <FeatureCard title="Professional Websites" icon={Globe}>
              Custom-designed websites that convert visitors into customers.
              Mobile-optimized and built for performance.
            </FeatureCard>

            <FeatureCard title="E-Commerce Solutions" icon={ShoppingCart}>
              Complete online stores with secure payments, inventory management,
              and seamless customer experience.
            </FeatureCard>

            <FeatureCard title="Business Automation" icon={Zap}>
              Streamline operations with automated booking, payments, and
              customer communication systems.
            </FeatureCard>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Approach Section */}
      <Section id="approach">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Our <span className="text-blue-600">Approach</span>
                </h2>
                <p className="mt-4 text-lg leading-8 text-blue-700">
                  We partner with you to create digital solutions that drive
                  measurable business results.
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      icon: Users,
                      title: "Business-First Strategy",
                      description:
                        "We start by understanding your goals, customers, and market position.",
                    },
                    {
                      icon: Shield,
                      title: "Managed Service",
                      description:
                        "We handle all technical aspects while you focus on your business.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Growth-Oriented",
                      description:
                        "Every solution is designed to scale as your business grows.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className="rounded-lg bg-blue-100 p-3">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-blue-700">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-lg backdrop-blur-sm"
              >
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                    <Play className="h-3 w-3" />
                    Our Process
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Discovery Call",
                      desc: "Understand your business goals",
                    },
                    {
                      step: "2",
                      title: "Strategy & Planning",
                      desc: "Custom solution design",
                    },
                    {
                      step: "3",
                      title: "Development",
                      desc: "Build and test your solution",
                    },
                    {
                      step: "4",
                      title: "Launch & Support",
                      desc: "Go live with ongoing support",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-blue-600">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Solutions Section (Packages) */}
      <Section id="solutions" className="bg-white/50">
        <Container>
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Tailored <span className="text-blue-600">Solutions</span>
              </h2>
              <p className="mt-4 text-lg text-blue-700">
                Choose the package that fits your business stage and goals
              </p>
            </div>
          </FadeIn>

          <StaggerChildren
            staggerDelay={0.2}
            className="grid gap-8 lg:grid-cols-3"
          >
            <PlanCard
              title="Essential Digital"
              upfront="1,050 GHS"
              price="150 GHS"
              items={[
                "Professional Business Website",
                "Secure Hosting & SSL Certificate",
                "Google Business Profile Setup",
                "Basic Analytics Dashboard",
                "Mobile-Optimized Design",
                "Email & Chat Support",
              ]}
              ctaHref="#contact"
              ctaLabel="Start Essential"
            />

            <PlanCard
              title="Growth Suite"
              upfront="1,450 GHS"
              price="250 GHS"
              featured
              items={[
                "Everything in Essential",
                "Booking & Payment Integration",
                "Social Media Management",
                "Monthly Performance Reports",
                "Advanced Analytics",
                "Priority Support (12hr response)",
              ]}
              ctaHref="#contact"
              ctaLabel="Choose Growth"
            />

            <PlanCard
              title="Business Pro"
              upfront="2,500 GHS"
              price="400 GHS"
              items={[
                "Everything in Growth Suite",
                "Full E-Commerce Store",
                "Advanced Branding Package",
                "ROI & Conversion Analytics",
                "Dedicated Account Manager",
                "24/7 Priority Support",
              ]}
              ctaHref="#contact"
              ctaLabel="Go Pro"
            />
          </StaggerChildren>

          <FadeIn delay={0.6} className="mt-12 text-center">
            <div className="rounded-2xl bg-blue-50/50 p-6">
              <p className="text-sm text-blue-700">
                💼 Need a custom enterprise solution?{" "}
                <a
                  href="#contact"
                  className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  Contact our team
                </a>{" "}
                for tailored pricing.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Results Section */}
      <Section
        id="results"
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white"
      >
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Proven <span className="text-blue-100">Results</span>
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Driving measurable growth for Ghanaian businesses
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="mt-12 grid gap-8 text-center sm:grid-cols-3">
            {[
              {
                value: 1000,
                suffix: "+",
                label: "Businesses Transformed",
                icon: Users,
              },
              {
                value: 30,
                suffix: "%",
                label: "Average Revenue Growth",
                icon: TrendingUp,
              },
              {
                value: 14,
                suffix: " days",
                label: "Average Time to Launch",
                icon: Rocket,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-2xl bg-white/20 p-3">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-2 text-sm text-blue-100">{item.label}</div>
              </motion.div>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <Container>
          <FadeIn className="rounded-3xl bg-gradient-to-br from-white to-blue-50/50 p-12 text-center shadow-2xl">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Start Your{" "}
                <span className="text-blue-600">Digital Journey</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-700">
                Ready to transform your business? Let's discuss your goals and
                build a solution that drives growth.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="mailto:hello@bytelane.africa?subject=Digital Transformation Consultation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-600"
                >
                  📧 Schedule Consultation
                </motion.a>

                <motion.a
                  href="https://wa.me/233000000000"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-700"
                >
                  💬 Quick WhatsApp Chat
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 rounded-2xl bg-blue-100/50 p-4"
              >
                <p className="text-sm text-blue-600">
                  ⭐ <strong>Free Discovery Call:</strong> No obligation, just
                  expert advice for your business.
                </p>
              </motion.div>
            </motion.div>
          </FadeIn>
        </Container>
      </Section>

      {/* Professional Footer */}
      <footer className="border-t border-blue-200/60 bg-white/80 py-12 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                <Globe className="h-6 w-6 text-blue-600" />
                ByteLane
              </div>
              <p className="mt-2 text-sm text-blue-600">
                Empowering Ghanaian businesses with digital excellence
              </p>
            </motion.div>

            <div className="flex items-center gap-6 text-sm text-blue-600">
              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                className="hover:text-blue-900 transition-colors"
              >
                Services
              </motion.a>
              <motion.a
                href="#solutions"
                whileHover={{ y: -2 }}
                className="hover:text-blue-900 transition-colors"
              >
                Solutions
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                className="hover:text-blue-900 transition-colors"
              >
                Contact
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 border-t border-blue-200/40 pt-8 text-center"
          >
            <p className="text-sm text-blue-500">
              © {new Date().getFullYear()} ByteLane Digital Solutions. All
              rights reserved.
            </p>
          </motion.div>
        </Container>
      </footer>
    </div>
  );
}
