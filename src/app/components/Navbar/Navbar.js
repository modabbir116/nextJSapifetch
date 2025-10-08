import React from 'react'
import Container from '../Layouts/Container.js'
import Link from 'next/link.js'


const Navbar = () => {
  return (
    <div className='bg-black text-white py-8'>
       <Container>
        <div className='flex justify-between items-center'>
            <div> <h1 className='text-2xl font-bold'><a href='#'>LOGO</a></h1></div>
            <div>
                <ul className='flex gap-x-10 text-[18px] font-medium'>
                  <li><Link href="#">Home</Link></li>
                  <li><Link href="#">About</Link></li>
                  <li><Link href="#">Gellery</Link></li>
                  <li><Link href="#">Contact</Link></li>
                </ul>
            </div>
        </div>
       </Container>
    </div>
  )
}

export default Navbar
