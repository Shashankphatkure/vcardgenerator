'use client'

import React from 'react'
import { supabase } from '../lib/supabaseClient'

export default function BusinessDetails({ id }) {
  const [business, setBusiness] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error)
      } else {
        setBusiness(data)
      }
    }

    fetchBusiness()
  }, [id])


  if (error) {
    return <div>Error fetching business: {error.message}</div>
  }

  if (!business) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Your component content */}
    </div>
  )
}