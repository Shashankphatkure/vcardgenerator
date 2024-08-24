'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient'

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
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

    fetchBusinesses();
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Business Pages</h2>
        <ul className="divide-y divide-gray-200">
          {businesses.map((business) => (
            <li key={business.id} className="py-4">
              <Link href={`/business/${business.id}`} className="block hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                      {business.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{business.name}</p>
                    <p className="text-sm text-gray-500 truncate">{business.description}</p>
                  </div>
                  <div>
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}