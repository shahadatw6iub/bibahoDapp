import AppointMarriage from '@/components/Appointmarriage'
import Footer from '@/components/Footer'
import Link from 'next/link';
import React from 'react'

function page() {
  return (
      <main>
          <div>
              <AppointMarriage/>
          </div>
          <Footer/>
      </main>
      
  )
}

export default page