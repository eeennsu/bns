import { ChevronRight, Star, MapPin, Clock, Phone, Instagram } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@shadcn-ui/ui/button';

const LandingPage: FC = () => {
  return (
    <main className='flex-1'>
      <section className='bg-[#FFFFF0] py-16 md:py-24'>
        <div className='container grid items-center gap-12 md:grid-cols-2'>
          <div className='space-y-6'>
            <div className='inline-block rounded-full bg-[#F5F5DC] px-3 py-1 text-sm font-medium text-[#8B4513]'>
              Artisanal Bakery
            </div>
            <h1 className='text-4xl leading-tight font-bold text-[#8B4513] md:text-5xl lg:text-6xl'>
              Bread Crafted with Passion & Tradition
            </h1>
            <p className='max-w-md text-lg text-gray-700'>
              Every loaf tells a story of time-honored techniques, premium ingredients, and the art
              of slow fermentation.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button className='bg-[#8B4513] text-[#FFFFF0] hover:bg-[#A0522D]'>
                Explore Our Breads
              </Button>
              <Button variant='outline' className='border-[#8B4513] text-[#8B4513]'>
                Our Baking Process
              </Button>
            </div>
          </div>
          <div className='relative'>
            <div className='absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full bg-[#F5F5DC]'></div>
            <Image
              src='/placeholder.svg?height=600&width=600'
              width={600}
              height={600}
              alt='Artisan sourdough bread'
              className='relative z-10 rounded-2xl shadow-lg'
              priority
            />
            <div className='absolute -right-6 -bottom-6 -z-10 h-32 w-32 rounded-full bg-[#F5F5DC]'></div>
          </div>
        </div>
      </section>

      <section id='products' className='py-20'>
        <div className='container'>
          <div className='mb-12 flex flex-col items-center justify-between md:flex-row'>
            <div>
              <h2 className='text-3xl font-bold text-[#8B4513]'>Our Signature Breads</h2>
              <p className='mt-2 max-w-xl text-gray-600'>
                Handcrafted daily using organic flour and our decades-old sourdough starter.
              </p>
            </div>
            <Button variant='link' className='flex items-center gap-1 text-[#8B4513]'>
              View All <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {featuredBreads.map(bread => (
              <div key={bread.name} className='group'>
                <div className='relative mb-4 overflow-hidden rounded-xl'>
                  <Image
                    src={bread.image || '/placeholder.svg'}
                    width={400}
                    height={300}
                    alt={bread.name}
                    className='aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-[#8B4513]'>
                    ${bread.price.toFixed(2)}
                  </div>
                </div>
                <h3 className='text-xl font-semibold text-[#8B4513]'>{bread.name}</h3>
                <p className='mt-1 text-gray-600'>{bread.description}</p>
                <Button
                  variant='ghost'
                  className='mt-3 p-0 text-[#8B4513] hover:bg-[#F5F5DC] hover:text-[#A0522D]'
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='bg-[#F5F5DC] py-20'>
        <div className='container'>
          <div className='mb-16 text-center'>
            <h2 className='text-3xl font-bold text-[#8B4513]'>Our Artisanal Process</h2>
            <p className='mx-auto mt-2 max-w-2xl text-gray-700'>
              We believe great bread takes time. Our process honors traditional methods that have
              been perfected over generations.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            {breadProcess.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] text-xl font-bold text-white'>
                  {index + 1}
                </div>
                <h3 className='mb-2 text-xl font-semibold text-[#8B4513]'>{step.title}</h3>
                <p className='text-gray-700'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='py-20'>
        <div className='container'>
          <div className='grid items-center gap-12 md:grid-cols-2'>
            <div className='relative'>
              <Image
                src='/placeholder.svg?height=600&width=600'
                width={600}
                height={600}
                alt='Baker working with dough'
                className='rounded-2xl'
              />
              <div className='absolute -right-8 -bottom-8 max-w-xs rounded-xl bg-[#FFFFF0] p-6 shadow-lg'>
                <p className='font-medium text-[#8B4513] italic'>
                  "Our sourdough starter has been nurtured for over 15 years, giving our bread its
                  distinctive character."
                </p>
                <div className='mt-4 flex items-center'>
                  <Image
                    src='/placeholder.svg?height=40&width=40'
                    width={40}
                    height={40}
                    alt='Head Baker'
                    className='mr-3 rounded-full'
                  />
                  <div>
                    <p className='font-medium text-[#8B4513]'>Emma Laurent</p>
                    <p className='text-sm text-gray-600'>Head Baker & Founder</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-6'>
              <div className='inline-block rounded-full bg-[#F5F5DC] px-3 py-1 text-sm font-medium text-[#8B4513]'>
                Our Story
              </div>
              <h2 className='text-3xl font-bold text-[#8B4513]'>Baking Traditions, Reimagined</h2>
              <p className='text-gray-700'>
                Founded in 2010, Hearth & Grain began with a simple mission: to bring traditional,
                handcrafted bread back to our community. Our founder, Emma, learned the art of
                breadmaking from her grandmother and was determined to share these time-honored
                techniques.
              </p>
              <p className='text-gray-700'>
                We use only organic flour, natural fermentation, and traditional methods that
                require time and patience. Every loaf is shaped by hand and baked in our stone
                hearth oven, resulting in bread with exceptional crust, texture, and flavor.
              </p>
              <Button className='bg-[#8B4513] text-[#FFFFF0] hover:bg-[#A0522D]'>
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id='testimonials' className='bg-[#FFFFF0] py-20'>
        <div className='container'>
          <div className='mb-16 text-center'>
            <h2 className='text-3xl font-bold text-[#8B4513]'>What Our Customers Say</h2>
            <p className='mx-auto mt-2 max-w-2xl text-gray-700'>
              Don't just take our word for it. Here's what bread lovers in our community have to
              say.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {testimonials.map((testimonial, index) => (
              <div key={index} className='rounded-xl bg-white p-8 shadow-md'>
                <div className='mb-4 flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='h-5 w-5 fill-current' />
                  ))}
                </div>
                <p className='mb-6 text-gray-700 italic'>"{testimonial.text}"</p>
                <div className='flex items-center'>
                  <Image
                    src={testimonial.avatar || '/placeholder.svg'}
                    width={48}
                    height={48}
                    alt={testimonial.name}
                    className='mr-4 rounded-full'
                  />
                  <div>
                    <p className='font-medium text-[#8B4513]'>{testimonial.name}</p>
                    <p className='text-sm text-gray-600'>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className='py-20'>
        <div className='container'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold text-[#8B4513]'>Follow Our Baking Journey</h2>
            <p className='mx-auto mt-2 max-w-2xl text-gray-700'>
              Join us on Instagram for daily bread inspiration, behind-the-scenes content, and
              special announcements.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {[...Array(8)].map((_, index) => (
              <div key={index} className='group relative overflow-hidden rounded-xl'>
                <Image
                  src={`/placeholder.svg?height=300&width=300`}
                  width={300}
                  height={300}
                  alt='Instagram post'
                  className='aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-[#8B4513]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <Instagram className='h-8 w-8 text-white' />
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <Button variant='outline' className='border-[#8B4513] text-[#8B4513]'>
              Follow Us @HearthAndGrain
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='bg-[#8B4513] py-20 text-white'>
        <div className='container'>
          <div className='grid gap-12 md:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-3xl font-bold'>Visit Our Bakery</h2>
              <p className='mb-8 max-w-md'>
                Stop by our bakery to experience the aroma of freshly baked bread and take home a
                loaf still warm from the oven.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <MapPin className='mr-4 h-6 w-6 flex-shrink-0' />
                  <div>
                    <h3 className='mb-1 text-xl font-semibold'>Location</h3>
                    <p>123 Bakery Street</p>
                    <p>Breadtown, BT 12345</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <Clock className='mr-4 h-6 w-6 flex-shrink-0' />
                  <div>
                    <h3 className='mb-1 text-xl font-semibold'>Hours</h3>
                    <p>Monday - Friday: 7am - 6pm</p>
                    <p>Saturday: 7am - 4pm</p>
                    <p>Sunday: 8am - 2pm</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <Phone className='mr-4 h-6 w-6 flex-shrink-0' />
                  <div>
                    <h3 className='mb-1 text-xl font-semibold'>Contact</h3>
                    <p>Phone: (555) 123-4567</p>
                    <p>Email: hello@hearthandgrain.com</p>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex gap-4'>
                <Button className='bg-white text-[#8B4513] hover:bg-[#FFFFF0]'>
                  Get Directions
                </Button>
                <Button variant='outline' className='border-white text-white hover:bg-white/10'>
                  Contact Us
                </Button>
              </div>
            </div>

            <div className='relative'>
              <Image
                src='/placeholder.svg?height=600&width=600'
                width={600}
                height={600}
                alt='Our bakery storefront'
                className='h-full rounded-2xl object-cover'
              />
              <div className='absolute top-0 left-0 -z-10 h-full w-full translate-x-6 translate-y-6 transform rounded-2xl border-8 border-[#A0522D]'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className='py-20'>
        <div className='container'>
          <div className='rounded-2xl bg-[#F5F5DC] p-8 md:p-12'>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <div>
                <h2 className='mb-4 text-3xl font-bold text-[#8B4513]'>Join Our Bread Club</h2>
                <p className='mb-6 text-gray-700'>
                  Subscribe to our newsletter for seasonal recipes, special offers, and be the first
                  to know about new bread varieties.
                </p>
                <div className='flex flex-col gap-3 sm:flex-row'>
                  <input
                    type='email'
                    placeholder='Your email address'
                    className='flex-1 rounded-lg border border-[#D2B48C] px-4 py-3'
                  />
                  <Button className='bg-[#8B4513] text-[#FFFFF0] hover:bg-[#A0522D]'>
                    Subscribe
                  </Button>
                </div>
                <p className='mt-3 text-xs text-gray-600'>
                  By subscribing, you agree to our Privacy Policy. We promise not to spam you.
                </p>
              </div>
              <div className='relative hidden md:block'>
                <Image
                  src='/placeholder.svg?height=300&width=400'
                  width={400}
                  height={300}
                  alt='Fresh bread basket'
                  className='rounded-xl'
                />
                <div className='absolute -right-4 -bottom-4 rounded-lg bg-white p-4 shadow-md'>
                  <p className='font-medium text-[#8B4513]'>
                    Subscribers get 10% off their first order!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default LandingPage;

const featuredBreads = [
  {
    name: 'Classic Sourdough',
    description: 'Our signature sourdough with a perfectly crisp crust and tender, tangy interior.',
    price: 7.99,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Rustic Baguette',
    description: 'Traditional French-style baguette with a crispy crust and light, airy crumb.',
    price: 4.99,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Cranberry Walnut',
    description: 'Artisan loaf packed with dried cranberries and toasted walnuts.',
    price: 8.99,
    image: '/placeholder.svg?height=400&width=400',
  },
];

const breadProcess = [
  {
    title: 'Select Ingredients',
    description: 'We source organic flour, filtered water, and sea salt for the purest flavor.',
  },
  {
    title: 'Mix & Ferment',
    description: 'Our dough ferments for 24-48 hours to develop complex flavors.',
  },
  {
    title: 'Shape by Hand',
    description: 'Each loaf is carefully shaped by our skilled bakers.',
  },
  {
    title: 'Bake in Stone Oven',
    description: 'Baked in our traditional stone hearth oven for the perfect crust.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Local Customer',
    text: "The sourdough from Hearth & Grain is absolutely incredible. I've never tasted bread with such depth of flavor and perfect texture.",
    avatar: '/placeholder.svg?height=48&width=48',
  },
  {
    name: 'Michael Chen',
    location: 'Food Blogger',
    text: "I drive 30 minutes every weekend just to get their olive rosemary bread. It's that good. The quality and craftsmanship is evident in every bite.",
    avatar: '/placeholder.svg?height=48&width=48',
  },
  {
    name: 'Emma Rodriguez',
    location: 'Chef',
    text: 'As someone who appreciates traditional baking methods, I can say that Hearth & Grain is the real deal. Their commitment to quality ingredients shows.',
    avatar: '/placeholder.svg?height=48&width=48',
  },
];
