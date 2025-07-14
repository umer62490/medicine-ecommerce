import { Link } from "react-router-dom";
import React,{useState, useEffect,useRef} from 'react'
// import LogoImage from '../assets/medicine-web-logo.png'
import MainLogo from './assets/main-medi-logo.png'
import { useNavigate } from "react-router-dom";
import { CodeIcon, HamburgerMenuClose, HamburgerMenuOpen } from "./Icons";
import shoppingCart from './assets/shopping-bagg.png'
import Search from './assets/search.png'
import Speech from './assets/microphone.png'
import SkinCreams from './assets/skin-creams.png'
import PowderMilk from './assets/powdermilk.png'
import SkinWhite from './assets/skinWhite-creams.png'
import Medicine from './assets/medicine.png'
import PersonalCare from './assets/personal-care.png'
import Injection from './assets/injection.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InjCategory from './assets/injection-category.png'
import PersonalCareCategory from './assets/personal-care-category.png'
import CreamCategory from './assets/cream-category.png'
import PowderMilkCategory from './assets/powder-milk-category.png'
import MedicineCategory from './assets/medicine-categories.png'
import Reckitt from './assets/reckitt.png'
import Hilton from './assets/hilton.png'
import Abbott from './assets/abbottt.png'
import Getz from './assets/getz.png'
import Searle from './assets/searle.png'
import GSK from './assets/gskkkk.png'
import Highnoon from './assets/highnoonn.png'
import Pfizer from './assets/pfizer.png'
import Agp from './assets/agp.png'
import MartinDow from './assets/martin-dow.png'
import FerozSons from './assets/ferozsons.png'
import Sami from './assets/sami.png'
import Mothercare from './assets/mothercare.png'
import Facebook from './assets/facebook-logo.png'
import Instagram from './assets/instagram-logo.png'
import './Home.css';
import Modal from 'react-modal';
import axios from "axios";
import { useSelector } from 'react-redux';

const images = [
    SkinCreams,   // ✅ Direct variable
    SkinWhite,
    PowderMilk,
   Medicine,
    PersonalCare,
    Injection,
  ];

  
  const categories = [
    {
      name: "Medicine",
      image: MedicineCategory,
    },
    {
      name: "Creams",
      image: CreamCategory,
    },
    {
      name: "Personal Care",
      image: PersonalCareCategory,
    },
    {
      name: "Powder Milk",
      image: PowderMilkCategory,
    },
    {
      name: "Injection",
      image: InjCategory,
    },
  ];

  
  const brands = [
    { id: 1, name: "Reckitt", image: Reckitt },
    { id: 2, name: "Hilton", image: Hilton },
    { id: 3, name: "Abbott", image: Abbott },
    { id: 4, name: "Getz", image: Getz },
    { id: 5, name: "Highnoon", image: Highnoon },
    { id: 6, name: "GSK", image: GSK },
    { id: 7, name: "Searle", image: Searle },
    {id:8, name:'Pfizer', image: Pfizer},
    {id:9, name:'AGP', image: Agp},
    {id:10, name:'Martin Dow', image: MartinDow},
    {id:11, name:'FerozSons', image: FerozSons},
    {id:12, name:'Sami', image: Sami},
    {id:13, name:'Mothercare', image: Mothercare},
    
  
  ];
  
  


const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState(""); // Initially empty
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [click, setClick] = useState(false);

  const [visibleSections, setVisibleSections] = useState(new Set());
 
  const sectionRefs = useRef([]);

  const handleClick = () => setClick(!click);

  // const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState({});


  const cartItems = useSelector((state) => state.cart.items);
  console.log('cartItems:', cartItems);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

