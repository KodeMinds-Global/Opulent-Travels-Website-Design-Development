import React from 'react';
import { usePackages } from '../hooks/useApi';

const ApiTest = () => {
  const { data: packages, loading, error, refetch } = usePackages({ limit: 3 });

  return (
    <div className="p-4 border rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">API Connection Test</h3>
      
      {loading && (
        <div className="text-blue-600">Loading packages from backend...</div>
      )}
      
      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
          <button 
            onClick={refetch} 
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}
      
      {packages && (
        <div>
          <div className="text-green-600 mb-2">
            ✅ Successfully connected to backend! Found {packages.length} packages.
          </div>
          <div className="space-y-2">
            {packages.map((pkg: any) => (
              <div key={pkg.id} className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">{pkg.title}</div>
                <div className="text-sm text-gray-600">{pkg.short_description}</div>
                <div className="text-sm text-blue-600">Type: {pkg.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
