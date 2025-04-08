import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Store,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ShoppingBag,
  Utensils,
  Car,
  Shirt,
  Home,
  Scissors,
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  Search,
  User,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Slider } from './components/Slider';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { BusinessDetails } from './components/BusinessDetails';
import  AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import UserList from './components/UserList';
import CategoryList from './components/CategoryList';
import Shop from './components/Shop';
import AddShop from './components/AddShop';

const translations = {
  en: {
    menu: {
      home: 'Home',
      categories: 'Categories',
      about: 'About',
      contact: 'Contact',
    },
    categories: {
      retail: 'Retail',
      restaurants: 'Restaurants',
      automotive: 'Automotive',
      fashion: 'Fashion',
      homeGoods: 'Home Goods',
      services: 'Services',
    },
    slider: {
      discover: {
        title: 'Discover Local Businesses',
        description: 'Support your community by shopping local.',
      },
      special: {
        title: 'Special Offers',
        description: 'Exclusive deals from your favorite local shops.',
      },
      community: {
        title: 'Building Community',
        description: 'Connecting neighbors with trusted local businesses.',
      },
      explore: {
        title: 'Explore New Fashions',
        description: 'Redefining Trends, One Outfit at a Time.',
      },
      adventure: {
        title: 'Feast Your Way Through Sunday',
        description: 'Delicious Discounts Await!',
      },
    },
    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
    footer: {
      about: 'About Us',
      aboutText:
        'Your local marketplace connecting communities with trusted businesses.',
      contact: 'Contact',
      follow: 'Follow Us',
      rights: 'All rights reserved',
    },
  },
  es: {
    menu: {
      home: 'Inicio',
      categories: 'Categorías',
      about: 'Acerca de',
      contact: 'Contacto',
    },
    categories: {
      retail: 'Minorista',
      restaurants: 'Restaurantes',
      automotive: 'Automotriz',
      fashion: 'Moda',
      homeGoods: 'Artículos para el Hogar',
      services: 'Servicios',
    },
    slider: {
      discover: {
        title: 'Descubre Negocios Locales',
        description: 'Apoya a tu comunidad comprando local.',
      },
      special: {
        title: 'Ofertas Especiales',
        description: 'Ofertas exclusivas de tus tiendas locales favoritas.',
      },
      community: {
        title: 'Construyendo Comunidad',
        description: 'Conectando vecinos con negocios locales de confianza.',
      },
      explore: {
        title: 'Explora Nuevas Modas',
        description: 'Redefiniendo Tendencias, Un Atuendo a la Vez.',
      },
      adventure: {
        title: 'Disfruta un banquete este domingo',
        description: 'Descuentos Deliciosos Te Esperan!',
      },
    },
    pagination: {
      prev: 'Anterior',
      next: 'Siguiente',
    },
    footer: {
      about: 'Sobre Nosotros',
      aboutText:
        'Tu mercado local que conecta comunidades con negocios de confianza.',
      contact: 'Contacto',
      follow: 'Síguenos',
      rights: 'Todos los derechos reservados',
    },
  },
  hi: {
    menu: {
      home: 'घर',
      categories: 'श्रेणियाँ',
      about: 'के बारे में',
      contact: 'संपर्क करें',
    },
    categories: {
      retail: 'खुदरा',
      restaurants: 'रेस्तरां',
      automotive: 'ऑटोमोटिव',
      fashion: 'फैशन',
      homeGoods: 'घर के सामान',
      services: 'सेवाएँ',
    },
    slider: {
      discover: {
        title: 'स्थानीय व्यवसायों की खोज करें',
        description: 'स्थानीय खरीदारी करके अपने समुदाय का समर्थन करें।',
      },
      special: {
        title: 'विशेष ऑफ़र',
        description: 'आपकी पसंदीदा स्थानीय दुकानों से विशेष सौदे।',
      },
      community: {
        title: 'समुदाय का निर्माण',
        description: 'विश्वसनीय स्थानीय व्यवसायों के साथ पड़ोसियों को जोड़ना।',
      },
      explore: {
        title: 'नई फैशनों की खोज करें',
        description: 'एक समय में एक आउटफिट, ट्रेंड को फिर से परिभाषित करना।',
      },
      adventure: {
        title: 'रविवार को अपने तरीके से भोजन करें',
        description: 'स्वादिष्ट छूट का इंतजार है!',
      },
    },
    pagination: {
      prev: 'पिछला',
      next: 'अगला',
    },
    footer: {
      about: 'हमारे बारे में',
      aboutText:
        'आपका स्थानीय बाज़ार जो समुदायों को विश्वसनीय व्यवसायों से जोड़ता है।',
      contact: 'संपर्क करें',
      follow: 'हमारा अनुसरण करें',
      rights: 'सभी अधिकार सुरक्षित हैं',
    },
  },
};

