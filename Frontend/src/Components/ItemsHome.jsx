import React, { useEffect, useState } from 'react'
import { itemsHomeStyles } from '../assets/dummyStyles'
import BannerHome from './BannerHome'
import { useNavigate } from 'react-router-dom'
import { FaThList } from 'react-icons/fa'
import {categories} from '../assets/dummyData'
import { useCart } from '../CartContext'
import { act } from 'react'

  const ItemsHome = () => {
    const [activeCategory, setActiveCategory] = useState(() => {
    return localStorage.getItem('activeCategory') || 'All';
  });


    useEffect(()=>{
      localStorage.setItem('activeCategory',activeCategory)
    },[activeCategory])

    const navigate = useNavigate()
    const{cart} = useCart()
    const[searchTerm,setsearchTerm] = useState('')

    const handleSearch = (term) => {
      setsearchTerm(term);
    }


    //CREATE A SIDEBAR CATEGORY
    const sidebarCategories = [
      {
        name: "All Items",
        icon: <FaThList className='text-lg'/>,
        value: "All"
      },
      ...categories
];


  return (
    <div className={itemsHomeStyles.page}>
      <BannerHome onSearch={handleSearch}/>

      <div className='flex flex-col lg:flex-row flex-1'>
        <aside className={itemsHomeStyles.sidebar}>
          <div className={itemsHomeStyles.sidebarHeader}>
            <h1 
            style={{
              fontFamily:" 'Playfair Display', serif ",
              textShadow: " 2px 2px 4px rgba(0,0,0,0.2) "
            }}
            className={itemsHomeStyles.sidebarTitle}>
                FreshCart
            </h1>
            <div className={itemsHomeStyles.sidebarDivider}/>
          </div>

          <div className={itemsHomeStyles.categoryList}>
            <ul className='space-y-3'>
              {sidebarCategories.map((category) => {
                return(                <li key ={category.name}>
                  <button onClick={ () =>{
                    setActiveCategory(category.value || category.name)
                    setsearchTerm('')
                  }}
                  
                  className={`${itemsHomeStyles.categoryItem}
                  ${(activeCategory === (category.value || category.name)) && !searchTerm ? itemsHomeStyles.activeCategory :itemsHomeStyles.inactiveCategory}`}>
                    <div className={itemsHomeStyles.categoryIcon}>
                      {category.icon}
                    </div>
                    <span className={itemsHomeStyles.categoryName}>{category.name}</span>
                  </button>
                </li>
                );
              })}
            </ul>
          </div>
        </aside>
        {/* MAIN CONTENT */}
        <main className={itemsHomeStyles.mainContent}>
          {/* MOBILE CATEGORY SCROLL */}
          <div className={itemsHomeStyles.mobileCategories}>
            <div className='flex space-x-4'>
              {sidebarCategories.map((cat) => (
                <button
                 key={cat.name} 
                 onClick={() =>{
                  setActiveCategory(cat.value || cat.name)
                  setsearchTerm('')
                }} 
                className={`${itemsHomeStyles.mobileCategoryItem} ${
                  activeCategory === (cat.value || cat.name) && !searchTerm 
                  ? itemsHomeStyles.activeMobileCategory 
                  : itemsHomeStyles.inactiveMobileCategory
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          {/* SEARCH RESULT */}
          {searchTerm && (
            <div className={itemsHomeStyles.searchResults}>
              <div className='flex items-center justify-center'>
                 <span className='text-emerald-700 font-medium'>
                  Search results for : <span className='font-bold'>"{searchTerm}"</span>
                 </span>

                  <button onCanPlay={() => setsearchTerm('')} className='ml-4 text-emerald-500 hover:text-shadow-emerald-700 p-1 rounded-b-full transition-colors'>
                    <span className='text-sm bg-emerald-100 px-2 py-1 rounded-b-full'>Clear</span>
                  </button>
              </div>
            </div>
          )}
          {/* SECTION TITLE */}
          <div className='text-center mb-6'>
              <h2 className={itemsHomeStyles.sectionTitle}
              style={{
                fontFamily:"'playfair Display', serif"
              }}
              >
                {searchTerm ? "Search Results"
                : (activeCategory === "ALL" ? 'Feature Product' : `Best ${activeCategory}`)} 
              </h2>
          </div>
        </main> 
      </div>
    </div>
  )
}

export default ItemsHome
