'use client';

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
    services: [
      { label: 'Business Search', href: '/search' },
      { label: 'Managed Updates', href: '#' },
      { label: 'Record Verification', href: '#' },
    ],
  };

  return (
    <footer className="border-t" style={{ backgroundColor: '#F0FDF4', borderColor: '#a7f3d0' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="rounded-xl p-2 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, #065F46, #047857)' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Building2 className="h-6 w-6 text-white" strokeWidth={2.5} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight" style={{ color: '#064E3B' }}>
                  CA Business
                </span>
                <span className="text-xs leading-tight" style={{ color: '#047857' }}>
                  Records
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#047857' }}>
              Your trusted source for California business entity records. Search, verify, and manage your business information with ease.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#047857' }}>
              <Mail className="h-4 w-4" />
              <span>support@cabusinessrecords.gov</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: '#064E3B' }}>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline inline-block hover:translate-x-1"
                    style={{ color: '#047857' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: '#064E3B' }}>
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline inline-block hover:translate-x-1"
                    style={{ color: '#047857' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: '#064E3B' }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm" style={{ color: '#047857' }}>
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>1500 11th Street, Sacramento, CA 95814</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: '#047857' }}>
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(916) 657-5448</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: '#047857' }}>
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@cabusinessrecords.gov</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: '#a7f3d0' }}>
          <p className="text-sm text-center sm:text-left" style={{ color: '#047857' }}>
            © {currentYear} California Business Records. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: '#047857' }}>
            <Link href="#" className="hover:underline transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:underline transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:underline transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

