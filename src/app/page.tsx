import { FC } from 'react';

import BrushBackground from '@features/user/home/ui/BrushBackground';
import ContactUs from '@features/user/home/ui/ContactUs';
import Hero from '@features/user/home/ui/Hero';
import Signature from '@features/user/home/ui/Signature';

const HomePage: FC = () => {
  return (
    <main className='size-full'>
      <div className='relative container flex flex-col gap-20 px-4 pt-24'>
        <Hero />
        <Signature />
        <BrushBackground />
      </div>

      <ContactUs />

      {/* <div className='relative hidden flex-grow justify-center md:flex'>
          <div className='relative h-[400px] w-full max-w-[500px]'>
            <Image
              src='https://picsum.photos/seed/picsum/400/500'
              alt='Artisan bread'
              fill
              className='img-fade z-1 rounded-lg shadow-lg'
            />

            <Image
              src='https://picsum.photos/id/237/400/500'
              alt='Artisan bread'
              fill
              className='img-fade z-2 -translate-x-40 translate-y-4 -rotate-14 rounded-lg shadow-lg'
              style={{
                animationDelay: '1s',
              }}
            />

            <Image
              src='https://picsum.photos/400/500?grayscale'
              alt='Artisan bread'
              fill
              className='img-fade z-3 translate-x-40 rotate-16 rounded-lg shadow-lg'
              style={{
                animationDelay: '2s',
              }}
            />
          </div>
        </div> */}

      {/* About Section */}
      {/* <section id='about' className='bg-amber-900 py-16 text-amber-50'>
        <div className='container'>
          <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-3xl font-bold tracking-tight'>Our Baking Philosophy</h2>
              <p className='mb-4'>
                At Artisan Bread Co., we believe that great bread requires time, patience, and
                respect for tradition. Our journey began 15 years ago with a simple mission: to
                bring authentic, artisanal bread to our community.
              </p>
              <p className='mb-6'>
                Every loaf we create is shaped by hand, fermented naturally, and baked on stone
                hearths to develop that perfect crust and complex flavor that can only come from
                traditional methods.
              </p>
              <Button
                variant='outline'
                className='border-amber-200 text-amber-50 hover:bg-amber-800'
              >
                Learn More About Us
              </Button>
            </div>
            <div className='relative h-[400px] overflow-hidden rounded-lg'>
              <Image
                src='/placeholder.svg?height=800&width=600'
                alt='Baker working with dough'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section id='testimonials' className='py-16'>
        <div className='container'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>What Our Customers Say</h2>
            <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
              Don't just take our word for it – here's what bread lovers have to say about our
              artisanal creations.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {[
              {
                quote:
                  "The sourdough from Artisan Bread Co. is simply the best I've ever tasted. It's become a weekend tradition in our family.",
                author: 'Sarah M.',
              },
              {
                quote:
                  "As someone with a gluten sensitivity, I can actually enjoy their slow-fermented breads without discomfort. It's changed my life!",
                author: 'Michael T.',
              },
              {
                quote:
                  "Their olive bread is to die for. I've tried to recreate it at home but nothing compares to the real thing.",
                author: 'Jessica K.',
              },
            ].map((testimonial, index) => (
              <div key={index} className='rounded-lg border border-amber-100 bg-amber-50 p-8'>
                <div className='flex h-full flex-col'>
                  <div className='mb-4 text-amber-500'>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className='text-lg'>
                          ★
                        </span>
                      ))}
                  </div>
                  <blockquote className='text-muted-foreground mb-4 flex-1 italic'>
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className='font-medium'>— {testimonial.author}</footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className='bg-amber-600 py-16'>
        <div className='container'>
          <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2'>
            <div>
              <h2 className='mb-4 text-3xl font-bold tracking-tight text-white'>
                Join Our Bread Subscription
              </h2>
              <p className='mb-6 text-amber-50'>
                Never run out of fresh bread again. Get your favorite loaves delivered to your door
                weekly.
              </p>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <Button size='lg' className='bg-white text-amber-600 hover:bg-amber-50'>
                  Subscribe Now
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-amber-700'
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <h3 className='mb-4 text-xl font-semibold'>Sign up for bread-making classes</h3>
              <form className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='first-name' className='mb-1 block text-sm font-medium'>
                      First Name
                    </label>
                    <input
                      type='text'
                      id='first-name'
                      className='w-full rounded-md border px-3 py-2'
                      placeholder='Your first name'
                    />
                  </div>
                  <div>
                    <label htmlFor='last-name' className='mb-1 block text-sm font-medium'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='last-name'
                      className='w-full rounded-md border px-3 py-2'
                      placeholder='Your last name'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='email' className='mb-1 block text-sm font-medium'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='w-full rounded-md border px-3 py-2'
                    placeholder='your@email.com'
                  />
                </div>
                <Button className='w-full bg-amber-600 hover:bg-amber-700'>
                  Register for Classes
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section id='contact' className='py-16'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-3xl font-bold tracking-tight'>Visit Our Bakery</h2>
              <div className='space-y-4'>
                <div>
                  <h3 className='mb-2 font-semibold'>Address</h3>
                  <p className='text-muted-foreground'>123 Bread Street, Flourville, CA 94101</p>
                </div>
                <div>
                  <h3 className='mb-2 font-semibold'>Hours</h3>
                  <p className='text-muted-foreground'>Monday - Friday: 7am - 6pm</p>
                  <p className='text-muted-foreground'>Saturday - Sunday: 8am - 4pm</p>
                </div>
                <div>
                  <h3 className='mb-2 font-semibold'>Contact</h3>
                  <p className='text-muted-foreground'>Phone: (555) 123-4567</p>
                  <p className='text-muted-foreground'>Email: hello@artisanbread.co</p>
                </div>
              </div>
              <div className='mt-8 flex gap-4'>
                <Button variant='outline' size='icon'>
                  <Instagram className='h-5 w-5' />
                  <span className='sr-only'>Instagram</span>
                </Button>
                <Button variant='outline' size='icon'>
                  <Facebook className='h-5 w-5' />
                  <span className='sr-only'>Facebook</span>
                </Button>
                <Button variant='outline' size='icon'>
                  <Twitter className='h-5 w-5' />
                  <span className='sr-only'>Twitter</span>
                </Button>
              </div>
            </div>
            <div className='relative h-[400px] overflow-hidden rounded-lg'>
              <Image
                src='/placeholder.svg?height=800&width=600&text=Map'
                alt='Map to bakery location'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};
export default HomePage;
