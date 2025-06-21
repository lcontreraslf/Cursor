import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Input } from './input';
import { Button } from './button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './dropdown-menu';
import { MapPin, House, Building, CurrencyDollar, Funnel, MagnifyingGlass } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Slider } from "@/components/ui/slider"

interface HeroSearchProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const regions = [
  "Antofagasta", "Biobío", "Coquimbo", "La Araucanía", "Los Lagos", "Maule", 
  "Metropolitana", "O'Higgins", "Valparaíso",
];

const propertyTypes = ["Casa", "Departamento", "Bodega", "Estacionamiento", "Terrenos", "Parcelas"];

const HeroSearch: React.FC<HeroSearchProps> = ({
  backgroundImage = '/assets/hero-background.png',
  title = 'Encuentra la Propiedad Perfecta',
  subtitle = 'Busca entre miles de casas, departamentos y propiedades de lujo en todo el país.',
  className,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceButtonText, setPriceButtonText] = useState("Tu presupuesto");

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: "easeInOut" } }
  };

  const formatPrice = (value: number) => `UF ${new Intl.NumberFormat('es-CL').format(value)}`;
  const formatRangeText = (range: number[]) => `UF ${new Intl.NumberFormat('es-CL').format(range[0])} - ${new Intl.NumberFormat('es-CL').format(range[1])}`;
  
  const handlePriceInputChange = (index: 0 | 1, value: string) => {
    if (value === '') {
        const newRange = [...priceRange] as [number, number];
        newRange[index] = 0;
        setPriceRange(newRange);
        return;
    }
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
        const newRange = [...priceRange] as [number, number];
        const boundedValue = Math.max(0, Math.min(numericValue, 100000));
        newRange[index] = boundedValue;
        
        if (index === 0 && newRange[0] > newRange[1]) {
            newRange[0] = newRange[1];
        }
        if (index === 1 && newRange[1] < newRange[0]) {
            newRange[1] = newRange[0];
        }
        setPriceRange(newRange);
    }
  };

  return (
    <div
      className={cn("relative min-h-[600px] flex items-center justify-center bg-cover bg-center px-4", className)}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
      }}
      onClick={() => setActiveField(null)}
    >
      <div className="w-full max-w-4xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-200">{subtitle}</p>
        </motion.div>

        <div className="mt-12 h-[72px] flex items-center justify-center">
            <AnimatePresence mode="wait">
            {!showSearch ? (
                <motion.div
                key="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.4 } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                >
                <button
                    className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowSearch(true);
                    }}
                >
                    Explorar propiedades
                </button>
                </motion.div>
            ) : (
                <motion.div
                key="search"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
                >
                {/* Barra de Búsqueda */}
                <div 
                    className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center bg-white rounded-full shadow-2xl p-2 mx-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* DÓNDE */}
                    <div className="relative">
                    <button 
                        className={cn("h-full text-left px-6 py-2 rounded-full transition-colors w-full", activeField === 'donde' ? 'bg-gray-200 shadow-inner' : 'hover:bg-gray-100')}
                        onClick={(e) => { e.stopPropagation(); setActiveField(activeField === 'donde' ? null : 'donde')}}
                    >
                        <p className="font-bold text-sm text-gray-800">Dónde</p>
                        <p className="text-sm text-gray-500 truncate">{selectedRegion || 'Explora destinos'}</p>
                    </button>
                    <AnimatePresence>
                        {activeField === 'donde' && (
                        <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-lg p-6 text-left z-50">
                            <h3 className="font-bold text-gray-800 mb-4">Búsqueda por región</h3>
                            <div className="space-y-1">
                            {regions.map(region => (
                                <button 
                                    key={region} 
                                    className="text-sm text-gray-600 hover:text-black hover:bg-gray-100 text-left w-full py-2 px-3 rounded-lg transition-colors"
                                    onClick={() => {
                                        setSelectedRegion(region);
                                        setActiveField(null);
                                    }}
                                >
                                    {region}
                                </button>
                            ))}
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                    
                    <div className="h-8 border-r border-gray-200" />
                    
                    {/* TIPO */}
                    <div className="relative">
                        <button 
                        className={cn("h-full text-left px-6 py-2 rounded-full transition-colors w-full", activeField === 'tipo' ? 'bg-gray-200 shadow-inner' : 'hover:bg-gray-100')}
                        onClick={(e) => { e.stopPropagation(); setActiveField(activeField === 'tipo' ? null : 'tipo')}}
                        >
                        <p className="font-bold text-sm text-gray-800">Tipo</p>
                        <p className="text-sm text-gray-500 truncate">{selectedType || 'Casas, Deptos...'}</p>
                        </button>
                        <AnimatePresence>
                            {activeField === 'tipo' && (
                            <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-lg p-6 text-left z-50">
                                <h3 className="font-bold text-gray-800 mb-4">Tipo de Propiedad</h3>
                                <div className="space-y-1">
                                {propertyTypes.map(type => (
                                    <button 
                                        key={type} 
                                        className="text-sm text-gray-600 hover:text-black hover:bg-gray-100 text-left w-full py-2 px-3 rounded-lg transition-colors"
                                        onClick={() => {
                                            setSelectedType(type);
                                            setActiveField(null);
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-8 border-r border-gray-200" />
                    
                    {/* PRECIO */}
                    <div className="flex items-center justify-between pl-6 relative">
                        <div className='w-full'>
                            <button 
                                className={cn("h-full text-left px-4 py-2 rounded-full transition-colors w-full", activeField === 'precio' ? 'bg-gray-200 shadow-inner' : 'hover:bg-gray-100')}
                                onClick={(e) => { e.stopPropagation(); setActiveField(activeField === 'precio' ? null : 'precio')}}
                            >
                                <p className="font-bold text-sm text-gray-800">Precio</p>
                                <p className="text-sm text-gray-500 truncate">{priceButtonText}</p>
                            </button>
                            <AnimatePresence>
                            {activeField === 'precio' && (
                                <motion.div 
                                    variants={dropdownVariants} 
                                    initial="hidden" 
                                    animate="visible" 
                                    exit="exit" 
                                    className="absolute top-full mt-3 w-[350px] bg-white rounded-2xl shadow-lg p-6 text-left z-50 right-0"
                                    >
                                    <h3 className="font-bold text-gray-800 mb-6">Rango de Precio</h3>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={(value) => {
                                            if (typeof value[0] === 'number' && typeof value[1] === 'number') {
                                                setPriceRange([value[0], value[1]]);
                                            }
                                        }}
                                        max={100000}
                                        step={1000}
                                    />
                                    <div className="flex justify-between mt-4">
                                        <div className="w-1/2 pr-2">
                                            <label className="text-xs text-gray-500">Precio Mínimo</label>
                                            <div className="relative mt-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">UF</span>
                                                <Input
                                                    type="number"
                                                    value={priceRange[0]}
                                                    onChange={(e) => handlePriceInputChange(0, e.target.value)}
                                                    className="pl-8"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <label className="text-xs text-gray-500">Precio Máximo</label>
                                            <div className="relative mt-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">UF</span>
                                                <Input
                                                    type="number"
                                                    value={priceRange[1]}
                                                    onChange={(e) => handlePriceInputChange(1, e.target.value)}
                                                    className="pl-8"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full mt-6"
                                        onClick={() => {
                                            setPriceButtonText(formatRangeText(priceRange));
                                            setActiveField(null);
                                        }}
                                    >
                                        Aplicar
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 ml-4 transition-colors shrink-0">
                        <MagnifyingGlass size={24} weight="bold" />
                    </button>
                    </div>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
