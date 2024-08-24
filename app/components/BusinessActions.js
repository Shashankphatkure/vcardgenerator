'use client'

import React from 'react'
import { FaShare, FaAddressCard } from 'react-icons/fa'

export default function BusinessActions({ business }) {
  const createVCF = () => {
    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${business.name}
ORG:${business.name}
TEL:${business.phone_number}
EMAIL:${business.email}
ADR:;;${business.address}
URL:${business.website_url}
END:VCARD`

    const blob = new Blob([vcf], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${business.name}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <button onClick={() => navigator.share({title: business.name, url: window.location.href})} className="flex items-center bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md">
        <FaShare className="mr-2" /> Share
      </button>
      <button onClick={createVCF} className="flex items-center bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-md">
        <FaAddressCard className="mr-2" /> Add to Contacts
      </button>
    </>
  )
}