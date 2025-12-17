'use client';

import { motion } from 'framer-motion';
import { SearchBar } from '@/components/search/SearchBar';
import { Building2, Search, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#F0FDF4' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-[#F0FDF4] to-emerald-100/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a7f3d012_1px,transparent_1px),linear-gradient(to_bottom,#a7f3d012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        {/* Decorative gradient blobs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
          <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
                style={{ backgroundColor: '#065F46' }}
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="relative rounded-2xl p-3.5 shadow-xl"
                style={{ background: 'linear-gradient(to bottom right, #065F46, #047857)' }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Building2 className="h-10 w-10 text-white" strokeWidth={2} />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#064E3B' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              California Business
            </motion.span>
            <motion.span
              className="block mt-1.5"
              style={{ color: '#065F46' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Records
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ color: '#047857' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Search, verify, and manage your business entity records with ease
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SearchBar />
          </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#064E3B' }}>
              How It Works
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#047857' }}>
              Simple steps to keep your business records up to date
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
            {/* Search Card */}
            <motion.div 
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              style={{ borderColor: '#a7f3d0' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300" style={{ backgroundColor: '#d1fae5' }}>
                  <Search className="h-8 w-8" style={{ color: '#065F46' }} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#064E3B' }}>Search</h3>
                <p className="leading-relaxed" style={{ color: '#047857' }}>
                  Find your business instantly in our comprehensive database of <span className="font-semibold" style={{ color: '#065F46' }}>9+ million records</span>
                </p>
              </div>
            </motion.div>

            {/* Verify Card */}
            <motion.div 
              className="group relative bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ borderColor: '#a7f3d0' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300" style={{ backgroundColor: '#d1fae5' }}>
                  <CheckCircle2 className="h-6 w-6" style={{ color: '#047857' }} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#064E3B' }}>Verify</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#047857' }}>
                  Review and confirm all your business details are <span className="font-semibold" style={{ color: '#047857' }}>accurate and current</span>
                </p>
              </div>
            </motion.div>

            {/* Update Card */}
            <motion.div 
              className="group relative bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ borderColor: '#fde68a' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300" style={{ backgroundColor: '#fef3c7' }}>
                  <RefreshCw className="h-6 w-6" style={{ color: '#F59E0B' }} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#064E3B' }}>Update</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#047857' }}>
                  Keep your records current with our Managed Update Service for just <span className="font-semibold" style={{ color: '#F59E0B' }}>$50</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
