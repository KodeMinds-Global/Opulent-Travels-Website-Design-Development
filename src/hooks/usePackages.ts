import { useState, useEffect, useMemo } from 'react';
import { Package } from '@/types/package';
import { usePackages as useApiPackages, usePackage as useApiPackage } from './useApi';

type PackageType = 'all' | 'sriLanka' | 'maldives';

export function usePackages() {
  const [filter, setFilter] = useState<PackageType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use API hook to fetch packages
  const { 
    data: allPackages, 
    loading, 
    error, 
    refetch 
  } = useApiPackages({
    type: filter === 'all' ? undefined : filter,
    search: searchTerm || undefined
  });

  // Get featured packages
  const { data: featuredPackages } = useApiPackages({ featured: true });
  
  // Get package by ID function
  const getPackageById = (id: string) => {
    // This will be handled by the usePackage hook when needed
    return null; // Placeholder - use usePackage(id) hook in components instead
  };
  
  return {
    allPackages: allPackages || [],
    sriLankaPackages: filter === 'sriLanka' ? (allPackages || []) : [],
    maldivesPackages: filter === 'maldives' ? (allPackages || []) : [],
    filteredPackages: allPackages || [],
    featuredPackages: featuredPackages || [],
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    getPackageById,
    loading,
    error,
    refetch
  };
} 