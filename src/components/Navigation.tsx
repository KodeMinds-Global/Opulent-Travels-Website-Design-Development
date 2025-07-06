import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAssetPath } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", isRouterLink: true },
    { href: "/about-us", label: "About", isRouterLink: true },
    { href: "/sri-lanka", label: "Sri Lanka", isRouterLink: true },
    { href: "/maldives", label: "Maldives", isRouterLink: true },
    { href: "#Rent Car", label: "Rent Car", isRouterLink: false },
    { href: "/packages", label: "Packages", isRouterLink: true },
    { href: "#testimonials", label: "Reviews", isRouterLink: false },
    { href: "#contact", label: "Contact", isRouterLink: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || (isMobile && isMobileMenuOpen)
          ? "bg-white/95 dark:bg-luxury-charcoal/95 backdrop-blur-md shadow-lg"
          : isMobile 
            ? "bg-black/50 backdrop-blur-sm"
            : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-white/30 dark:bg-white/50 backdrop-blur-sm rounded-md p-1 flex items-center justify-center">
              <Link to="/">
                <img
                  src={getAssetPath("/assets/images/logo.png")}
                  alt="Opulent Travels"
                  className="h-7 sm:h-10 md:h-12 w-auto" // Reduced size on smallest screens
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isRouterLink ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-montserrat font-medium transition-all duration-300 relative group ${
                    isScrolled
                      ? "text-luxury-charcoal dark:text-white hover:text-luxury-teal"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-teal transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-montserrat font-medium transition-all duration-300 relative group ${
                    isScrolled
                      ? "text-luxury-charcoal dark:text-white hover:text-luxury-teal"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-teal transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="gold-button bg-luxury-gold text-black">
              Get a quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 sm:p-2 ${
                isScrolled
                  ? "text-luxury-charcoal dark:text-white"
                  : "text-white"
              }`}
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 sm:w-6 h-5 sm:h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen 
              ? "max-h-[500px] opacity-100 bg-white/95 dark:bg-luxury-charcoal/95 backdrop-blur-md rounded-md mt-2" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-3 space-y-1 sm:space-y-2">
            {navLinks.map((link) => (
              link.isRouterLink ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-montserrat text-sm sm:text-base md:text-lg font-medium py-2 px-2 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors duration-300 ${
                    isScrolled || isMobileMenuOpen
                      ? "text-luxury-charcoal dark:text-white hover:text-luxury-teal"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-montserrat text-sm sm:text-base md:text-lg font-medium py-2 px-2 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors duration-300 ${
                    isScrolled || isMobileMenuOpen
                      ? "text-luxury-charcoal dark:text-white hover:text-luxury-teal"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="pt-2">
              <Button className="gold-button w-full text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-3 mt-2">
                Get a quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
