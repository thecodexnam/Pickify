import React, { useRef, useState } from 'react'
import {cartStyles, navbarStyles } from '../assets/dummyStyles'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navItems } from '../assets/Dummy'
import { FiMenu, FiUser, FiX } from 'react-icons/fi'
import { useCart } from '../CartContext'
import { FaOpencart } from 'react-icons/fa'


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {cartCount} = useCart()

    const[scrolled,setScrolled] = useState(false)
    const [activeTab, setActiveTab] = useState(location.pathname)
    const [isOpen,setIsOpen] = useState(false)
    const [cartBounce,setCartBounce] = useState(false)
    const PrevCartCountRef = useRef(cartCount)

    const [isLoggedIn,setIsLoggedIn] = useState(
      Boolean(localStorage.getItem('authToken'))
    )

    const mobileMenuRef = useRef(null)

    // DEFINE LOGOUT FUNCTION
    const handleLogout = ()=>{
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData')
      localStorage.clear()
      window.dispatchEvent(new Event('authStateChanged'))
      navigate('/')
    }

    // Add scroll event listener
    React.useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            if(offset > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

  return (
    <nav className={`${navbarStyles.nav} ${scrolled ? navbarStyles.scrolled : navbarStyles.unscrolledNav}`}>
        <div className={navbarStyles.borderGradient}/>
        <div className={navbarStyles.particlesContainer }>
            <>
      <div
        className={`${navbarStyles.particle} w-24 h-24 bg-emerald-500/5 -top-12 left-1/4 ${navbarStyles.floatAnimation}`}
      />
      <div
        className={`${navbarStyles.particle} w-32 h-32 bg-green-500/5 -bottom-16 left-2/3 ${navbarStyles.floatSlowAnimation}`}
      />
      <div
        className={`${navbarStyles.particle} w-16 h-16 bg-teal-500/5 -top-8 left-3/4 ${navbarStyles.floatSlowerAnimation}`}
      />
    </>
        </div>
        {/* Logo */}
        <div className={navbarStyles.container}>
            <div className={navbarStyles.innerContainer}>
                <div className={navbarStyles.innerContainer}>
                    <Link to ='/' className={navbarStyles.logoLink}>
                        <img src={logo} alt="Pickify" className={`${navbarStyles.logoImage} ${scrolled ? 'h-10 w-10' : 'h-12 w-12'} transition-all`} />
                        <span className={navbarStyles.logoText}>Pickify</span>
                    </Link>
                </div>
                
                    {/* DESKTOP NAVIGATION */}
                    <div className={navbarStyles.desktopNav}>
                        {navItems.map(item => (
                          <Link key ={item.name} to={item.path}
                          className={`${navbarStyles.navItem}
                          ${activeTab === item.path ?
                             navbarStyles.activeNavItem:
                             navbarStyles.inactiveNavItem}`}>

                            <div className='flex items-center'>
                              <span className={`${navbarStyles.navIcon} ${activeTab === item.path ? navbarStyles.activeNavIcon : navbarStyles.inactiveNavIcon}`} >
                                {item.icon}
                              </span>
                              <span>{item.name}</span>
                            </div>
                              <div className={`${navbarStyles.navIndicator}
                              ${activeTab === item.path ? navbarStyles.activeIndicator : navbarStyles.inactiveIndicator}`} />
                          </Link>
                        ))}
                    </div>

                    {/* MOBILE HAMBURGER*/}
                    <div className={navbarStyles.iconsContainer}>
                        {isLoggedIn ?(
                          <button onClick={handleLogout} className={navbarStyles.loginLink} aria-label='Logout'>
                            <FiUser className={navbarStyles.loginIcon}/>
                            <span className='ml-1 text-white'>Logout</span>
                          </button>
                        ) : (
                          <Link to='/login' className={navbarStyles.loginLink} aria-label='Login'>
                            <FiUser className={navbarStyles.loginIcon}/>
                            <span className='ml-1 text-white'>Login</span>
                          </Link>
                        )}
                        <Link to='/cart' className={navbarStyles.cartLink}>
                            <FaOpencart
                             className={`${navbarStyles.cartIcon} ${cartBounce ? 'animate-bounce' : ''}`} />
                            {cartCount > 0 && (
                              <span className={navbarStyles.cartBadge}>
                                {cartCount}
                              </span>
                            )}
                        </Link>

                        <button onClick={()=> setIsOpen(!isOpen)} className={navbarStyles.hamburgerButton} aria-label={isOpen ? 'Close menu' : 'Open menu'} >
                          {isOpen ? (
                            <FiX className=' h-6 w-6 text-white'/>
                          ) : (
                            <FiMenu className='h-6 w-6 text-white' />
                          )}
                        </button>

                    </div>
            </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
      <div
      className={`${navbarStyles.mobileOverlay} 
        ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
          fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300'}`}
      onClick={() => setIsOpen(false)}
      >
      <div
        ref={mobileMenuRef}
        onClick={(e) => e.stopPropagation()}
        className={`${navbarStyles.mobilePanel} 
          transform transition-transform duration-300 will-change-transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            fixed right-0 top-0 bottom-0 z-50 w-4/5 max-w-sm`}
      >
        {/* Header */}
        <div className={`${navbarStyles.mobileHeader} relative flex items-center gap-3 p-4 border-b`}>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Pickify Logo" className="h-7 w-7 object-contain" />
            <span className={`${navbarStyles.mobileLogoText}`}>Picify</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className={`${navbarStyles.closeButton} absolute right-3 top-3 p-2`}
            aria-label="Close Menu"
          >
            <FiX className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Items */}
        <div className={`${navbarStyles.mobileItemsContainer} flex flex-col p-2`}>
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${navbarStyles.mobileItem} transition-opacity duration-300`}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: `translateX(${isOpen ? 0 : 20}px)`,
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className={navbarStyles.mobileItemIcon}>{item.icon}</span>
              <span className={navbarStyles.mobileItemText}>{item.name}</span>
            </Link>
          ))}
          <div className={navbarStyles.mobileButtons}>
            {isLoggedIn ? (
              <button onClick={() =>{
                handleLogout();
                setIsOpen(false)
              }}
              className={navbarStyles.loginButton}>
                <FiUser className={navbarStyles.loginButtonIcon}/>
                Logout
              </button>
            ) : (
              <Link to ='/login' className={navbarStyles.loginButton} onClick={() => setIsOpen(false)}>
                <FiUser className={navbarStyles.loginButtonIcon}/>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
