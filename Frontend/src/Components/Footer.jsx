import React from 'react'
import { footerStyles } from '../assets/dummyStyles'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {

    const socialLinks = [
    { 
      icon: FaFacebookF, 
      url: 'https://www.facebook.com/' 
    },
    { 
      icon: FaTwitter, 
      url: 'https://twitter.com/' 
    },
    { 
      icon: FaInstagram, 
      url: 'https://www.instagram.com/' 
    },
    { 
      icon: FaYoutube, 
      url: 'https://www.youtube.com/' 
    }
  ];

  return (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.topBorder}/>

        <div className={`${footerStyles.floatingShape} -top-24 -right-24 w-80 h-80 opacity-20`}></div>
        <div className={`${footerStyles.floatingShape} -bottom-40 -left-24 w-96 h-96 opacity-15 animation-delay-2000`}></div>
        <div className={`${footerStyles.floatingShape} top-1/4 left-1/3 w-64 h-64 bg-emerald-600 opacity-10 animate-pulse animation-delay-1000`}></div>

        <div className={footerStyles.container}>
          <div className={footerStyles.grid}>
            {/* BRAND */}
            <div>
              <h2 className={footerStyles.brandTitle}>
                Pick<span className={footerStyles.brandSpan}>ify</span>
              </h2>
              <p className={footerStyles.brandText}>
                Bringing uou the freshest organic produce since 2020. Our mission is to delivers farm-fresh goodness straight to your doorsteps.
              </p>

              <div className='space-x-3 flex'>
                { socialLinks.map((social,idx) =>(
                  <a href={social.url} key={idx} target='_blank' aria-label={`Visit our ${social.icon.name.replace('Fa','')} page`} className={footerStyles.socialLink}>
                    <social.icon className={footerStyles.socialIcon}></social.icon>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer