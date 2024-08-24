import dynamic from 'next/dynamic'
import BusinessList from "./components/BusinessList";

// Dynamically import BusinessForm with no SSR
const BusinessForm = dynamic(() => import('./components/BusinessForm'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Business Directory</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add New Business</h2>
            <BusinessForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Business Listings</h2>
            <BusinessList />
          </div>
        </div>
      </div>
    </main>
  );
}