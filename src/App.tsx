import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Store,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ShoppingBag, // Default/Fallback icon
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
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import UserList from './components/UserList';
import CategoryList from './components/CategoryList';
import Shop from './components/Shop';
import AddShop from './components/AddShop';
import Discount from './components/Discount';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';

// --- Interfaces for Fetched Data ---
interface Category {
  id: number;
  name: string;
  iconKey: string; // Expecting a key like 'retail', 'restaurants' from backend
}

interface Shop {
  id: number;
  name: string;
  // 'category' field from backend might represent the category ID or name.
  // Adjust based on your API response. If it's ID, you might need category data to display name/icon.
  // For now, assuming it might be a string key matching iconKey, but API fetching handles the filtering.
  category: string; // Or number if API sends category ID
  image?: string; // Image URL might be optional
  description: string;
  rating?: number; // Rating might be optional
}

// --- Translations ---
const translations = {
  en: {
    menu: { home: 'Home', categories: 'Categories', about: 'About', contact: 'Contact' },
    categories: { all: 'All' /* Other keys removed as names come from API */ },
    slider: { discover: { title: 'Discover Local Businesses', description: 'Support your community by shopping local.' }, special: { title: 'Special Offers', description: 'Exclusive deals from your favorite local shops.' }, community: { title: 'Building Community', description: 'Connecting neighbors with trusted local businesses.' }, explore: { title: 'Explore New Fashions', description: 'Redefining Trends, One Outfit at a Time.' }, adventure: { title: 'Feast Your Way Through Sunday', description: 'Delicious Discounts Await!' } },
    pagination: { prev: 'Previous', next: 'Next' },
    footer: { about: 'About Us', aboutText: 'Your local marketplace connecting communities with trusted businesses.', contact: 'Contact', follow: 'Follow Us', rights: 'All rights reserved' },
  },
  es: {
    menu: { home: 'Inicio', categories: 'Categorías', about: 'Acerca de', contact: 'Contacto' },
    categories: { all: 'Todos' },
    slider: { discover: { title: 'Descubre Negocios Locales', description: 'Apoya a tu comunidad comprando local.' }, special: { title: 'Ofertas Especiales', description: 'Ofertas exclusivas de tus tiendas locales favoritas.' }, community: { title: 'Construyendo Comunidad', description: 'Conectando vecinos con negocios locales de confianza.' }, explore: { title: 'Explora Nuevas Modas', description: 'Redefiniendo Tendencias, Un Atuendo a la Vez.' }, adventure: { title: 'Disfruta un banquete este domingo', description: 'Descuentos Deliciosos Te Esperan!' } },
    pagination: { prev: 'Anterior', next: 'Siguiente' },
    footer: { about: 'Sobre Nosotros', aboutText: 'Tu mercado local que conecta comunidades con negocios de confianza.', contact: 'Contacto', follow: 'Síguenos', rights: 'Todos los derechos reservados' },
  },
  hi: {
    menu: { home: 'घर', categories: 'श्रेणियाँ', about: 'के बारे में', contact: 'संपर्क करें' },
    categories: { all: 'सभी' },
    slider: { discover: { title: 'स्थानीय व्यवसायों की खोज करें', description: 'स्थानीय खरीदारी करके अपने समुदाय का समर्थन करें।' }, special: { title: 'विशेष ऑफ़र', description: 'आपकी पसंदीदा स्थानीय दुकानों से विशेष सौदे।' }, community: { title: 'समुदाय का निर्माण', description: 'विश्वसनीय स्थानीय व्यवसायों के साथ पड़ोसियों को जोड़ना।' }, explore: { title: 'नई फैशनों की खोज करें', description: 'एक समय में एक आउटफिट, ट्रेंड को फिर से परिभाषित करना।' }, adventure: { title: 'रविवार को अपने तरीके से भोजन करें', description: 'स्वादिष्ट छूट का इंतजार है!' } },
    pagination: { prev: 'पिछला', next: 'अगला' },
    footer: { about: 'हमारे बारे में', aboutText: 'आपका स्थानीय बाज़ार जो समुदायों को विश्वसनीय व्यवसायों से जोड़ता है।', contact: 'संपर्क करें', follow: 'हमारा अनुसरण करें', rights: 'सभी अधिकार सुरक्षित हैं' },
  }
};

// --- Static Slider Data ---
const slides = [
    { id: 1, key: 'discover', image: 'https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=1920' },
    { id: 2, key: 'special', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1920' },
    { id: 3, key: 'community', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1920' },
    { id: 4, key: 'explore', image: 'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?q=80&w=1919' },
    { id: 5, key: 'adventure', image: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000' },
];

// --- Icon Mapping ---
const iconComponents: { [key: string]: JSX.Element } = {
  retail: <ShoppingBag size={32} />,
  restaurants: <Utensils size={32} />,
  automotive: <Car size={32} />,
  fashion: <Shirt size={32} />,
  homeGoods: <Home size={32} />,
  services: <Scissors size={32} />,
};

// --- Constants for Image Fallbacks ---
const LOCAL_FALLBACK_IMAGE_URL = '/no-image-placeholder.png'; // Place in public folder
const DEFAULT_PLACEHOLDER_URL = 'https://placeholder.com/400x300?text=No+Image';

// --- Error Boundary Component --- (Keep from previous version)
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error?: Error; }
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { hasError: true, error: error }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { console.error("Uncaught error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          {this.state.error && <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left', background: '#ffebeb', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>{this.state.error.toString()}</pre>}
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}> Refresh Page </button>
        </div>
      );
    }
    return this.props.children;
  }
}


