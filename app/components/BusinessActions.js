'use client'

import React from 'react'
import { FaShare, FaAddressCard } from 'react-icons/fa'

export default function BusinessActions({ business }) {
  const createVCF = async () => {
    let photoData = '';
    if (business.logo_url) {
      try {
        const response = await fetch(business.logo_url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        photoData = btoa(String.fromCharCode.apply(null, uint8Array));
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    }

    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${business.name}
ORG:${business.name}
TEL:${business.phone_number || ''}
EMAIL:${business.email || ''}
ADR:;;${business.address || ''}
URL:${business.website_url || ''}
NOTE:${business.description || ''}
${photoData ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoData}\n` : ''}${business.instagram_link ? `X-SOCIALPROFILE;TYPE=instagram:${business.instagram_link}\n` : ''}${business.youtube_link ? `X-SOCIALPROFILE;TYPE=youtube:${business.youtube_link}\n` : ''}${business.facebook_link ? `X-SOCIALPROFILE;TYPE=facebook:${business.facebook_link}\n` : ''}${business.pinterest_link ? `X-SOCIALPROFILE;TYPE=pinterest:${business.pinterest_link}\n` : ''}END:VCARD`

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