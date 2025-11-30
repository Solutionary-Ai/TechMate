import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
type View = 'home' | 'category' | 'product';
export function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('category');
  };
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
    setSelectedCategory(null);
  };
  return <>
      {currentView === 'home' && <HomePage onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} />}
      {currentView === 'category' && selectedCategory && <CategoryPage category={selectedCategory} onProductClick={handleProductClick} onBack={handleBackToHome} />}
      {currentView === 'product' && selectedProductId && <ProductDetailPage productId={selectedProductId} onBack={handleBackToHome} />}
    </>;
}