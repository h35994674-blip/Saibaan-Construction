'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Our Suppliers', href: '/about/suppliers' },
      { label: 'Client Feedbacks', href: '/about/testimonials' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: siteConfig.services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    })),
  },
  { label: 'Properties', href: '/properties' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobile(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const toggleMobileSubmenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedMobile(expandedMobile === label ? null : label);
  };

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="Saibaan Construction" width={128} height={128} quality={100} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className={styles.chevron} />}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className={styles.dropdown}>
                    <ul className={styles.dropdownList}>
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className={`${styles.dropdownItem} ${isActive(child.href) ? styles.activeDropdown : ''}`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <Link href="/get-quotation" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
          Get Quotation
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ''} flex-1`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button 
                        onClick={(e) => toggleMobileSubmenu(link.label, e)}
                        className={`p-3 text-[var(--text-secondary)] transition-transform ${expandedMobile === link.label ? 'rotate-180 text-[var(--gold)]' : ''}`}
                      >
                        <ChevronDown size={18} />
                      </button>
                    )}
                  </div>
                  {link.children && (
                    <div className={`overflow-hidden transition-all duration-300 ${expandedMobile === link.label ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                      <ul className={styles.mobileSubList}>
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} className={styles.mobileSubLink}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
              <li className="pt-4 mt-2 border-t border-[var(--gold-border)]">
                <Link href="/get-quotation" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Quotation
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
