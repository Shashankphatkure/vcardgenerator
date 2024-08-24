import dynamic from 'next/dynamic'
import { supabase } from '../../../lib/supabaseClient'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaInstagram, FaYoutube, FaFacebook, FaPinterest } from 'react-icons/fa'
import BusinessActions from '../../components/BusinessActions'

const DynamicBusinessDetails = dynamic(() => import('../../../components/BusinessDetails'), { ssr: false })

export default async function BusinessPage({ params }) {
  const { data: business, error } = await supabase
    .from('businesses')
    .select('*, instagram_link, youtube_link, facebook_link, pinterest_link, cover_image_url, business_hours')
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Error fetching business:', error)
    return <div>Error loading business</div>
  }

  if (!business) {
    return <div>Business not found</div>
  }

  const formatBusinessHours = (hours) => {
    if (!hours) return 'Not available';
    return `${hours.open} - ${hours.close}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="relative h-64 bg-indigo-600">
          {business.cover_image_url ? (
            <img src={business.cover_image_url} alt={`${business.name} cover`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-600" />
          )}
          <img src={business.logo_url} alt={`${business.name} logo`} className="absolute bottom-0 left-8 w-32 h-32 object-cover border-4 border-white rounded-full shadow-lg transform translate-y-1/2" />
        </div>
        <div className="p-8 pt-20">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{business.name}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{business.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700"><FaEnvelope className="mr-3 text-indigo-500" /> {business.email}</p>
                <p className="flex items-center text-gray-700"><FaPhone className="mr-3 text-indigo-500" /> {business.phone_number}</p>
                <p className="flex items-center text-gray-700"><FaMapMarkerAlt className="mr-3 text-indigo-500" /> {business.address}</p>
              </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Business Hours</h2>
              {business.business_hours ? (
                Object.entries(business.business_hours).map(([day, hours]) => (
                  <p key={day} className="text-gray-700 capitalize">
                    <span className="font-medium">{day}:</span> {formatBusinessHours(hours)}
                  </p>
                ))
              ) : (
                <p className="text-gray-700">Business hours not available</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <a href={business.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-md">
              <FaGlobe className="mr-2" /> Visit Website
            </a>
            {business.instagram_link && (
              <a href={business.instagram_link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition duration-300 shadow-md">
                <FaInstagram className="mr-2" /> Instagram
              </a>
            )}
            {business.youtube_link && (
              <a href={business.youtube_link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-md">
                <FaYoutube className="mr-2" /> YouTube
              </a>
            )}
            {business.facebook_link && (
              <a href={business.facebook_link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                <FaFacebook className="mr-2" /> Facebook
              </a>
            )}
            {business.pinterest_link && (
              <a href={business.pinterest_link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-md">
                <FaPinterest className="mr-2" /> Pinterest
              </a>
            )}
            <BusinessActions business={business} />
          </div>
          
          <DynamicBusinessDetails id={params.id} />
        </div>
      </div>
    </div>
  );
}