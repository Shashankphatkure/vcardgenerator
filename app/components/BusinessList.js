'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient'

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching businesses:', error);
    } else {
      setBusinesses(data);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this business?')) {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting business:', error);
      } else {
        fetchBusinesses(); // Refresh the list
      }
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Business Pages</h2>
        <ul className="space-y-6">
          {businesses.map((business) => (
            <li key={business.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <Link href={`/business/${business.id}`} className="flex-1 block">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {business.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-semibold text-gray-900 truncate">{business.name}</p>
                        <p className="text-sm text-gray-500 truncate mt-1">{business.description}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex space-x-3 ml-4">
                    <Link href={`/edit-business/${business.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(business.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}