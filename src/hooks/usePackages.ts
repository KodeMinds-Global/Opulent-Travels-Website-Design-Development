import { useState, useEffect, useMemo } from 'react';
import { Package } from '@/types/package';
import { allPackages, sriLankaPackages, maldivesPackages } from '@/data/packages';

type PackageType = 'all' | 'sriLanka' | 'maldives';

export function usePackages() {
  const [filter, setFilter] = useState<PackageType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter packages based on selected type and search term
  const filteredPackages = useMemo(() => {
    let packages: Package[] = [];
    
    // Filter by type
    switch (filter) {
      case 'sriLanka':
        packages = sriLankaPackages;
        break;
      case 'maldives':
        packages = maldivesPackages;
        break;
      default:
        packages = allPackages;
    }
    
    // Filter by search term if provided
    if (searchTerm.trim() !== '') {
      return packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pkg.type === 'sriLanka' && 
          pkg.locations.some(location => 
            location.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) ||
        (pkg.type === 'maldives' && 
          pkg.resortName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return packages;
  }, [filter, searchTerm]);
  
  // Get featured packages
  const featuredPackages = useMemo(() => {
    return allPackages.filter(pkg => pkg.featured);
  }, []);
  
  // Get package by ID
  const getPackageById = (id: string): Package | undefined => {
    return allPackages.find(pkg => pkg.id === id);
  };
  
  return {
    allPackages,
  // Expose specific collections for direct access where needed
  sriLankaPackages,
  maldivesPackages,
    filteredPackages,
    featuredPackages,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    getPackageById
  };
} 