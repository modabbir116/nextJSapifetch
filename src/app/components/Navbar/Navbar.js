"use client";
import { useState } from 'react';
import Container from '../Layouts/Container.js';
import Link from 'next/link.js';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
      <Container>
        <div className='flex justify-between items-center py-5'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link href='/' className='group'>
              <h1 className='text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300'>
                LOGO
              </h1>
              <div className='h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 rounded-full'></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center'>
            <ul className='flex gap-x-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-5 py-2 text-[17px] font-medium rounded-lg transition-all duration-300 group ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                        isActive(link.href)
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className='ml-8'>
              <Link href='/contact'>
                <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-2 hover:bg-gray-800 transition-colors duration-300'
            aria-label='Toggle mobile menu'
          >
            <div className='w-6 h-5 flex flex-col justify-between'>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className='flex flex-col space-y-2 pt-4 border-t border-gray-700'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-[17px] font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className='pt-2'>
              <Link href='/contact' onClick={() => setIsMobileMenuOpen(false)}>
                <button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg'>
                  Get Started
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;