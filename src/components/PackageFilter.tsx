import React from 'react';
import { Input } from '@/components/ui/input';

interface PackageFilterProps {
  filter: 'all' | 'sriLanka' | 'maldives';
  onFilterChange: (filter: 'all' | 'sriLanka' | 'maldives') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const PackageFilter: React.FC<PackageFilterProps> = ({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-md mb-8">
      <div className="grid md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2">
          <h3 className="font-playfair font-bold mb-2 text-luxury-charcoal dark:text-white">Search Packages</h3>
          <Input
            type="text"
            placeholder="Search by name, location, or resort"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-gray-300 dark:border-gray-600"
          />
        </div>
        
        <div className="md:col-span-2">
          <h3 className="font-playfair font-bold mb-2 text-luxury-charcoal dark:text-white">Filter by Destination</h3>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => onFilterChange('all')}
            >
              All Destinations
            </FilterButton>
            
            <FilterButton 
              active={filter === 'sriLanka'} 
              onClick={() => onFilterChange('sriLanka')}
              color="teal"
            >
              Sri Lanka
            </FilterButton>
            
            <FilterButton 
              active={filter === 'maldives'} 
              onClick={() => onFilterChange('maldives')}
              color="gold"
            >
              Maldives
            </FilterButton>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color?: 'teal' | 'gold' | 'default';
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  children, 
  active, 
  onClick,
  color = 'default' 
}) => {
  const getColorClasses = () => {
    if (active) {
      switch (color) {
        case 'teal':
          return 'bg-luxury-teal text-white border-luxury-teal';
        case 'gold':
          return 'bg-luxury-gold text-black border-luxury-gold';
        default:
          return 'bg-luxury-charcoal text-white border-luxury-charcoal dark:bg-white dark:text-dark-background';
      }
    }
    
    return 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-primary/20';
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${getColorClasses()}`}
    >
      {children}
    </button>
  );
};

export default PackageFilter; 