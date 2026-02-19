'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import { getAvailablePets } from '@/data/pets';
import { services } from '@/data/services';
import ProductCard from '@/components/shop/ProductCard';
import PetCard from '@/components/pets/PetCard';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const featuredPets = getAvailablePets().slice(0, 4);
  const featuredServices = services.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/pets`}>
                <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                  {t('hero.cta.adopt')}
                </Button>
              </Link>
              <Link href={`/${locale}/shop`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {t('hero.cta.shop')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
          <div className="absolute right-20 bottom-10 text-9xl opacity-20">🐕</div>
          <div className="absolute right-40 top-20 text-7xl opacity-20">🐈</div>
          <div className="absolute right-10 top-40 text-6xl opacity-20">🐦</div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t('pets.title')}</h2>
              <p className="text-gray-600 mt-2">{t('pets.subtitle')}</p>
            </div>
            <Link href={`/${locale}/pets`}>
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t('shop.title')}</h2>
              <p className="text-gray-600 mt-2">{t('shop.subtitle')}</p>
            </div>
            <Link href={`/${locale}/shop`}>
              <Button variant="outline">Shop All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t('services.title')}</h2>
              <p className="text-gray-600 mt-2">{t('services.subtitle')}</p>
            </div>
            <Link href={`/${locale}/services`}>
              <Button variant="outline">All Services →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to find your new best friend?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Visit our store or browse our available pets online. Our team is here to help you find the perfect companion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/pets`}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Browse Pets
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
