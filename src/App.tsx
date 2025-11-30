import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LGHomePage } from './pages/LGHomePage';
import { LGProductDetailPage } from './pages/LGProductDetailPage';

type Route = 'main' | 'lg';
type View = 'home' | 'category' | 'product';

function getRouteFromHash(): { route: Route; productId?: string } {
  const hash = window.location.hash.slice(1); // Remove #
  const path = hash.startsWith('/') ? hash.slice(1) : hash;

  // Check for /LG or /lg routes (case insensitive)
  if (path.toLowerCase().startsWith('lg')) {
    const parts = path.split('/');
    // /LG/product/123 -> show product detail
    if (parts[1]?.toLowerCase() === 'product' && parts[2]) {
      return { route: 'lg', productId: parts[2] };
    }
    return { route: 'lg' };
  }

  return { route: 'main' };
}

export function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('main');
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const { route, productId } = getRouteFromHash();
      setCurrentRoute(route);
      if (productId) {
        setSelectedProductId(productId);
        setCurrentView('product');
      } else {
        setSelectedProductId(null);
        setCurrentView('home');
      }
    };

    // Initial route
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Main site handlers
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

  // LG site handlers
  const handleLGProductClick = (productId: string) => {
    window.location.hash = `#/LG/product/${productId}`;
  };

  const handleLGBackToHome = () => {
    window.location.hash = '#/LG';
  };

  // Render LG route
  if (currentRoute === 'lg') {
    if (currentView === 'product' && selectedProductId) {
      return <LGProductDetailPage productId={selectedProductId} onBack={handleLGBackToHome} />;
    }
    return <LGHomePage onProductClick={handleLGProductClick} />;
  }

  // Render main site
  return <>
    {currentView === 'home' && <HomePage onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} />}
    {currentView === 'category' && selectedCategory && <CategoryPage category={selectedCategory} onProductClick={handleProductClick} onBack={handleBackToHome} />}
    {currentView === 'product' && selectedProductId && <ProductDetailPage productId={selectedProductId} onBack={handleBackToHome} />}
  </>;
}