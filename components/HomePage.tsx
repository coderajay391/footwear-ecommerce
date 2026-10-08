'use client';

import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCategories from './FeaturedCategories';
import TrendingProducts from './TrendingProducts';
import NewArrivals from './NewArrivals';
import PromotionalBanner from './PromotionalBanner';
import WhyChooseUs from './WhyChooseUs';
import CustomerReviews from './CustomerReviews';
import Newsletter from './Newsletter';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <NewArrivals />
      <PromotionalBanner />
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
}
