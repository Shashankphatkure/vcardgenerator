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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Business</h1>
      <BusinessForm initialData={business} isEditing={true} />
    </div>
  );
}