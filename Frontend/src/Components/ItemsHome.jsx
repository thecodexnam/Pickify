import React, { useState } from 'react'
import { itemsHomeStyles } from '../assets/dummyStyles'
import BannerHome from './BannerHome'

const ItemsHome = () => {
    const[search,setsearch] = useState('')

    const handleSearch = (term) =>{
        setsearch(term)
    }

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
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ItemsHome
