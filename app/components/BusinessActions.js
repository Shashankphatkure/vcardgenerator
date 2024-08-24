'use client'

import React from 'react'
import { FaShare, FaAddressCard } from 'react-icons/fa'

export default function BusinessActions({ business }) {
  const createVCF = async () => {
    let logoData = '';
    let coverImageData = '';

    const fetchImageData = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        return btoa(String.fromCharCode.apply(null, uint8Array));
      } catch (error) {
        console.error('Error fetching image:', error);
        return '';
      }
    };

    if (business.logo_url) {
      logoData = await fetchImageData(business.logo_url);
    }

    if (business.cover_image_url) {
      coverImageData = await fetchImageData(business.cover_image_url);
    }

    const truncate = (str, maxLength) => {
      if (!str) return '';
      return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + '...';
    };

    const formatBusinessHours = (hours) => {
      if (!hours || !hours.open || !hours.close) return '';
      return `${hours.open}-${hours.close}`;
    };

    let businessHoursString = '';
    if (business.business_hours) {
      businessHoursString = Object.entries(business.business_hours)
        .map(([day, hours]) => `${day.toUpperCase()};${formatBusinessHours(hours)}`)
        .join(';');
    }

    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${truncate(business.name, 100)}
ORG:${truncate(business.name, 100)}
TEL:${truncate(business.phone_number, 20) || ''}
EMAIL:${truncate(business.email, 100) || ''}
ADR:;;${truncate(business.address, 200) || ''}
URL:${truncate(business.website_url, 200) || ''}
NOTE:${truncate(business.description, 1000) || ''}
${logoData ? `PHOTO;ENCODING=b;TYPE=JPEG:${logoData}\n` : ''}
${coverImageData ? `X-COVER-IMAGE;ENCODING=b;TYPE=JPEG:${coverImageData}\n` : ''}
${business.instagram_link ? `X-SOCIALPROFILE;TYPE=instagram:${truncate(business.instagram_link, 200)}\n` : ''}
${business.youtube_link ? `X-SOCIALPROFILE;TYPE=youtube:${truncate(business.youtube_link, 200)}\n` : ''}
${business.facebook_link ? `X-SOCIALPROFILE;TYPE=facebook:${truncate(business.facebook_link, 200)}\n` : ''}
${business.pinterest_link ? `X-SOCIALPROFILE;TYPE=pinterest:${truncate(business.pinterest_link, 200)}\n` : ''}
${businessHoursString ? `X-BUSINESS-HOURS:${truncate(businessHoursString, 500)}\n` : ''}
END:VCARD`

    const blob = new Blob([vcf], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${truncate(business.name, 50)}.vcf`
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