const slides = [
  {
    id: 1,
    key: 'discover',
    image:
      'https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 2,
    key: 'special',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 3,
    key: 'community',
    image:
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 4,
    key: 'explore',
    image:
      'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?q=80&w=1919',
  },
  {
    id: 5,
    key: 'adventure',
    image:
      'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000',
  },
];

const categories = [
  { icon: <ShoppingBag size={32} />, key: 'retail' },
  { icon: <Utensils size={32} />, key: 'restaurants' },
  { icon: <Car size={32} />, key: 'automotive' },
  { icon: <Shirt size={32} />, key: 'fashion' },
  { icon: <Home size={32} />, key: 'homeGoods' },
  { icon: <Scissors size={32} />, key: 'services' },
];

const shopImages = {
  retail: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1583922606661-0822ed0bd916?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=400"
  ],
  restaurants: [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400"
  ],
  automotive: [
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1632823471565-1ecdf5c6d7f7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1597766353939-aee87a63e114?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400"
  ],
  fashion: [
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400"
  ],
  homeGoods: [
    "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400"
  ],
  services: [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400"
  ]
};

const shopDescriptions = {
  retail: [
    "Your one-stop shop for daily essentials",
    "Curated collection of unique products",
    "Fresh local produce and groceries",
    "Quality goods at neighborhood prices"
  ],
  restaurants: [
    "Authentic local flavors and atmosphere",
    "Fine dining experience in your neighborhood",
    "Cozy cafe with fresh-baked goods",
    "Family-friendly dining destination"
  ],
  automotive: [
    "Professional auto repair and maintenance",
    "Premium car care services",
    "Expert tire sales and service",
    "Quality auto parts and accessories"
  ],
  fashion: [
    "Trendy fashion for every style",
    "Designer boutique experience",
    "Affordable fashion finds",
    "Unique accessories and clothing"
  ],
  homeGoods: [
    "Quality furniture and home decor",
    "Modern home design solutions",
    "Affordable home improvements",
    "Unique home accessories"
  ],
  services: [
    "Professional beauty and wellness",
    "Expert cleaning solutions",
    "Reliable repair services",
    "Quality professional services"
  ]
};

const shopNames = {
  retail: [
    "Corner Market",
    "The Local Pantry",
    "Main Street Goods",
    "Neighborhood Essentials"
  ],
  restaurants: [
    "The Local Table",
    "Cafe Corner",
    "Family Kitchen",
    "Taste of Home"
  ],
  automotive: [
    "City Auto Care",
    "Premium Car Wash",
    "Tire Experts",
    "Auto Parts Plus"
  ],
  fashion: [
    "Style Studio",
    "Fashion Forward",
    "Trendy Threads",
    "Chic Boutique"
  ],
  homeGoods: [
    "Home & Living",
    "Decor Dreams",
    "Furniture Plus",
    "Interior Accents"
  ],
  services: [
    "Beauty Bar",
    "Clean & Shine",
    "Fix-It Pro",
    "Service Solutions"
  ]
};

const shops = Array.from({ length: 27 }, (_, i) => {
  const category = categories[i % categories.length].key as keyof typeof shopImages;
  const imageIndex = Math.floor(Math.random() * shopImages[category].length);
  return {
    id: i + 1,
    name: shopNames[category][imageIndex],
    category,
    image: shopImages[category][imageIndex],
    description: shopDescriptions[category][imageIndex],
    rating: 4 + Math.random(),
  };
});

