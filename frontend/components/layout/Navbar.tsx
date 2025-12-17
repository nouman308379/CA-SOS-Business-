'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Menu, X, Home, Search as SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: SearchIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        borderColor: '#a7f3d0',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
      }}
      initial={false}
      animate={{
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="rounded-lg p-1.5 shadow-md"
              style={{ background: 'linear-gradient(to bottom right, #065F46, #047857)' }}
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2.5} />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#064E3B' }}>
                CA Business
              </span>
              <span className="text-[10px] sm:text-xs leading-tight transition-colors group-hover:opacity-80" style={{ color: '#047857' }}>
                Records
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: active ? '#ecfdf5' : 'transparent',
                    }}
                    whileHover={{
                      backgroundColor: active ? '#d1fae5' : '#f0fdf4',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="relative flex items-center gap-2">
                    <Icon
                      className="h-4 w-4 transition-colors"
                      style={{
                        color: active ? '#065F46' : '#047857',
                      }}
                    />
                    <span
                      className="transition-colors"
                      style={{
                        color: active ? '#065F46' : '#047857',
                        fontWeight: active ? '600' : '500',
                      }}
                    >
                      {link.label}
                    </span>
                  </div>
                  {active && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: '#065F46' }}
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg transition-colors relative"
            style={{
              color: '#064E3B',
              backgroundColor: isMobileMenuOpen ? '#ecfdf5' : 'transparent',
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-3 border-t overflow-hidden"
              style={{ borderColor: '#a7f3d0' }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-3"
                        style={{
                          color: active ? '#065F46' : '#047857',
                          backgroundColor: active ? '#ecfdf5' : 'transparent',
                          fontWeight: active ? '600' : '500',
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                        {active && (
                          <motion.div
                            className="ml-auto w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#065F46' }}
                            layoutId="mobile-indicator"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
