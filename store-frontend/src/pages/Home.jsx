import React from 'react'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import CategorySection from '../components/CategorySection'
import ProductGrid from '../components/ProductGrid'
import EditorialSection from '../components/EditorialSection'
import CollectionBanner from '../components/CollectionBanner'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Benefits />

      <CategorySection />

      <ProductGrid
        title="NEW ARRIVALS"
        subtitle="JUST DROPPED"
      />

      <EditorialSection />

      <ProductGrid
        title="TRENDING NOW"
        subtitle="WHAT'S HOT"
      />

      <CollectionBanner />

      <ProductGrid
        title="BEST SELLERS"
        subtitle="CUSTOMER FAVORITES"
      />

      <Newsletter />
    </div>
  )
}

export default Home
