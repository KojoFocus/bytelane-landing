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
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  HeadphonesIcon,
} from "lucide-react";

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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideIn = ({
  children,
  direction = "left",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  className?: string;
  delay?: number;
}) => {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`w-full py-16 md:py-24 lg:py-28 ${className}`}>
    {children}
  </section>
);

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/** Enhanced Feature Card */
const FeatureCard = ({
  title,
  children,
  icon: Icon = CheckCircle2,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="group rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 transition-all hover:border-blue-300 hover:shadow-xl"
  >
    <div className="mb-4 flex items-center gap-4">
      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 group-hover:scale-110 transition-transform">
        <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
      </div>
      <h4 className="text-lg lg:text-xl font-semibold text-gray-900">
        {title}
      </h4>
    </div>
    <p className="text-sm lg:text-base leading-relaxed text-gray-600">
      {children}
    </p>
  </motion.div>
);

/** Enhanced Plan Card */
const PlanCard = ({
  title,
  upfront,
  price,
  items,
  featured = false,
  ctaHref = "#contact",
  ctaLabel = "Get Started",
  delay = 0,
}: {
  title: string;
  upfront: string;
  price: string;
  items: string[];
  featured?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-2xl border-2 ${
        featured
          ? "border-blue-500 bg-white shadow-2xl lg:scale-105"
          : "border-gray-200 bg-white"
      } p-6 lg:p-8 transition-all hover:shadow-xl`}
    >
      {featured && (
        <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 lg:px-6 py-1 lg:py-2 text-xs lg:text-sm font-semibold text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h3>

      <div className="mt-4 lg:mt-6 space-y-2">
        <p className="text-2xl lg:text-3xl font-bold text-gray-900">
          {upfront}
        </p>
        <p className="text-base lg:text-lg text-gray-600">
          then <span className="font-semibold text-gray-900">{price}</span>
          /month
        </p>
      </div>

      <ul className="mt-6 lg:mt-8 space-y-3 lg:space-y-4 text-sm lg:text-base text-gray-600 flex-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 lg:mt-1 h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className={`mt-6 lg:mt-8 inline-flex items-center justify-center gap-2 lg:gap-3 rounded-xl px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base font-semibold transition-all ${
          featured
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
};

/** Enhanced Animated counter */
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
    <span className="text-2xl lg:text-4xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/** Enhanced Testimonial Component */
const Testimonial = ({
  quote,
  name,
  role,
  company,
  delay = 0,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm transition-all hover:shadow-lg"
  >
    <div className="mb-4 lg:mb-6 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 fill-current" />
      ))}
    </div>

    <p className="mb-4 lg:mb-6 text-sm lg:text-lg leading-relaxed text-gray-600">
      "{quote}"
    </p>

    <div className="flex items-center gap-3 lg:gap-4">
      <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs lg:text-base font-semibold">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <div className="text-sm lg:text-base font-semibold text-gray-900">
          {name}
        </div>
        <div className="text-xs lg:text-sm text-gray-500">
          {role}, {company}
        </div>
      </div>
    </div>
  </motion.div>
);

/** Floating Elements */
const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    className="hidden lg:block"
  >
    {children}
  </motion.div>
);

/** Mobile Stats Grid */
const MobileStats = ({ children }: { children: React.ReactNode }) => (
  <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">{children}</div>
);