// Scroll to open modal
useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const halfPage = document.documentElement.scrollHeight / 2;

      if (scrollPosition >= halfPage) {
        setIsModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const handleAdminLogin = (e) => {
    e.preventDefault();
    const fixedEmail = "admin@example.com";
    const fixedPassword = "admin123";

    if (adminEmail === fixedEmail && adminPassword === fixedPassword) {
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/categories");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

 // Fetch products on category selection
 useEffect(() => {
  if (selectedCategory) {
    axios.get(`http://localhost:5000/products/${selectedCategory}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }
}, [selectedCategory]);



const handleProductAdd = (product) => {
  setProductsByCategory(prev => {
    const categoryProducts = prev[product.category] || [];
    return {
      ...prev,
      [product.category]: [...categoryProducts, product]
    };
  });
};



const closeModal = () => {
    setIsModalOpen(false);
    setShowLoginForm(false);
    setIsSignup(false);
    setIsAdminLogin(false);
    setAdminEmail("");
    setAdminPassword("");
  };


// Add product to cart
const addToCart = (product) => {
  setCart([...cart, product]);
};
  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto Slide Every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      swipe: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          setVisibleSections((prevVisibleSections) => {
            const newVisibleSections = new Set(prevVisibleSections);
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                newVisibleSections.add(entry.target.dataset.id);
              } else {
                newVisibleSections.delete(entry.target.dataset.id);
              }
            });
            return newVisibleSections;
          });
        },
        { threshold: 0.3 } // 30% visible hone pe effect trigger hoga
      );
  
      sectionRefs.current.forEach((section) => {
        if (section) observer.observe(section);
      });
  
      return () => {
        sectionRefs.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    }, []);
  




    
  return (
    <div>

<Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Login/Signup Modal"
      overlayClassName="custom-modal-overlay"
      className="custom-modal-content"
    >
      {!showLoginForm && !isAdminLogin ? (
        <>
          <h2 className="modal-heading">Continue As</h2>
          <button className="modal-button" onClick={() => setIsAdminLogin(true)}>
            Continue as Admin
          </button>
          <button className="modal-button user-button" onClick={() => setShowLoginForm(true)}>
            Continue as User
          </button>
          <button className="close-button" onClick={closeModal}>Close</button>
        </>
      ) : isAdminLogin ? (
        <>
          <h2 className="modal-heading">Admin Login</h2>
          <form className="modal-form-wrapper" onSubmit={handleAdminLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              className="modal-input"
              autoComplete="off"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              className="modal-input"
              autoComplete="off"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            <button type="submit" className="modal-button user-button">Login</button>
          </form>
          <button className="close-button" onClick={closeModal}>Close</button>
        </>
      ) : !isSignup ? (
        <>
          <h2 className="modal-heading">Login</h2>
          <form className="modal-form-wrapper" >
            <input type="email" autoComplete="off" placeholder="Email" className="modal-input" />
            <input type="password" autoComplete="off" placeholder="Password" className="modal-input" />
            <button type="submit" className="modal-button user-button">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <span onClick={() => setIsSignup(true)} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span>
          </p>
          <button className="close-button" onClick={closeModal}>Close</button>
        </>
      ) : (
        <>
          <h2 className="modal-heading">Signup</h2>
          <form className="modal-form-wrapper"> 
            <input type="text" autoComplete="off" placeholder="Name" className="modal-input" />
            <input type="email" autoComplete="off" placeholder="Email" className="modal-input" />
            <input  type="password" autoComplete="off" placeholder="Password" className="modal-input" />
            <button type="submit" className="modal-button user-button">Signup</button>
          </form>
          <p className="signup-text">
            Already have an account? <span onClick={() => setIsSignup(false)} style={{ cursor: 'pointer', color: 'blue' }}>Login</span>
          </p>
          <button className="close-button" onClick={closeModal}>Close</button>
        </>
      )}
    </Modal>

    <header className={`fade-section ${visibleSections.has("header") ? "visible" : "hidden"}`} ref={(el) => (sectionRefs.current[0] = el)} data-id="header" >

    <nav className="navbar">
          <div className="nav-container">
          <div className='nav-logo'>
          <img style={{width:'110px'}} src={MainLogo} alt=""/>
     
     </div>
  
     <div className="input-field" style={{ position: "relative", display: "inline-block" }}>
    <input 
      style={{
        width: "300px",
        height: "40px",
        padding: "10px 40px 10px 10px", // Right padding to make space for icons
        background: "lightgrey",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px"
      }}
      placeholder="Enter product name..."
    />
    <img className="input-search"
      src={Search}
      alt="search"
      style={{
        position: "absolute",
        right: "35px", // Adjust this value to move icon
        top: "50%",
        transform: "translateY(-50%)",
        width: "20px",
        height: "20px",
        cursor: "pointer"
      }}
    />
    <img className="input-speech"
      src={Speech}
      alt="speech"
      style={{
        position: "absolute",
        right: "10px", // Adjust this value for proper spacing
        top: "50%",
        transform: "translateY(-50%)",
        width: "20px",
        height: "20px",
        cursor: "pointer"
      }}
    />
  </div>
  
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  to="/about"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  to="/blog"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  to="/feedback"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Feedback
                </Link>
              </li>
              <li className="nav-item shopping-cart-container">
      <div className="nav-links">
        <img style={{ width: '50px' }} src={shoppingCart} alt="cart" />
        {totalQuantity > 0 && (
          <div className="cart-badge">
            {totalQuantity} | Rs. {totalPrice}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-dropdown">
          <h4>Total: Rs. {totalPrice}</h4>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} width="40" />
              <div>
                <span>{item.name}</span>
                <p>Qty: {item.quantity}</p>
                <p>Subtotal: Rs. {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </li>

            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
  
              {click ? (
                <span className="icon">
                <HamburgerMenuClose />
                  
                </span>
              ) : (
                <span className="icon">
                <HamburgerMenuOpen />{" "}
                </span>
              )}
            </div>
          </div>
  
          
        </nav>
  
       
       
      
     </header>
  
     <div className={`slider-container fade-section ${visibleSections.has("slider") ? "visible" : "hidden"}`} ref={(el) => (sectionRefs.current[1] = el)} data-id="slider">
        <div className="slider">
          {images.map((image, index) => {
            let className = "inactive";
  
            if (index === currentIndex) {
              className = "active"; // Center Image
            } else if (
              index === (currentIndex - 1 + images.length) % images.length
            ) {
              className = "prev"; // Previous Image (Half Visible)
            } else if (
              index === (currentIndex + 1) % images.length
            ) {
              className = "next"; // Next Image (Half Visible)
            }
  
            return (
              <img key={index} src={image} alt={`Slide ${index}`} className={className} />
            );
          })}
        </div>
  
      
      </div>
  
      <div className={`category-slider-container fade-section ${visibleSections.has("categories") ? "visible" : "hidden"}`} 
       ref={(el) => (sectionRefs.current[2] = el)} data-id="categories">
      <h2 className="slider-title">Product Categories</h2>
      <Slider {...settings}>
          {categories.map((item, index) => (
              <div 
                  key={index} 
                  className="slide-item" 
                  onClick={() => navigate(`/category/${item.name}`)}  // 👈 Navigate to new page
                  style={{ cursor: "pointer" }}
              >
                  <div className="slide-box">
                      <img src={item.image} alt={item.name} className="slide-image" />
                      <h3 className="slide-text">{item.name}</h3>
                  </div>
              </div>
          ))}
      </Slider>
      
  </div>
  
  
          <div className="brand-slider">
        <h2 className="brands">Brands</h2>
        <div className="brand-slide">
          <div className="slider-track">
            {brands.concat(brands).map((brand, index) => (
              <div key={index} className="slide">
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
  
      <footer className={`footer fade-section ${visibleSections.has("footer") ? "visible" : "hidden"}`} ref={(el) => (sectionRefs.current[3] = el)} data-id="footer">
        <div className="footer-container">
          
          {/* First Column - Logo & Social Media */}
          <div className="footer-column">
            <img className="footer-logo" src={MainLogo} alt=""/>
            <p>Follow Us</p>
            <div className="social-icons">
             <img className="social-icons" src={Facebook} alt=""/>
             <img className="social-icons" src={Instagram} alt=""/>
            </div>
          </div>
  
          {/* Second Column - Categories */}
          <div className="footer-column">
            <h3>Categories</h3>
            <ul>
              <li><a href="#">Medicines</a></li>
              <li><a href="#">Milk</a></li>
              <li><a href="#">Injections</a></li>
              <li><a href="#">Creams</a></li>
              <li><a href="#">Personal Care</a></li>
            </ul>
          </div>
  
          {/* Third Column - Navigation */}
          <div className="footer-column">
            <h3>Navigate</h3>
            <ul>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Brands</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </div>
  
          {/* Fourth Column - Support */}
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Services</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
  
          {/* Fifth Column - Contact */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>📞 +92 332 2845831</p>
            <p>📧 umer62490@gmail.com</p>
          </div>
  
        </div>
      </footer>
  
      </div>
    )
  
}

export default Home
