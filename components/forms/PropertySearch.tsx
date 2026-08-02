'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PropertySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for the form
  const [query, setQuery] = React.useState(searchParams?.get('q') || '');
  const [type, setType] = React.useState(searchParams?.get('type') || '');
  const [status, setStatus] = React.useState(searchParams?.get('status') || '');
  const [minPrice, setMinPrice] = React.useState(searchParams?.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = React.useState(searchParams?.get('maxPrice') || '');
  const [beds, setBeds] = React.useState(searchParams?.get('beds') || '');
  const [baths, setBaths] = React.useState(searchParams?.get('baths') || '');

  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (beds) params.set('beds', beds);
    if (baths) params.set('baths', baths);

    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setQuery('');
    setType('');
    setStatus('');
    setMinPrice('');
    setMaxPrice('');
    setBeds('');
    setBaths('');
    router.push('/properties', { scroll: false });
  };

  const hasActiveFilters = query || type || status || minPrice || maxPrice || beds || baths;

  return (
    <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-2xl p-4 md:p-6 mb-12 shadow-xl relative z-20 -mt-24 mx-4 lg:mx-0 backdrop-blur-md bg-[var(--bg-surface-1)]/90">
      <form onSubmit={handleSearch}>
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
            <input
              type="text"
              placeholder="Search by location, title, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--gold)] transition-colors h-12"
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-6 flex gap-2 items-center whitespace-nowrap h-12 border-[var(--border)]"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <Button type="submit" className="px-8 whitespace-nowrap h-12">
              Search
            </Button>
          </div>
        </div>

        {/* Advanced Filters (Collapsible) */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-[var(--border)] animate-fade-in-up">
            
            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select text-sm py-2 px-3 h-11">
                <option value="">Any Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>

            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Property Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="form-select text-sm py-2 px-3 h-11">
                <option value="">Any Type</option>
                <option value="house">House</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>

            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Min Price (PKR)</label>
              <input type="number" placeholder="e.g. 10000000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="form-input text-sm py-2 px-3 h-11" />
            </div>

            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Max Price (PKR)</label>
              <input type="number" placeholder="e.g. 50000000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form-input text-sm py-2 px-3 h-11" />
            </div>

            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Beds</label>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className="form-select text-sm py-2 px-3 h-11">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="form-group mb-0">
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Baths</label>
              <select value={baths} onChange={(e) => setBaths(e.target.value)} className="form-select text-sm py-2 px-3 h-11">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
          </div>
        )}

        {/* Active Filters Clear Button */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-sm text-[var(--gold)] font-medium">
              Filters Active
            </span>
            <button 
              type="button" 
              onClick={clearFilters}
              className="text-sm text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 transition-colors bg-[var(--bg-surface-2)] px-3 py-1.5 rounded-md border border-[var(--border)]"
            >
              <X size={14} /> Clear all filters
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
