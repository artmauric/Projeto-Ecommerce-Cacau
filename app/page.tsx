import HeroSection from '@/components/HeroSection'
import ProductDetail from '@/components/ProductDetail'
import ProductsGrid from '@/components/ProductsGrid'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ComboSection from '@/components/ComboSection'
import Footer from '@/components/Footer'
import { productService } from '@/application/services/productService'

export default function Home() {
  const products = productService.list()
  const combo = productService.getCombo()

  return (
    <main>
      <HeroSection />
      
      <section id="produtos" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title serif-heading">NOSSOS PRODUTOS</h2>
            <div className="section-accent-line"></div>
            <p className="section-subtitle serif-subtitle">
              Ferramentas sagradas para sua transformação pessoal
            </p>
          </div>
          {products.map((product) => (
            <div key={product.id} className="product-detail-wrapper">
              <ProductDetail product={product} />
            </div>
          ))}
        </div>
      </section>

      <ProductsGrid products={products} />
      
      <Testimonials />
      
      <FAQ />
      
      <ComboSection combo={combo} />
      
      <Footer />
    </main>
  )
}
