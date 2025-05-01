'use client';

import dayjs from 'dayjs';
import { Facebook, Instagram, Twitter, Wheat } from 'lucide-react';
import Link from 'next/link';
import { useState, type FC } from 'react';

import LoginDialog from '@components/LoginDialog';

const Footer: FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <footer className='border-t border-gray-200 bg-white py-12'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            <div>
              <div className='mb-4 flex items-center gap-2'>
                <Wheat className='h-6 w-6 text-[#8B4513]' />
                <span className='text-xl font-bold text-[#8B4513]'>Hearth & Grain</span>
              </div>
              <p className='mb-4 text-gray-600'>
                Handcrafted bread made with traditional methods and the finest ingredients.
              </p>
              <div className='flex gap-4'>
                <Link
                  href='#'
                  aria-label='Instagram'
                  className='text-[#8B4513] hover:text-[#A0522D]'
                >
                  <Instagram className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  aria-label='Facebook'
                  className='text-[#8B4513] hover:text-[#A0522D]'
                >
                  <Facebook className='h-5 w-5' />
                </Link>
                <Link href='#' aria-label='Twitter' className='text-[#8B4513] hover:text-[#A0522D]'>
                  <Twitter className='h-5 w-5' />
                </Link>
              </div>
            </div>
            <div>
              <h3 className='mb-4 font-semibold text-[#8B4513]'>Quick Links</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href='#products' className='text-gray-600 hover:text-[#8B4513]'>
                    Our Breads
                  </Link>
                </li>
                <li>
                  <Link href='#about' className='text-gray-600 hover:text-[#8B4513]'>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href='#testimonials' className='text-gray-600 hover:text-[#8B4513]'>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href='#contact' className='text-gray-600 hover:text-[#8B4513]'>
                    Visit Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-semibold text-[#8B4513]'>Our Breads</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Sourdough
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Baguettes
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Whole Wheat
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Rye Bread
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-600 hover:text-[#8B4513]'>
                    Specialty Loaves
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-semibold text-[#8B4513]'>Contact</h3>
              <address className='space-y-2 text-gray-600 not-italic'>
                <p>123 Bakery Street</p>
                <p>Breadtown, BT 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: hello@hearthandgrain.com</p>
              </address>
            </div>
          </div>
          <div
            className='mt-8 flex justify-center border-t border-gray-200 pt-8 text-sm text-gray-600'
            onClick={() => setCount(prev => prev + 1)}
          >
            <p className='w-fit'>&copy; {dayjs().year()} Hearth & Grain. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {count > 2 && <LoginDialog onClose={() => setCount(0)} />}
    </>
  );
};

export default Footer;
