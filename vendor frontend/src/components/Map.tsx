import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { MapPin, Compass } from 'lucide-react';

export function Marketplace() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-6">
            <div className="flex justify-center">
              <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                <Compass className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="font-medium text-2xl">Coming Soon</h3>
              <p className="text-muted-foreground">
                Discover and shop from verified vendors selling eco-friendly menstrual products, 
                find nearby healthcare providers, and connect with specialists. This marketplace 
                will include product catalogs, reviews, and location services.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  We're building a comprehensive marketplace where you can shop, 
                  discover local vendors, and access healthcare services. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}