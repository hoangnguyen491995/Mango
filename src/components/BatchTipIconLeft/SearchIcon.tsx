import React, { useState } from 'react'

function SearchIcon() {
    const [isOnClickSearch, setIsOnClickSearch] = useState(false)
  return (
    <div>
    <div className="flex justify-center items-center  rounded-lg bg-white relative">
      { isOnClickSearch && <input className="search-input rounded-l-lg text-ms h-9 text-blue-500 
      outline-none -mr-3 focus:outline-none:focus transition transform"  
      type="search" autoComplete="off" spellCheck="false" aria-live="polite" placeholder="Search...">

      </input>}
      <div className="search-icon bg-mango-primary-blue hover:bg-cyan-300 text-white px-4 py-3 rounded-lg 
      relative z-10 shadow-md"
      onClick={() => {setIsOnClickSearch(true) }}
      onDoubleClick={() => {setIsOnClickSearch(false) }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
           12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
            15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
             12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
              6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
               1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" 
               stroke="white" strokeWidth="2" 
               strokeLinecap="round"
               strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    </div>
  )
}

export default SearchIcon