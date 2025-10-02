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

/** Testimonial Component */
const Testimonial = ({
  quote,
  name,
  role,
  company,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6">
    <div className="mb-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="mb-4 text-gray-600">"{quote}"</p>
    <div>
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-sm text-gray-500">
        {role}, {company}
      </div>
    </div>
  </div>
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
                  className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors md:inline-flex"
            >
              Get Started
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
                    "Solutions",
                    "About",
                    "Testimonials",
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
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Image */}
      <Section className="pt-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
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
                <p className="mt-4 text-lg text-gray-600">
                  Professional websites, e-commerce, and digital tools that
                  drive real business growth. No technical expertise required.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#solutions"
                    className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    View Solutions
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80&facepad=2`}
                          alt="Happy customer"
                          className="h-8 w-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">
                        50+ Businesses
                      </div>
                      <div className="text-gray-500">Transformed</div>
                    </div>
                  </div>
                </div>
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
                Our Services
              </h2>
              <p className="mt-4 text-gray-600">
                Comprehensive digital solutions to grow your business
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
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

      {/* Solutions Section */}
      <Section id="solutions" className="bg-blue-50/20">
        <Container>
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Pricing Plans
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

      {/* About Section */}
      <Section id="about" className="bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Our team"
                className="rounded-2xl shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  About ByteLane
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  We're a Ghana-based digital agency passionate about helping
                  local businesses thrive in the digital age. Our team combines
                  technical expertise with deep understanding of the Ghanaian
                  market.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Ghana-Based
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Local insight, faster response
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Proven Results
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        30% avg. revenue growth
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Expert Team
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        5+ years experience
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Fast Delivery
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        14 days average
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Results Section */}
      <Section id="results" className="bg-blue-600 text-white">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Impact</h2>
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
            ].map((item) => (
              <div
                key={item.label}
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

      {/* Testimonials Section */}
      <Section id="testimonials" className="bg-white">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-gray-600">
                Don't just take our word for it
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="ByteLane transformed our online presence in just 2 weeks. Our bookings increased by 40% immediately after launch."
              name="Ama Boakye"
              role="Owner"
              company="BrightCare Services"
            />
            <Testimonial
              quote="The monthly pricing model made it affordable for our small business. The support team is always responsive and helpful."
              name="Kofi Mensah"
              role="Manager"
              company="SwiftFix Repairs"
            />
            <Testimonial
              quote="E-commerce integration with mobile money changed everything for our retail business. Sales grew by 60% in the first month."
              name="Adwoa Nyarko"
              role="CEO"
              company="PureFoods Ghana"
            />
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-gray-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Get In Touch
                </h2>
                <p className="mt-4 text-gray-600">
                  Ready to transform your business? Let's discuss your goals and
                  build a solution that drives growth.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a
                        href="mailto:hello@bytelane.africa"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        hello@bytelane.africa
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a
                        href="tel:+233000000000"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        +233 000 000 000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Location
                      </div>
                      <div className="text-gray-600">Accra, Ghana</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Send us a message
                </h3>
                <form className="mt-6 space-y-4">
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
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                <Globe className="h-6 w-6 text-blue-600" />
                ByteLane
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Empowering Ghanaian businesses with digital excellence since
                2023.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Services</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#services" className="hover:text-blue-600">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600">
                    E-Commerce
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600">
                    Business Automation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#about" className="hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-blue-600">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Connect</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Facebook
                  </a>
                </li>
              </ul>
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