// --- Main App Component ---
function App() {
  // --- State Variables ---
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // selectedCategory now stores 'all' or the category ID (number)
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });
  const [registerForm, setRegisterForm] = useState({ fullName: '', email: '', mobile: '', password: '', role: '', acceptTerms: false });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]); // Holds the currently displayed shops (all or filtered by API)
  const [loading, setLoading] = useState<boolean>(true);

  const t = translations[language as keyof typeof translations];
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

  // --- API Fetching Functions ---
  const fetchAllShops = async () => {
    console.log("Fetching all shops...");
    setLoading(true);
    setCurrentPage(1); // Reset page when fetching new data set
    try {
      const response = await fetch("http://localhost:8080/owner/shops"); // Public endpoint assumed
      if (!response.ok) {
        throw new Error(`Failed to fetch shops: ${response.statusText} (${response.status})`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid shops data format received.");
      setShops(data);
      setSelectedCategory('all'); // Update state to reflect "All" is selected
    } catch (error) {
      console.error("Error fetching all shops:", error);
      setShops([]); // Clear shops on error
    } finally {
      setLoading(false);
    }
  };

  const fetchShopsByCategory = async (categoryId: number) => {
    // Find the category to potentially get its iconKey if needed later, though not used for filtering now
    const category = categories.find(cat => cat.id === categoryId);
    console.log(`Fetching shops for category ID: ${categoryId} (${category?.name})...`);

    setLoading(true);
    setCurrentPage(1); // Reset page when fetching new data set
    try {
      // This endpoint might need Authorization if it's admin-specific
      const token = localStorage.getItem("token");
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) {
          headers["Authorization"] = `Bearer ${token}`;
      }

      // Ensure the URL is correct for fetching by category ID
      const response = await fetch(`http://localhost:8080/admin/shops/byCategory/${categoryId}`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category shops: ${response.statusText} (${response.status})`);
      }
      const shopsData = await response.json();
       if (!Array.isArray(shopsData)) throw new Error("Invalid category shops data format received.");
      setShops(shopsData);
      setSelectedCategory(categoryId); // Update state to reflect the selected category ID
    } catch (error) {
      console.error(`Error fetching shops for category ${categoryId}:`, error);
      setShops([]); // Clear shops on error
    } finally {
      setLoading(false);
    }
  };

  // --- Initial Data Load Effect ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Ensure loading is true at the start
      try {
        // Fetch categories first
        const categoriesResponse = await fetch("http://localhost:8080/owner/categories"); // Public endpoint assumed
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText} (${categoriesResponse.status})`);
        }
        const categoriesData = await categoriesResponse.json();
        if (!Array.isArray(categoriesData)) throw new Error("Invalid categories data format.");

        setCategories(categoriesData);

        // Then fetch all shops initially
        await fetchAllShops(); // Calls setLoading(true/false) internally

      } catch (error) {
        console.error("Error fetching initial data:", error);
        setCategories([]); // Clear on error
        setShops([]);
        setLoading(false); // Ensure loading stops on error
      }
      // No finally here, as fetchAllShops handles its own final setLoading(false)
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - run once on mount

  // --- Other Effects (Theme, Scroll, Body Class) ---
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isCategoriesOpen) document.body.classList.add('categories-active');
    else document.body.classList.remove('categories-active');
    return () => { document.body.classList.remove('categories-active'); };
  }, [isCategoriesOpen]);


  // --- Pagination Calculation (Based on current 'shops' state) ---
  // No client-side filtering needed here anymore
  const totalPages = Math.ceil(shops.length / itemsPerPage);
  const currentShops = shops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Effect to reset page if it becomes invalid (e.g., after fetching fewer shops)
  // Now depends on `shops.length` instead of `filteredShops.length`
   useEffect(() => {
       const currentTotalPages = Math.ceil(shops.length / itemsPerPage);
       if (currentPage > currentTotalPages && currentTotalPages > 0) {
           setCurrentPage(1);
       }
       // If shops array is empty after a fetch, reset page (avoid during initial load)
       else if (shops.length === 0 && currentPage !== 1 && !loading) {
           setCurrentPage(1);
       }
   }, [shops, currentPage, itemsPerPage, loading]); // Depend on shops array itself


  // --- Handlers ---
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/user/search?name=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json(); // Ensure response is parsed as JSON
      setSearchResults(data); // Set the search results data
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]); // Optionally clear the search results on error
    }
  };
   // --- Login Handler (Keep as is) ---
   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthForm(false); // Close form on attempt
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
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("token", data.token);

        // Clear form
        setLoginForm({ email: '', password: '', rememberMe: false });

        // Redirect based on user role
        if (data.role === 'USER') navigate("/");
        else if (data.role === 'ADMIN') navigate("/admin");
        else if (data.role === 'OWNER') navigate("/owner");
        else navigate("/"); // Default fallback

      } else {
          const errorData = await response.text(); // Get error text
          console.error("Login failed:", response.status, errorData);
          alert(`Login failed: ${response.statusText} - ${errorData}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  

  // --- Logout Handler (Keep as is) ---
  const handleLogout = async () => {
    try {
        // Optional: Call backend logout endpoint
        const token = localStorage.getItem("token");
        await fetch("http://localhost:8080/auth/logout", { method: "POST", headers: { "Authorization": `Bearer ${token}` }});

        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        setSearchQuery('');
        setSearchResults([]);
        setShowAuthForm(false);
        // Reset to showing all shops on logout?
        await fetchAllShops(); // Optionally refetch all shops
        navigate("/");

    } catch (error) {
        console.error("Logout error:", error);
        // Still log out locally
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        navigate("/");
    }
  };


  // --- Register Handler (Keep as is) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!registerForm.acceptTerms) { alert("You must accept the terms and conditions."); return; }
     if (registerForm.password.length < 6) { alert("Password must be at least 6 characters long."); return; }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fullName: registerForm.fullName, email: registerForm.email, mobile: registerForm.mobile,
            password: registerForm.password, role: registerForm.role
        }),
      });

      if (response.ok) {
        alert("Registration successful! Please log in.");
        setIsLoginForm(true);
        setRegisterForm({ fullName: '', email: '', mobile: '', password: '', role: '', acceptTerms: false });
      } else {
        let errorMsg = response.statusText;
        try { const errorData = await response.json(); errorMsg = errorData.message || errorMsg; } catch (jsonError) { /* Ignore */ }
        alert(`Registration failed: ${errorMsg}`);
        console.error("Registration failed response:", response.status, errorMsg);
      }
    } catch (error) {
      console.error("Registration network error:", error);
      alert(`Registration error: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  };

  const switchToRegister = () => setIsLoginForm(false);
  const switchToLogin = () => setIsLoginForm(true);

  // --- Delete/Add Shop Handlers (Keep placeholders) ---
  const handleDeleteShop = (shopId: number) => { console.log(`Request to delete shop with ID: ${shopId}`); /* API Call */ };
  const handleAddShop = () => { navigate('/owner/shops/add'); };


  // --- HomePage Component (Defined within App for state access) ---
  // Now uses the fetch functions passed down implicitly
  const HomePage = () => (
    <>
      <Slider slides={slides} translations={t} autoPlayInterval={5000} transitionDuration={500} />

      <button
        className={`categories-toggle ${isCategoriesOpen ? 'active' : ''}`}
        onClick={() => setIsCategoriesOpen(prev => !prev)}
        aria-label="Toggle categories"
      >
        {isCategoriesOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Updated Categories Section */}
      <section className={`categories-section ${isCategoriesOpen ? 'active' : ''}`}>
        <div className="categories-grid">
          {/* "All" Button */}
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={async () => { // Make async if fetchAllShops is async
                 await fetchAllShops();
                 if (window.innerWidth <= 768) setIsCategoriesOpen(false);
             }}
          >
            {t.categories.all}
          </button>
          {/* Dynamic Categories */}
          {categories.map(category => (
            <button
              key={category.id}
              // Compare selectedCategory (which is 'all' or ID) with category.id
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={async () => { // Make async if fetchShopsByCategory is async
                await fetchShopsByCategory(category.id);
                if (window.innerWidth <= 768) setIsCategoriesOpen(false);
              }}
            >
              {iconComponents[category.iconKey] || <ShoppingBag size={32} />}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading businesses...</p>
        </div>
      ) : (
        <section className="shops-grid">
          {/* currentShops is now derived directly from the 'shops' state */}
          {currentShops.length > 0 ? (
            currentShops.map((shop: Shop) => (
              <Link to={`/business/${shop.id}`} key={shop.id} className="shop-card">
                <div className="shop-image">
                  <img
                    src={shop.image || DEFAULT_PLACEHOLDER_URL}
                    alt={shop.name}
                    onError={(e) => {
                      const fallbackFullUrl = window.location.origin + LOCAL_FALLBACK_IMAGE_URL;
                      if (e.currentTarget.src !== fallbackFullUrl) {
                           console.warn(`Image failed: ${e.currentTarget.src}. Falling back locally.`);
                           e.currentTarget.src = LOCAL_FALLBACK_IMAGE_URL;
                           e.currentTarget.alt = `${shop.name} (Image unavailable)`;
                      } else {
                           console.error("Local fallback failed:", LOCAL_FALLBACK_IMAGE_URL);
                      }
                    }}
                  />
                </div>
                <div className="shop-content">
                  <h3>{shop.name}</h3>
                  <p>{shop.description}</p>
                  <div className="shop-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Heart
                        key={i}
                        size={16}
                        className={i < Math.floor(shop.rating ?? 0) ? 'filled' : ''}
                        fill={i < Math.floor(shop.rating ?? 0) ? 'currentColor' : 'none'}
                      />
                    ))}
                    {shop.rating !== undefined && shop.rating !== null && (
                       <span>{shop.rating.toFixed(1)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <p>No businesses found {selectedCategory !== 'all' ? `for this category` : ''}.</p>
          )}
        </section>
      )}

      {/* Pagination - Only show if needed based on total items in 'shops' */}
      {!loading && shops.length > itemsPerPage && (
          <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev: number) => Math.max(1, prev - 1))}
          >
            {t.pagination.prev}
          </button>
          <div className="pagination-numbers">
            {/* Calculate totalPages based on the current shops array length */}
            {Array.from({ length: Math.ceil(shops.length / itemsPerPage) }).map((_, i) => (
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
            disabled={currentPage === Math.ceil(shops.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev: number) => Math.min(Math.ceil(shops.length / itemsPerPage), prev + 1))}
          >
            {t.pagination.next}
          </button>
        </div>
      )}
    </>
  );


  // --- Main Return Structure ---
  return (
    <ErrorBoundary>
      <div>
        {/* --- Navbar --- */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo" onClick={fetchAllShops}> {/* Fetch all when logo clicked */}
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
                 <Link to="/" className="nav-link" onClick={async () => { await fetchAllShops(); setIsMobileMenuOpen(false); }}>
                    {t.menu.home}
                 </Link>
              </li>
              {/* Updated Categories Dropdown */}
              {categories.length > 0 && (
                 <li className="nav-item">
                    <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                        {t.menu.categories} <ChevronDown size={16} />
                    </a>
                    <ul className="submenu">
                        {/* "All" option */}
                        <li className="submenu-item">
                           <Link
                             to="/"
                             className="submenu-link"
                             onClick={async () => { await fetchAllShops(); setIsMobileMenuOpen(false); }}
                           >
                             {t.categories.all}
                           </Link>
                        </li>
                        {/* Dynamic categories */}
                        {categories.map((category) => (
                        <li key={category.id} className="submenu-item">
                            <Link
                            to="/"
                            className="submenu-link"
                            onClick={async () => { await fetchShopsByCategory(category.id); setIsMobileMenuOpen(false); }}
                            >
                            {category.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                 </li>
              )}
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.menu.about}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.menu.contact}
                </Link>
              </li>
              {/* Search Bar */}
              <li className="nav-item search-container">
                 <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search current view..." // Clarify search scope
                        className="search-bar"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button onClick={() => handleSearch(searchQuery)} className="search-icon-button" aria-label="Search">
                         <Search size={20} className="search-icon" />
                    </button>
                 </div>
                 {searchQuery && searchResults.length > 0 && (
                    <ul className="search-dropdown">
                        {searchResults.slice(0, 10).map(shop => (
                        <li key={shop.id} className="search-item">
                            <Link
                                to={`/business/${shop.id}`}
                                className="search-link"
                                onClick={() => { setSearchQuery(''); setSearchResults([]); setIsMobileMenuOpen(false); }}
                            >
                            {shop.name}
                            </Link>
                        </li>
                        ))}
                        {searchResults.length > 10 && <li className="search-item-more">... more results</li>}
                    </ul>
                 )}
              </li>
            </ul>

            {/* Right Nav Controls and Auth */}
            <div className="nav-right">
              <div className="controls">
                 <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                   {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                 </button>
                 <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Select language">
                   <option value="en">EN</option> <option value="es">ES</option> <option value="hi">HI</option>
                 </select>
              </div>
              <div className="login-container">
                {isLoggedIn ? (
                  <button className="logout-btn" onClick={handleLogout} aria-label="Logout"> Logout </button>
                ) : (
                  !location.pathname.includes('/forgot-password') && !location.pathname.includes('/forgot/verify-otp') && !location.pathname.includes('/reset-password') && (
                    <button className="login-btn" onClick={() => { setShowAuthForm(!showAuthForm); setIsLoginForm(true); }} aria-label="Login or Register"> <User size={24} /> </button>
                  )
                )}
                {/* Auth Form Popup */}
                {showAuthForm && !isLoggedIn && !location.pathname.includes('/forgot-password') && !location.pathname.includes('/forgot/verify-otp') && !location.pathname.includes('/reset-password') && (
                  <div className="auth-form-container">
                    <button className="auth-close-btn" onClick={() => setShowAuthForm(false)} aria-label="Close login form"> <X size={20} /> </button>
                    {isLoginForm ? (
                       <form className="auth-form login-form" onSubmit={handleLogin}>
                          <h3>Login</h3>
                          <input type="email" placeholder="Enter your email" className="box" required value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                          <div className="password-input-container">
                             <input type={showLoginPassword ? "text" : "password"} placeholder="Enter your password" className="box" required value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                             <button type="button" className="password-toggle" onClick={() => setShowLoginPassword(!showLoginPassword)} aria-label={showLoginPassword ? "Hide password" : "Show password"}> {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />} </button>
                          </div>
                          <div className="remember"> <input type="checkbox" id="remember" checked={loginForm.rememberMe} onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}/> <label htmlFor="remember">Remember me</label> </div>
                          <button type="submit" className="btn">Login Now</button>
                          <div className="form-footer"> <Link to="/forgot-password" className="forgot-password" onClick={() => setShowAuthForm(false)}>Forgot password?</Link> <p>Don't have an account? <button type="button" className="switch-btn" onClick={switchToRegister}>Signup now</button></p> </div>
                       </form>
                    ) : (
                       <form className="auth-form register-form" onSubmit={handleRegister}>
                          <h3>Registration</h3>
                          <input type="text" placeholder="Enter your full name" className="box" required value={registerForm.fullName} onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })} />
                          <input type="tel" placeholder="Enter your mobile number" className="box" required value={registerForm.mobile} onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })} />
                          <input type="email" placeholder="Enter your email" className="box" required value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
                          <div className="password-input-container">
                             <input type={showRegisterPassword ? "text" : "password"} placeholder="Create a password (min 6 chars)" className="box" required value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} minLength="6" />
                             <button type="button" className="password-toggle" onClick={() => setShowRegisterPassword(!showRegisterPassword)} aria-label={showRegisterPassword ? "Hide password" : "Show password"}> {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />} </button>
                          </div>
                          <select className="box" required value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}> <option value="" disabled>Select Role</option> <option value="OWNER">Business Owner</option> <option value="USER">Customer</option> </select>
                          <div className="terms"> <input type="checkbox" id="terms" required checked={registerForm.acceptTerms} onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}/> <label htmlFor="terms">I accept all terms & conditions</label> </div>
                          <button type="submit" className="btn">Register Now</button>
                          <div className="form-footer"> <p>Already have an account? <button type="button" className="switch-btn" onClick={switchToLogin}>Login now</button></p> </div>
                       </form>
                    )}
                  </div>
                 )}
              </div>
            </div>
          </div>
        </nav>

        {/* --- Main Content Area (Routes) --- */}
        {/* Use React.Fragment or a div if needed to wrap Routes */}
        <Routes>
           {/* Pass necessary state/functions to HomePage */}
           <Route path="/" element={<HomePage />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/business/:id" element={<BusinessDetails shops={shops} />} />
           <Route path="/admin" element={<AdminDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
           <Route path="/user-list" element={<UserList />} />
           <Route path="/user" element={<UserDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
           <Route path="/owner" element={ <OwnerDashboard shops={shops} onDelete={handleDeleteShop} onAddShop={handleAddShop} onLogout={handleLogout} /> } />
           <Route path="/admin/categories" element={<CategoryList />} />
           <Route path="/owner/shops" element={<Shop />} />
           <Route path="/owner/shops/add" element={<AddShop />} />
           <Route path="/owner/shops/discount/:shopId" element={<Discount />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/forgot/verify-otp" element={<VerifyOtp />} />
           <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        {/* --- Footer --- */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section"> <h3>{t.footer.about}</h3> <p>{t.footer.aboutText}</p> </div>
            <div className="footer-section"> <h3>{t.footer.contact}</h3> <div className="contact-info"> <p><Phone size={16} /> +1 234 567 890</p> <p><Mail size={16} /> contact@localmarket.com</p> <p><MapPin size={16} /> 123 Market Street, City</p> </div> </div>
            <div className="footer-section"> <h3>{t.footer.follow}</h3> <div className="social-links"> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook"><Facebook size={20} /></a> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter"><Twitter size={20} /></a> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><Instagram size={20} /></a> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><Linkedin size={20} /></a> </div> </div>
          </div>
          <div className="footer-bottom"> <p>© {new Date().getFullYear()} Citi Offers. {t.footer.rights}</p> </div>
        </footer>

        {/* --- Scroll to Top Button --- */}
        {showScrollToTop && ( <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top"> <ArrowUp size={24} /> </button> )}
      </div>
    </ErrorBoundary>
  );
}


// --- CSS Styles (Keep existing styles from previous version) ---
const styles = `
/* PASTE ALL CSS FROM PREVIOUS VERSION HERE */

:root {
  --bg-color: white;
  --text-color: black;
  --primary-color: #007bff;
  --primary-hover-color: #0056b3;
  --secondary-color: #f8f9fa;
  --border-color: #ccc;
  --categories-open: 0; /* For sidebar transition */
}

[data-theme="dark"] {
  --bg-color: #222;
  --text-color: #eee;
  --secondary-color: #333;
  --border-color: #555;
}

body {
  background-color: var(--secondary-color); /* Use background for body */
  color: var(--text-color);
  margin: 0;
  font-family: sans-serif; /* Basic font */
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Ensure root element takes full height if needed for fixed elements */
#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#root > div { /* Direct child of #root */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
main { /* Assuming Routes are wrapped in main or similar */
    flex-grow: 1;
}


.navbar {
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  max-width: 1400px; /* Wider container */
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}

.mobile-menu-btn {
  display: none; /* Hide on desktop */
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem; /* Increased gap */
}

.nav-item {
  position: relative; /* For submenu positioning */
}

.nav-link {
  color: inherit;
  text-decoration: none;
  padding: 0.5rem 0;
  display: flex; /* For icon alignment */
  align-items: center;
  gap: 0.2rem;
  transition: color 0.3s ease;
}

.nav-link:hover, .submenu-link:hover {
  color: var(--primary-color); /* Highlight color on hover */
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--bg-color);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  min-width: 180px; /* Minimum width for dropdown */
  border-radius: 4px;
  z-index: 1001; /* Above navbar */
  border: 1px solid var(--border-color);
}

.nav-item:hover .submenu {
  display: block; /* Show submenu on hover */
}

.submenu-item {
  /* Styles for individual items if needed */
}

.submenu-link {
  display: block;
  padding: 0.6rem 1.2rem; /* More padding */
  color: var(--text-color);
  text-decoration: none;
  white-space: nowrap; /* Prevent wrapping */
  transition: background-color 0.2s ease, color 0.2s ease;
}

.submenu-link:hover {
  background-color: rgba(0,0,0,0.05); /* Subtle background on hover */
  color: var(--primary-hover-color);
}

[data-theme="dark"] .submenu-link:hover {
    background-color: rgba(255,255,255,0.1);
}

/* --- Search --- */
.search-container {
  position: relative; /* For dropdown positioning */
}
.search-wrapper {
  display: flex;
  align-items: center;
}
.search-bar {
  padding: 8px 35px 8px 12px; /* Space for icon */
  border: 1px solid var(--border-color);
  border-radius: 20px; /* Rounded */
  width: 250px; /* Adjust as needed */
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: var(--bg-color);
  color: var(--text-color);
}
.search-bar:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  outline: none;
}
.search-icon-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #777;
}
[data-theme="dark"] .search-icon-button {
    color: #aaa;
}
.search-icon-button:hover {
  color: var(--primary-color);
}
.search-dropdown {
  position: absolute;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 100%; /* Match search bar width */
  max-height: 300px;
  overflow-y: auto;
  z-index: 1005; /* High z-index */
  top: calc(100% + 5px); /* Position below search bar */
  left: 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.search-item, .search-item-more {
  padding: 10px 12px;
  cursor: pointer;
  color: var(--text-color);
}
.search-item:hover {
  background-color: rgba(0,0,0,0.05);
}
[data-theme="dark"] .search-item:hover {
    background-color: rgba(255,255,255,0.1);
}
.search-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.search-item-more {
    font-style: italic;
    color: #888;
    text-align: center;
}
[data-theme="dark"] .search-item-more {
    color: #aaa;
}

/* --- Right Controls --- */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.controls {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.theme-toggle, .lang-select, .login-btn, .logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0.3rem;
}
.theme-toggle:hover, .login-btn:hover {
  color: var(--primary-color);
}
.lang-select {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 6px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

/* --- Login/Auth --- */
.login-container {
  position: relative;
}
.auth-form-container {
  position: absolute;
  top: calc(100% + 10px); /* Position below button */
  right: 0;
  background: var(--bg-color);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 320px;
  z-index: 1010;
  border: 1px solid var(--border-color);
}
.auth-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    padding: 5px;
}
[data-theme="dark"] .auth-close-btn {
    color: #aaa;
}
.auth-close-btn:hover {
    color: #333;
}
[data-theme="dark"] .auth-close-btn:hover {
    color: #fff;
}

.auth-form {
  /* Styles already provided are mostly fine */
}
.auth-form h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-size: 1.6rem; /* Slightly larger */
}
.auth-form .box {
  width: 100%;
  padding: 0.8rem 1rem; /* More padding */
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box; /* Include padding in width */
  background-color: var(--bg-color);
  color: var(--text-color);
}
.auth-form .box:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2); /* Focus ring */
}
.password-input-container {
  position: relative;
  width: 100%;
  margin-bottom: 1rem; /* Consistent margin */
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
  color: #666;
}
[data-theme="dark"] .password-toggle {
    color: #aaa;
}
.auth-form .remember, .auth-form .terms {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-color);
}
.auth-form .btn {
  width: 100%;
  padding: 0.9rem; /* Slightly larger button */
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}
.auth-form .btn:hover {
  background: var(--primary-hover-color);
}
.form-footer {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
}
.form-footer .forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  display: block; /* Make it block */
  margin-bottom: 0.8rem; /* Space below */
}
.form-footer p {
  margin: 0.5rem 0;
}
.switch-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
}
.logout-btn {
    background-color: #dc3545; /* Red */
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}
.logout-btn:hover {
    background-color: #c82333; /* Darker red */
}

/* --- Slider, Categories, Shops --- */
.categories-toggle {
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 15px 5px;
    cursor: pointer;
    z-index: 998; /* Below navbar */
    transition: left 0.3s ease, background-color 0.3s ease;
}
.categories-toggle.active {
    left: 250px; /* Match category section width */
    background-color: rgba(0,0,0,0.8);
}
[data-theme="dark"] .categories-toggle {
    background-color: rgba(255,255,255,0.2);
}
[data-theme="dark"] .categories-toggle.active {
     background-color: rgba(255,255,255,0.4);
}


.categories-section {
    position: fixed;
    top: 0; /* Adjust if navbar is not sticky or has different height */
    left: -250px; /* Initially hidden */
    width: 250px;
    height: 100vh;
    background-color: var(--bg-color);
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    padding: 60px 1rem 1rem 1rem; /* Adjust top padding based on navbar height */
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 997; /* Below toggle */
    transition: left 0.3s ease, background-color 0.3s ease, color 0.3s ease;
    border-right: 1px solid var(--border-color);
}
.categories-section.active {
    left: 0; /* Slide in */
}
.categories-grid {
    display: grid;
    gap: 0.5rem;
}
.category-btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    border: 1px solid transparent; /* Base state */
    border-radius: 6px;
    background-color: transparent;
    color: var(--text-color);
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
    font-size: 1rem;
}
.category-btn:hover {
    background-color: rgba(0,0,0,0.05); /* Subtle hover */
}
[data-theme="dark"] .category-btn:hover {
    background-color: rgba(255,255,255,0.1);
}
.category-btn.active {
    background-color: rgba(0, 123, 255, 0.1); /* Light blue background */
    border-color: var(--primary-color); /* Blue border */
    color: var(--primary-color); /* Darker blue text */
    font-weight: 500;
}
[data-theme="dark"] .category-btn.active {
    background-color: rgba(0, 123, 255, 0.2);
}
.category-btn svg {
    flex-shrink: 0; /* Prevent icon shrinking */
}

.shops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 2rem; /* Default padding */
  transition: padding-left 0.3s ease; /* Smooth transition when categories open */
  margin-top: 1rem; /* Space below slider/header */
  flex-grow: 1; /* Make grid take available space */
}

/* Adjust shop grid padding when categories are open */
@media (min-width: 769px) { /* Only on larger screens */
    .shops-grid {
        /* Adjust padding based on whether the categories sidebar is active */
        padding-left: calc(2rem + (var(--categories-open) * (250px + 1.5rem))); /* Add sidebar width + gap */
    }
    /* This variable is set via JS */
}


.shop-card {
    background-color: var(--bg-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease, color 0.3s ease;
    border: 1px solid var(--border-color);
}
.shop-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.12);
}
[data-theme="dark"] .shop-card {
    box-shadow: 0 4px 10px rgba(255,255,255,0.05);
    border-color: #444;
}
[data-theme="dark"] .shop-card:hover {
     box-shadow: 0 8px 15px rgba(255,255,255,0.08);
}

.shop-image {
    width: 100%;
    height: 200px; /* Fixed height */
    overflow: hidden;
    background-color: #eee; /* Background for loading/error state */
}
[data-theme="dark"] .shop-image {
    background-color: #444;
}
.shop-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the area */
    display: block;
}
.shop-content {
    padding: 1rem;
    flex-grow: 1; /* Allow content to grow */
}
.shop-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: var(--text-color);
}
.shop-content p {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 0.8rem;
    line-height: 1.4;
}
.shop-rating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: #fadb14; /* Gold color for stars */
}
.shop-rating span {
    margin-left: 0.3rem;
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
    font-weight: 500;
}
.shop-rating svg {
    /* Fill handled by className */
}
/* Ensure filled class applies fill */
.shop-rating svg.filled {
    fill: currentColor !important;
}


/* --- Pagination --- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  gap: 0.5rem;
}
.pagination-btn, .page-number {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}
.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.pagination-btn:not(:disabled):hover, .page-number:hover {
  background-color: rgba(0,0,0,0.05);
}
[data-theme="dark"] .pagination-btn:not(:disabled):hover,
[data-theme="dark"] .page-number:hover {
  background-color: rgba(255,255,255,0.1);
}
.page-number.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  font-weight: bold;
}
.pagination-numbers {
    display: flex;
    gap: 0.3rem;
}

/* --- Footer --- */
.footer {
  background-color: var(--bg-color); /* Match navbar */
  color: var(--text-color);
  padding: 2rem 1rem 1rem 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto; /* Push footer down */
  transition: background-color 0.3s ease, color 0.3s ease;
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 1.5rem auto;
}
.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.9;
}
.contact-info p, .social-links a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  color: var(--text-color);
  opacity: 0.8;
  text-decoration: none;
  transition: color 0.2s ease;
}
.social-links {
  display: flex;
  gap: 1rem;
}
.social-links a:hover {
  color: var(--primary-color);
}
.footer-bottom {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
}

/* --- Scroll-to-top --- */
.scroll-to-top {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s, background-color 0.3s;
  z-index: 999;
}
.scroll-to-top:hover {
  background-color: #555;
}
[data-theme="dark"] .scroll-to-top {
    background-color: #555;
}
[data-theme="dark"] .scroll-to-top:hover {
    background-color: #777;
}

/* --- Loading Spinner --- */
.loading-spinner {
  display: flex;
  flex-direction: column; /* Stack spinner and text */
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem; /* More padding */
  min-height: 300px; /* Ensure it takes some space */
  text-align: center;
  color: var(--text-color);
  opacity: 0.8;
  flex-grow: 1; /* Allow spinner section to grow */
}
.spinner {
  border: 5px solid rgba(0,0,0,0.1); /* Thicker border */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: var(--primary-color); /* Use primary color */
  animation: spin 1s linear infinite; /* Changed timing function */
  margin-bottom: 1rem; /* Space between spinner and text */
}
[data-theme="dark"] .spinner {
    border: 5px solid rgba(255,255,255,0.1);
    border-left-color: var(--primary-color);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- Error Fallback --- */
.error-fallback {
  padding: 2rem;
  margin: 2rem;
  text-align: center;
  background-color: #f8d7da; /* Light red */
  color: #721c24; /* Dark red */
  border: 1px solid #f5c6cb; /* Red border */
  border-radius: 8px;
}
.error-fallback h2 {
  color: #721c24;
}
.error-fallback button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.error-fallback button:hover {
    background-color: #c82333;
}

/* --- Mobile Responsiveness --- */
@media (max-width: 992px) {
    .nav-container {
        padding: 0.8rem 1rem;
    }
    .search-bar {
        width: 180px; /* Smaller search bar */
    }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block; /* Show hamburger */
    z-index: 1002; /* Above mobile menu */
  }
  .nav-menu {
    display: flex; /* Keep flex for transform */
    position: fixed;
    top: 0;
    left: 0; /* Changed from right to left */
    width: 280px; /* Fixed width */
    height: 100%;
    background-color: var(--bg-color);
    flex-direction: column;
    align-items: flex-start; /* Align items left */
    padding: 60px 1rem 1rem 1rem; /* Space for logo/close button */
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    transform: translateX(-100%); /* Start off-screen left */
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    gap: 0.5rem; /* Tighter gap */
    border-right: 1px solid var(--border-color);
  }
  .nav-menu.active {
    transform: translateX(0); /* Slide in */
  }
  .nav-item {
    width: 100%; /* Full width items */
  }
  .nav-link {
    padding: 0.8rem 0;
    width: 100%;
  }
  .submenu { /* Adjust submenu for mobile */
    position: static; /* Not absolute */
    display: block; /* Always visible if parent hovered/active */
    box-shadow: none;
    padding-left: 1rem; /* Indent submenu items */
    border-left: 2px solid var(--border-color); /* Indicate hierarchy */
    margin-top: 0.5rem;
    background: none;
    border-radius: 0;
    border: none;
  }
  .nav-item:hover .submenu {
     /* Disable hover effect on mobile, rely on click/state */
  }
  .submenu-link {
    padding: 0.6rem 0;
  }
  .search-container {
     width: 100%;
     padding: 1rem 0;
  }
   .search-wrapper {
     width: 100%;
   }
  .search-bar {
     width: 100%; /* Full width on mobile */
  }
  .search-dropdown { /* Adjust dropdown for mobile */
      position: static; /* Or adjust relative positioning */
      width: 100%;
      margin-top: 5px;
      box-shadow: none;
      border-top: 1px solid var(--border-color);
  }

  .nav-right {
      /* Adjust spacing if needed */
  }
  .controls {
    gap: 0.5rem; /* Tighter controls */
  }
  .auth-form-container { /* Make auth form a modal */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 350px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.25);
  }

  .categories-toggle { /* Adjust toggle position/size */
      padding: 12px 4px;
      /* Ensure toggle stays visible even if content scrolls */
      z-index: 999; /* Above category section */
  }
  .categories-section { /* Ensure category panel works */
      width: 220px; /* Slightly smaller panel */
      left: -220px;
      padding-top: 60px; /* Adjust for navbar */
  }
  .categories-toggle.active {
      left: 220px;
  }

  .shops-grid {
     padding: 1rem; /* Adjust padding */
     /* Reset desktop padding override */
     padding-left: 1rem !important;
     grid-template-columns: 1fr; /* Single column on small screens */
  }
  .footer-content {
      grid-template-columns: 1fr; /* Stack footer sections */
      text-align: center;
  }
   .contact-info p, .social-links {
       justify-content: center;
   }
}


/* --- Add other necessary styles --- */
.heart-icon.filled {
    fill: #ff4d4f; /* Example fill color for filled heart */
    color: #ff4d4f;
}

`;

// Inject styles (ensure this runs once)
if (!document.getElementById('app-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'app-styles';
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default App;