export default function ByteLaneLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
          <span className="text-xl lg:text-2xl font-bold text-blue-600">
            ByteLane
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 text-gray-900 overflow-hidden">
      {/* Enhanced Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-blue-100/50 bg-white/95 backdrop-blur-lg shadow-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 lg:gap-3 text-xl lg:text-2xl font-bold text-blue-700"
            >
              <Globe className="h-5 w-5 lg:h-7 lg:w-7 text-blue-600" />
              ByteLane
            </motion.a>

            <nav className="hidden items-center gap-6 lg:gap-8 text-sm lg:text-base md:flex">
              {[
                "Services",
                "Solutions",
                "About",
                "Testimonials",
                "Contact",
              ].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-semibold text-gray-700 hover:text-blue-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 lg:px-6 py-2 lg:py-3 text-sm font-semibold text-white hover:shadow-lg transition-all hover:scale-105 md:inline-flex"
            >
              Get Started
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </motion.a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl bg-white p-2 lg:p-3 text-blue-600 shadow-sm hover:shadow-md transition-all md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 lg:h-5 lg:w-5" />
              ) : (
                <Menu className="h-4 w-4 lg:h-5 lg:w-5" />
              )}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-blue-100 bg-white/95 backdrop-blur-lg md:hidden"
            >
              <Container>
                <div className="flex flex-col gap-4 lg:gap-6 py-6 lg:py-8">
                  {[
                    "Services",
                    "Solutions",
                    "About",
                    "Testimonials",
                    "Contact",
                  ].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Enhanced Hero Section */}
      <Section className="pt-20 lg:pt-32 pb-12 lg:pb-20">
        <Container>
          <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
            <div className="space-y-6 lg:space-y-8">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 lg:gap-3 rounded-full bg-white/80 px-3 lg:px-4 py-1.5 lg:py-2.5 text-xs lg:text-sm font-semibold text-blue-700 shadow-lg backdrop-blur-sm">
                  <Rocket className="h-3 w-3 lg:h-4 lg:w-4" />
                  Trusted by 50+ Ghanaian Businesses
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900">
                  Digital Growth{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Made Simple
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-base lg:text-xl leading-relaxed text-gray-600 max-w-2xl">
                  Professional websites, e-commerce, and digital tools that
                  drive real business growth. No technical expertise required.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <a
                    href="#solutions"
                    className="inline-flex items-center justify-center gap-2 lg:gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-lg font-semibold text-white hover:shadow-xl transition-all hover:scale-105"
                  >
                    View Solutions
                    <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 lg:gap-3 rounded-xl border border-gray-300 bg-white px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 lg:h-5 lg:w-5" />
                    Watch Demo
                  </a>
                </div>
              </FadeIn>

              {/* Stats */}
              <div className="space-y-4 lg:space-y-8">
                <FadeIn delay={0.5}>
                  <div className="flex items-center gap-4 lg:gap-8 pt-4 lg:pt-8">
                    <div className="flex -space-x-2 lg:-space-x-3">
                      {[...Array(4)].map((_, i) => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80&facepad=2`}
                          alt="Happy customer"
                          className="h-8 w-8 lg:h-12 lg:w-12 rounded-full border-2 lg:border-4 border-white shadow-lg"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">
                        50+ Businesses Transformed
                      </div>
                      <div className="text-gray-500">
                        Join our happy clients
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Mobile Stats Grid */}
                <MobileStats>
                  <div className="rounded-xl bg-white p-4 shadow-lg text-center">
                    <div className="text-lg font-bold text-gray-900">+40%</div>
                    <div className="text-xs text-gray-600">Avg. Growth</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-lg text-center">
                    <div className="text-lg font-bold text-gray-900">
                      14 Days
                    </div>
                    <div className="text-xs text-gray-600">Avg. Launch</div>
                  </div>
                </MobileStats>
              </div>
            </div>

            <SlideIn direction="right" delay={0.3}>
              <div className="relative mt-8 lg:mt-0">
                <div className="hidden lg:block absolute -top-6 -right-6 -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration"
                  className="relative rounded-2xl shadow-2xl w-full"
                />

                {/* Floating elements - Desktop only */}
                <FloatingElement delay={0}>
                  <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 lg:p-6 shadow-2xl">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="rounded-xl bg-green-100 p-2 lg:p-3">
                        <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-bold text-gray-900">
                          +40%
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          Avg. Growth
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement delay={0.5}>
                  <div className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 lg:p-6 shadow-2xl">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="rounded-xl bg-blue-100 p-2 lg:p-3">
                        <Calendar className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-bold text-gray-900">
                          14 Days
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          Avg. Launch
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </SlideIn>
          </div>
        </Container>
      </Section>

      {/* Enhanced Services Section */}
      <Section id="services" className="bg-white">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Our Services
              </h2>
              <p className="mt-3 lg:mt-4 text-base lg:text-xl text-gray-600">
                Comprehensive digital solutions to grow your business
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 lg:mt-16 grid gap-6 lg:gap-8 md:grid-cols-3">
            <FeatureCard title="Professional Websites" icon={Globe} delay={0.1}>
              Custom-designed websites that convert visitors into customers.
              Mobile-optimized and built for performance with 99.9% uptime.
            </FeatureCard>

            <FeatureCard
              title="E-Commerce Solutions"
              icon={ShoppingCart}
              delay={0.2}
            >
              Complete online stores with secure payments, inventory management,
              and seamless customer experience. Integrated with mobile money.
            </FeatureCard>

            <FeatureCard title="Business Automation" icon={Zap} delay={0.3}>
              Streamline operations with automated booking, payments, and
              customer communication systems. Save 10+ hours weekly.
            </FeatureCard>
          </div>

          <FadeIn delay={0.4} className="mt-8 lg:mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 lg:gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-lg font-semibold text-white hover:shadow-xl transition-all hover:scale-105"
            >
              View All Services
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </a>
          </FadeIn>
        </Container>
      </Section>

      {/* Enhanced Solutions Section */}
      <Section
        id="solutions"
        className="bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Pricing Plans
              </h2>
              <p className="mt-3 lg:mt-4 text-base lg:text-xl text-gray-600">
                Choose the package that fits your business stage and goals
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 lg:mt-16 grid gap-6 lg:gap-8 lg:grid-cols-3">
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
                "1 Month Free Support",
              ]}
              delay={0.1}
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
                "Advanced Analytics Dashboard",
                "Priority Support (12hr response)",
                "3 Months Free Support",
              ]}
              delay={0.2}
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
                "6 Months Free Support",
              ]}
              delay={0.3}
            />
          </div>

          <FadeIn delay={0.4} className="mt-8 lg:mt-12 text-center">
            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
                <HeadphonesIcon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                <div className="text-center lg:text-left">
                  <p className="text-base lg:text-lg font-semibold text-gray-900">
                    Need a custom enterprise solution?
                  </p>
                  <p className="text-sm lg:text-base text-gray-600">
                    <a
                      href="#contact"
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Contact our team
                    </a>{" "}
                    for tailored pricing and dedicated support.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Enhanced About Section */}
      <Section id="about" className="bg-white">
        <Container>
          <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
            <SlideIn direction="left">
              <div className="relative">
                <div className="hidden lg:block absolute -top-6 -right-6 -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl transform -rotate-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Our team"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </SlideIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                    About ByteLane
                  </h2>
                  <p className="mt-3 lg:mt-4 text-base lg:text-xl leading-relaxed text-gray-600">
                    We're a Ghana-based digital agency passionate about helping
                    local businesses thrive in the digital age. Our team
                    combines technical expertise with deep understanding of the
                    Ghanaian market.
                  </p>
                </div>

                <div className="grid gap-4 lg:gap-6 sm:grid-cols-2">
                  {[
                    {
                      icon: Shield,
                      title: "Ghana-Based",
                      description: "Local insight, faster response times",
                    },
                    {
                      icon: TrendingUp,
                      title: "Proven Results",
                      description: "30% average revenue growth for clients",
                    },
                    {
                      icon: Users,
                      title: "Expert Team",
                      description: "5+ years industry experience",
                    },
                    {
                      icon: Zap,
                      title: "Fast Delivery",
                      description: "14 days average project completion",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 lg:gap-4 rounded-xl bg-gray-50 p-4 lg:p-6 hover:bg-gray-100 transition-colors"
                    >
                      <div className="rounded-lg bg-blue-100 p-2 lg:p-3">
                        <item.icon className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm lg:text-base font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs lg:text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Enhanced Results Section */}
      <Section
        id="results"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">
                Our Impact
              </h2>
              <p className="mt-3 lg:mt-4 text-base lg:text-xl text-blue-100">
                Driving measurable growth for Ghanaian businesses
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 lg:mt-16 grid gap-6 lg:gap-8 text-center sm:grid-cols-3">
            {[
              {
                value: 50,
                suffix: "+",
                label: "Businesses Transformed",
                icon: Users,
                delay: 0.1,
              },
              {
                value: 30,
                suffix: "%",
                label: "Average Revenue Growth",
                icon: TrendingUp,
                delay: 0.2,
              },
              {
                value: 14,
                suffix: " days",
                label: "Average Time to Launch",
                icon: Rocket,
                delay: 0.3,
              },
            ].map((item) => (
              <FadeIn key={item.label} delay={item.delay}>
                <div className="rounded-2xl bg-white/10 p-6 lg:p-8 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <div className="mb-4 lg:mb-6 flex justify-center">
                    <div className="rounded-xl bg-white/20 p-3 lg:p-4">
                      <item.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-4xl font-bold">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>
                  <div className="mt-2 lg:mt-4 text-sm lg:text-lg text-blue-100">
                    {item.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Enhanced Testimonials Section */}
      <Section id="testimonials" className="bg-white">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                What Our Clients Say
              </h2>
              <p className="mt-3 lg:mt-4 text-base lg:text-xl text-gray-600">
                Don't just take our word for it
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 lg:mt-16 grid gap-6 lg:gap-8 md:grid-cols-3">
            <Testimonial
              quote="ByteLane transformed our online presence in just 2 weeks. Our bookings increased by 40% immediately after launch. The team understood exactly what we needed."
              name="Ama Boakye"
              role="Owner"
              company="BrightCare Services"
              delay={0.1}
            />
            <Testimonial
              quote="The monthly pricing model made it affordable for our small business. The support team is always responsive and helpful. Our revenue grew by 35% in 3 months."
              name="Kofi Mensah"
              role="Manager"
              company="SwiftFix Repairs"
              delay={0.2}
            />
            <Testimonial
              quote="E-commerce integration with mobile money changed everything for our retail business. Sales grew by 60% in the first month. Highly recommended for Ghanaian businesses."
              name="Adwoa Nyarko"
              role="CEO"
              company="PureFoods Ghana"
              delay={0.3}
            />
          </div>
        </Container>
      </Section>

      {/* Enhanced Contact Section */}
      <Section
        id="contact"
        className="bg-gradient-to-br from-gray-50 to-blue-50/30"
      >
        <Container>
          <div className="grid gap-8 lg:gap-16 lg:grid-cols-2">
            <FadeIn>
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                    Get In Touch
                  </h2>
                  <p className="mt-3 lg:mt-4 text-base lg:text-xl leading-relaxed text-gray-600">
                    Ready to transform your business? Let's discuss your goals
                    and build a solution that drives real growth for your
                    Ghanaian business.
                  </p>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      content: "hello@bytelane.africa",
                      href: "mailto:hello@bytelane.africa",
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      content: "+233 000 000 000",
                      href: "tel:+233000000000",
                    },
                    {
                      icon: MapPin,
                      title: "Location",
                      content: "Accra, Ghana",
                      href: "#",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 lg:gap-4 rounded-2xl bg-white p-4 lg:p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="rounded-xl bg-blue-100 p-2 lg:p-3">
                        <item.icon className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-semibold text-gray-900">
                          {item.title}
                        </div>
                        <a
                          href={item.href}
                          className="text-blue-600 hover:text-blue-700 transition-colors text-sm lg:text-base"
                        >
                          {item.content}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-xl">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                  Send us a message
                </h3>
                <form className="mt-6 lg:mt-8 space-y-4 lg:space-y-6">
                  <div className="grid gap-4 lg:gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 lg:mt-2 block w-full rounded-xl border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 lg:mt-2 block w-full rounded-xl border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="mt-1 lg:mt-2 block w-full rounded-xl border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-1 lg:mt-2 block w-full rounded-xl border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 lg:py-4 text-sm lg:text-lg font-semibold text-white hover:shadow-xl transition-all hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 lg:gap-3 text-xl lg:text-2xl font-bold text-blue-700">
                <Globe className="h-5 w-5 lg:h-7 lg:w-7 text-blue-600" />
                ByteLane
              </div>
              <p className="text-sm lg:text-lg leading-relaxed text-gray-600">
                Empowering Ghanaian businesses with digital excellence since
                2023.
              </p>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold text-gray-900">
                Services
              </h4>
              <ul className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-600">
                {[
                  "Web Development",
                  "E-Commerce",
                  "Business Automation",
                  "Digital Marketing",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold text-gray-900">
                Company
              </h4>
              <ul className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-600">
                {["About Us", "Testimonials", "Contact", "Careers"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(" ", "")}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold text-gray-900">
                Connect
              </h4>
              <ul className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-600">
                {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(
                  (platform) => (
                    <li key={platform}>
                      <a
                        href="#"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {platform}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 lg:mt-16 border-t border-gray-200 pt-6 lg:pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ByteLane Digital Solutions. All
              rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