function HomePage({ 
  t, 
  selectedCategory, 
  setSelectedCategory, 
  isCategoriesOpen, 
  setIsCategoriesOpen,
  currentPage,
  setCurrentPage,
  currentShops,
  totalPages 
}: any) {
  return (
    <>
      <Slider
        slides={slides}
        translations={t}
        autoPlayInterval={5000}
        transitionDuration={500}
      />

      <button 
        className={`categories-toggle ${isCategoriesOpen ? 'active' : ''}`}
        onClick={() => setIsCategoriesOpen((prev: boolean) => !prev)}
        aria-label="Toggle categories"
      >
        {isCategoriesOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <section className={`categories-section ${isCategoriesOpen ? 'active' : ''}`}>
        <div className="categories-grid">
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              if (window.innerWidth <= 768) {
                setIsCategoriesOpen(false);
              }
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category.key);
                if (window.innerWidth <= 768) {
                  setIsCategoriesOpen(false);
                }
              }}
            >
              {category.icon}
              <span>{t.categories[category.key as keyof typeof t.categories]}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="shops-grid">
        {currentShops.map((shop: any) => (
          <Link to={`/business/${shop.id}`} key={shop.id} className="shop-card">
            <div className="shop-image">
              <img src={shop.image} alt={shop.name} />
            </div>
            <div className="shop-content">
              <h3>{shop.name}</h3>
              <p>{shop.description}</p>
              <div className="shop-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart
                    key={i}
                    size={16}
                    className={i < Math.floor(shop.rating) ? 'filled' : ''}
                  />
                ))}
                <span>{shop.rating.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev: number) => prev - 1)}
        >
          {t.pagination.prev}
        </button>
        <div className="pagination-numbers">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev: number) => prev + 1)}
        >
          {t.pagination.next}
        </button>
      </div>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: '',
    acceptTerms: false
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const t = translations[language as keyof typeof translations];
  const itemsPerPage = 9;

  const filteredShops =
    selectedCategory === 'all'
      ? shops
      : shops.filter((shop) => shop.category === selectedCategory);

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  const currentShops = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000); // Change category every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [categories.length]);

  useEffect(() => {
    setSelectedCategory(categories[currentCategoryIndex].key); // Update selected category
  }, [currentCategoryIndex, categories]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query); // Log the search query
    setSearchQuery(query);
    const results = shops.filter(shop => 
      shop.name.toLowerCase().includes(query.toLowerCase()) || 
      shop.description.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Search results:", results); // Log the results
    setSearchResults(results);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        localStorage.setItem("userRole", data.role); // Store role
        localStorage.setItem("token", data.token);  // store token

        // Redirect based on user role
        if (data.role === 'USER') {
          navigate("/"); // Redirect to home page for users
        } else if (data.role === 'ADMIN') {
          navigate("/admin"); // Redirect to admin dashboard
        } else if (data.role === 'OWNER') {
          navigate("/owner"); // Redirect to owner dashboard
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      navigate("/");
      window.location.reload(); // Refresh the page
  
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration attempt:', registerForm);
    setShowAuthForm(false);
  };

  const switchToRegister = () => {
    setIsLoginForm(false);
  };

  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  const handleDelete = (shopId: number) => {
    // Logic to delete the shop, e.g., making an API call
    console.log(`Deleting shop with ID: ${shopId}`);
    // Update the shops state accordingly
  };

  const handleAddShop = () => {
    // Logic to add a new shop, e.g., opening a modal or redirecting to a form
    console.log('Adding a new shop');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <Store size={24} />
            Citi Offers
          </Link>

          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {t.menu.home}
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                {t.menu.categories} <ChevronDown size={16} />
              </a>
              <ul className="submenu">
                {categories.map((category) => (
                  <li key={category.key} className="submenu-item">
                    <Link
                      to="/"
                      className="submenu-link"
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      {t.categories[category.key as keyof typeof t.categories]}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                {t.menu.about}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                {t.menu.contact}
              </Link>
            </li>
            <li className="nav-item search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-bar"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                />
                <button onClick={() => handleSearch(searchQuery)} className="search-icon-button">
                  <Search size={20} className="search-icon" />
                </button>
              </div>
              {searchQuery && searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map(shop => (
                    <li key={shop.id} className="search-item">
                      <Link to={`/business/${shop.id}`} className="search-link">
                        {shop.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <div className="nav-right">
            <div className="controls">
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <select
                className="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="hi">HI</option>
              </select>
            </div>
            <div className="login-container">
              {isLoggedIn ? (
                <button 
                  className="logout-btn" 
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              ) : (
                <button 
                  className="login-btn" 
                  onClick={() => {
                    setShowAuthForm(!showAuthForm);
                    setIsLoginForm(true);
                  }}
                  aria-label="Login"
                >
                  <User size={24} />
                </button>
              )}
              {showAuthForm && !isLoggedIn && (
                <div className="auth-form-container">
                  {isLoginForm ? (
                    <form className="auth-form login-form" onSubmit={handleLogin}>
                      <h3>Login</h3>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="box"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                      <div className="password-input-container">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="box"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                        >
                          {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <div className="remember">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={loginForm.rememberMe}
                          onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                        />
                        <label htmlFor="remember">Remember me</label>
                      </div>
                      <button type="submit" className="btn">
                        Login Now
                      </button>
                      <div className="form-footer">
                        <a href="#" className="forgot-password">Forgot password?</a>
                        <p>Don't have an account? <button type="button" className="switch-btn" onClick={switchToRegister}>Signup now</button></p>
                      </div>
                    </form>
                  ) : (
                    <form className="auth-form register-form" onSubmit={handleRegister}>
                      <h3>Registration</h3>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="box"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                      />
                      <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="box"
                        value={registerForm.mobile}
                        onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="box"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      />
                      <div className="password-input-container">
                        <input
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="box"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                        >
                          {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <select
                        className="box"
                        value={registerForm.role}
                        onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                      >
                        <option value="">Select Role</option>
                        <option value="owner">Owner</option>
                        <option value="user">User</option>
                      </select>
                      <div className="terms">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={registerForm.acceptTerms}
                          onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                        />
                        <label htmlFor="terms">I accept all terms & conditions</label>
                      </div>
                      <button type="submit" className="btn">
                        Register Now
                      </button>
                      <div className="form-footer">
                        <p>Already have an account? <button type="button" className="switch-btn" onClick={switchToLogin}>Login now</button></p>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <HomePage 
            t={t}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isCategoriesOpen={isCategoriesOpen}
            setIsCategoriesOpen={setIsCategoriesOpen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredShops={filteredShops}
            currentShops={currentShops}
            totalPages={totalPages}
          />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/business/:id" element={<BusinessDetails shops={shops} />} />
        <Route path="/admin" element={<AdminDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user" element={<UserDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/owner" element={
          <OwnerDashboard 
            shops={shops} 
            onDelete={handleDelete}
            onAddShop={handleAddShop}
            onLogout={handleLogout} 
          />
        } />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/owner/shops" element={<Shop />} />
        <Route path="/owner/shops/add" element={<AddShop />} />
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t.footer.about}</h3>
            <p>{t.footer.aboutText}</p>
          </div>
          <div className="footer-section">
            <h3>{t.footer.contact}</h3>
            <div className="contact-info">
              <p>
                <Phone size={16} /> +1 234 567 890
              </p>
              <p>
                <Mail size={16} /> contact@localmarket.com
              </p>
              <p>
                <MapPin size={16} /> 123 Market Street, City
              </p>
            </div>
          </div>
          <div className="footer-section">
            <h3>{t.footer.follow}</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/login/" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/i/flow/login" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/accounts/login/" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/login" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} LocalMarket. {t.footer.rights}
          </p>
        </div>
      </footer>

      {showScrollToTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

const styles = `
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s;
}

.scroll-to-top:hover {
  background-color: #555;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}

.search-bar {
  padding: 8px 40px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  transition: border-color 0.3s;
}

.search-bar:focus {
  border-color: #007bff;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  font-weight: bold;
}

.search-dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Match the width of the search bar */
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  top: 100%; /* Position it directly below the search bar */
  left: 0; /* Align it to the left */
}

.search-item {
  padding: 10px;
  cursor: pointer;
}

.search-item:hover {
  background-color: #f0f0f0;
}

.search-link {
  text-decoration: none;
  color: black;
}

.search-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.search-icon-button:focus {
  outline: none;
}

.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  color: #007bff;
}

.auth-form-container {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
  margin: 0;
}

.auth-form {
  width: 100%;
}

.auth-form h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.auth-form .box {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.auth-form .box:focus {
  border-color: #007bff;
  outline: none;
}

.auth-form .remember,
.auth-form .terms {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.auth-form .btn {
  width: 100%;
  padding: 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}

.auth-form .btn:hover {
  background: #0056b3;
}

.form-footer {
  text-align: center;
  font-size: 0.9rem;
}

.form-footer .forgot-password {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.form-footer p {
  margin: 0.5rem 0;
}

.switch-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
}

.switch-btn:hover {
  color: #0056b3;
}

@media (max-width: 768px) {
  .auth-form-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
  }
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-container {
  position: relative;
}

.login-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.login-btn:hover {
  color: #007bff;
}

.login-form {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-right {
    gap: 0.5rem;
  }

  .login-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
  }
}

.logout-btn {
    background-color: #2ecc71; /* Green background */
    color: white; /* White text */
    border: none; /* No border */
    padding: 10px 20px; /* Padding for size */
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s; /* Smooth transition */
}

.logout-btn:hover {
    background-color: #27ae60; /* Darker green on hover */
}

.auth-form.login-form {
  margin: 0;
  padding: 1rem;
}

.password-input-container {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

.password-input-container .box {
  width: 100%;
  padding-right: 40px; /* Make space for the icon */
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #007bff;
}

.password-toggle:focus {
  outline: none;
  color: #007bff;
}

/* Ensure the password input doesn't overflow */
.password-input-container input {
  margin-bottom: 0;
}

.category {
  padding: 10px;
  cursor: pointer;
}

.category.active {
  background-color: #007bff; /* Highlight color for active category */
  color: white;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;