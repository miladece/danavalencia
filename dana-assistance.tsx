"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MapPin, Truck, AlertCircle } from 'lucide-react';

const DanaAssistance = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listingType, setListingType] = useState('all');
  const [viewMode, setViewMode] = useState('offers'); // 'offers' or 'requests'

  // Resto del código...
  
  // Datos de ejemplo - en la app real vendrían de backend
  const items = [
    { 
      id: 1, 
      type: 'vehiculos', 
      category: 'coche', 
      title: 'Ford Fiesta 2018', 
      price: 8000, 
      condition: 'Buen estado', 
      isForSale: true,
      location: 'Valencia Capital',
      delivery: true,
      description: 'Coche en buen estado, revisión reciente'
    },
    { 
      id: 2, 
      type: 'electrodomesticos', 
      category: 'lavadora', 
      title: 'Lavadora Samsung', 
      price: 0, 
      condition: 'Como nueva', 
      isForSale: false,
      location: 'Alzira',
      delivery: false,
      description: 'Lavadora de 8kg, modo eco'
    },
    { 
      id: 3, 
      type: 'electronica', 
      category: 'portatil', 
      title: 'Portátil HP', 
      price: 300, 
      condition: 'Usado', 
      isForSale: true,
      location: 'Gandía',
      delivery: true,
      description: 'Intel i5, 8GB RAM, 256GB SSD'
    }
  ];

  const requests = [
    {
      id: 1,
      type: 'electronica',
      title: 'Necesito tablet para estudiar',
      location: 'Alzira',
      urgency: 'Alta',
      description: 'Estudiante universitario, perdí mi tablet en la inundación',
      contactInfo: 'Juan - 600XXX123'
    },
    {
      id: 2,
      type: 'electrodomesticos',
      title: 'Familia necesita nevera',
      location: 'Valencia Sur',
      urgency: 'Media',
      description: 'Somos familia de 4 personas, necesitamos nevera básica',
      contactInfo: 'María - 655XXX789'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'vehiculos', label: 'Vehículos' },
    { value: 'electrodomesticos', label: 'Electrodomésticos' },
    { value: 'muebles', label: 'Muebles' },
    { value: 'electronica', label: 'Electrónica' }
  ];

  const filteredItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.type !== selectedCategory) return false;
    if (listingType === 'sale' && !item.isForSale) return false;
    if (listingType === 'donation' && item.isForSale) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Plataforma de Ayuda DANA Valencia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Conectando a personas afectadas por la DANA con recursos esenciales - Juntos reconstruimos Valencia
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="offers" className="w-full mb-6" onValueChange={setViewMode}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="offers">Ofertas Disponibles</TabsTrigger>
          <TabsTrigger value="requests">Solicitudes de Ayuda</TabsTrigger>
        </TabsList>
      </Tabs>

      {viewMode === 'offers' ? (
        <>
          <div className="mb-6 flex gap-4 flex-wrap">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs defaultValue="all" className="w-[400px]" onValueChange={setListingType}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="sale">En Venta</TabsTrigger>
                <TabsTrigger value="donation">Donaciones</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <Card key={item.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.category}</span>
                    {item.isForSale ? (
                      <span className="font-bold">{item.price}€</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Donación</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-600 mb-2">Estado: {item.condition}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  {item.delivery && (
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <Truck className="w-4 h-4" />
                      <span className="text-sm">Entrega disponible</span>
                    </div>
                  )}
                  <Button className="w-full">
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map(request => (
            <Card key={request.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{request.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Urgencia: {request.urgency}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{request.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{request.location}</span>
                </div>
                <p className="text-sm font-semibold mb-4">Contacto: {request.contactInfo}</p>
                <Button className="w-full">
                  Quiero Ayudar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button className="mt-6 w-full" variant="outline">
        {viewMode === 'offers' ? 'Publicar Nuevo Artículo' : 'Crear Nueva Solicitud'}
      </Button>
    </div>
  );
};

export default DanaAssistance;
