'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function BusinessForm({ initialData = null, isEditing = false }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    category: '',
    instagram_link: '',
    youtube_link: '',
    facebook_link: '',
    pinterest_link: '',
    cover_image_url: '',
    business_hours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' },
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isEditing) {
        const { data, error } = await supabase
          .from('businesses')
          .update({ ...formData })
          .eq('id', initialData.id);
        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from('businesses')
          .insert([{ ...formData }]);
        result = { data, error };
      }

      if (result.error) throw result.error;

      console.log(isEditing ? 'Updated data:' : 'Inserted data:', result.data)
      alert(isEditing ? 'Business updated successfully!' : 'Business created successfully!')
      router.push('/') // Redirect to home page
    } catch (error) {
      console.error('Error:', error)
      console.error('Error details:', error.details)
      console.error('Error message:', error.message)
      alert(`Error ${isEditing ? 'updating' : 'creating'} business. Please check the console for more details.`)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      business_hours: {
        ...prevData.business_hours,
        [day]: {
          ...prevData.business_hours[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          type="url"
          id="logo_url"
          name="logo_url"
          value={formData.logo_url}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700">Website URL</label>
        <input
          type="url"
          id="website_url"
          name="website_url"
          value={formData.website_url}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">ZIP Code</label>
        <input
          type="text"
          id="zip_code"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="instagram_link" className="block text-sm font-medium text-gray-700">Instagram Link</label>
        <input
          type="url"
          id="instagram_link"
          name="instagram_link"
          value={formData.instagram_link}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="youtube_link" className="block text-sm font-medium text-gray-700">YouTube Link</label>
        <input
          type="url"
          id="youtube_link"
          name="youtube_link"
          value={formData.youtube_link}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="facebook_link" className="block text-sm font-medium text-gray-700">Facebook Link</label>
        <input
          type="url"
          id="facebook_link"
          name="facebook_link"
          value={formData.facebook_link}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="pinterest_link" className="block text-sm font-medium text-gray-700">Pinterest Link</label>
        <input
          type="url"
          id="pinterest_link"
          name="pinterest_link"
          value={formData.pinterest_link}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
        <input
          type="url"
          id="cover_image_url"
          name="cover_image_url"
          value={formData.cover_image_url}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
        {Object.entries(formData.business_hours).map(([day, hours]) => (
          <div key={day} className="flex items-center mb-2">
            <label className="w-24 text-sm font-medium text-gray-700 capitalize">{day}</label>
            <input
              type="time"
              value={hours.open}
              onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
              className="mr-2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span className="mx-2">to</span>
            <input
              type="time"
              value={hours.close}
              onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEditing ? 'Update Business' : 'Create Business'}
        </button>
      </div>
    </form>
  );
}