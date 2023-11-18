
import { Fragment, useState } from 'react'


export default function Header() {

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">App Name</span>
          </a>
        </div>
        <div className='flex justify-between gap-2'>
          <a href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
           Profile
          </a>
          <a href="/data" className="text-sm font-semibold leading-6 text-gray-900">
            Data
          </a>
          
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{
            localStorage.removeItem("uuid")
          }}>
            Log Out <span aria-hidden="true">&rarr;</span>
          </a>
          </div>
        </div>
      </nav>
             </header>
  )
}
