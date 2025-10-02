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

/** Simplified motion wrappers */
const FadeIn = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
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
  <section id={id} className={`w-full py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

/** Subtle Feature Card */
const FeatureCard = ({
  title,
  children,
  icon: Icon = CheckCircle2,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200">
    <div className="mb-3 flex items-center gap-3">
      <div className="rounded-lg bg-blue-50 p-2">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
    </div>
    <p className="text-sm leading-relaxed text-gray-600">{children}</p>
  </div>
);

/** Clean Plan Card */
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
  return (
    <div
      className={`relative flex flex-col rounded-xl border ${
        featured
          ? "border-blue-300 bg-white shadow-sm"
          : "border-gray-200 bg-white"
      } p-6 transition-all hover:shadow-md`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          {upfront}{" "}
          <span className="text-sm font-medium text-gray-500">upfront</span>
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">{price}</span> / month
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-gray-600 flex-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500 flex-shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          featured
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};

/** Animated counter */
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
    <span className="text-3xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/10 text-gray-900">
      {/* Clean Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-blue-100 bg-white/90 backdrop-blur-sm"
            : "border-b border-blue-100/50 bg-white/80"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-2 text-xl font-semibold text-blue-700"
            >
              <Globe className="h-6 w-6 text-blue-600" />
              ByteLane
            </a>

            <nav className="hidden gap-8 text-sm md:flex">
              {["Services", "Approach", "Solutions", "Results", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors md:inline-flex"
            >
              Start Project
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg bg-blue-50 p-2 text-blue-600 md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
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
              className="border-t border-blue-100 bg-white/95 backdrop-blur-sm md:hidden"
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
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-medium text-gray-600 hover:text-blue-600"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Start Project
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <Section className="pt-28">
        <Container>
          <div className="text-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm text-blue-700">
                <Rocket className="h-4 w-4" />
                Trusted by 50+ Ghanaian Businesses
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Digital Growth{" "}
                <span className="text-blue-600">Made Simple</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Professional websites, e-commerce, and digital tools that drive
                real business growth.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  View Solutions
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-base font-medium text-gray-600 hover:text-blue-600"
                >
                  <Play className="h-4 w-4" />
                  Book Consultation
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-white">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Digital Services
              </h2>
              <p className="mt-4 text-gray-600">
                Everything your business needs to thrive online
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
          </div>
        </Container>
      </Section>

      {/* Approach Section */}
      <Section id="approach" className="bg-blue-50/20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Our Approach
                </h2>
                <p className="mt-4 text-gray-600">
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
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-100 p-3">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-blue-100 bg-white p-6">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white">
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
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Solutions Section */}
      <Section id="solutions" className="bg-white">
        <Container>
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Solutions
              </h2>
              <p className="mt-4 text-gray-600">
                Choose the package that fits your business stage and goals
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
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
          </div>

          <FadeIn delay={0.6} className="mt-8 text-center">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-gray-600">
                Need a custom enterprise solution?{" "}
                <a href="#contact" className="font-medium text-blue-600">
                  Contact our team
                </a>{" "}
                for tailored pricing.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Results Section */}
      <Section id="results" className="bg-blue-600 text-white">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Results</h2>
              <p className="mt-4 text-blue-100">
                Driving measurable growth for Ghanaian businesses
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-6 text-center sm:grid-cols-3">
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
              <div
                key={index}
                className="rounded-xl bg-blue-700/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-lg bg-blue-600 p-3">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-2 text-sm text-blue-100">{item.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <Container>
          <FadeIn className="rounded-xl border border-blue-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Start Your Digital Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Ready to transform your business? Let's discuss your goals and
              build a solution that drives growth.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:hello@bytelane.africa?subject=Digital Transformation Consultation"
                className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
              >
                📧 Schedule Consultation
              </a>

              <a
                href="https://wa.me/233000000000"
                className="inline-flex items-center gap-3 rounded-lg bg-blue-50 px-6 py-3 text-base font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                💬 WhatsApp Chat
              </a>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-gray-600">
                <strong>Free Discovery Call:</strong> No obligation, just expert
                advice for your business.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white py-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                <Globe className="h-6 w-6 text-blue-600" />
                ByteLane
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Empowering Ghanaian businesses with digital excellence
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#services" className="hover:text-blue-600">
                Services
              </a>
              <a href="#solutions" className="hover:text-blue-600">
                Solutions
              </a>
              <a href="#contact" className="hover:text-blue-600">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
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
