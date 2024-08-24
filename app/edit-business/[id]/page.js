'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import BusinessForm from '../../components/BusinessForm';

export default function EditBusiness({ params }) {
  const router = useRouter();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching business:', error);
        router.push('/');
      } else {
        setBusiness(data);
      }
    };

    fetchBusiness();
  }, [params.id, router]);

  if (!business) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Edit Business</h1>
          <div className="mt-8">
            <BusinessForm initialData={business} isEditing={true} />
          </div>
        </div>
      </div>
    </div>
  );
}