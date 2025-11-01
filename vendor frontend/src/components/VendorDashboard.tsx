import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Store,
  Package,
  IndianRupee,
  Users,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";

interface VendorDashboardProps {
  vendorStats: {
    totalProducts: number;
    totalSales: number;
    revenue: number;
    customers: number;
    rating: number;
    reviewCount: number;
  };
}

export function VendorDashboard({
  vendorStats,
}: VendorDashboardProps) {

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Products
                </p>
                <p className="text-2xl font-bold">
                  {vendorStats.totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Sales
                </p>
                <p className="text-2xl font-bold">
                  {vendorStats.totalSales}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue
                </p>
                <p className="text-2xl font-bold">
                  ₹{vendorStats.revenue.toLocaleString()}
                </p>
              </div>
              <IndianRupee className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Customers
                </p>
                <p className="text-2xl font-bold">
                  {vendorStats.customers}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Vendor Rating & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Vendor Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= vendorStats.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold">
                  {vendorStats.rating.toFixed(1)}/5.0
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on {vendorStats.reviewCount} reviews
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Keep providing excellent products and customer
                  service to maintain your high rating!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Package className="h-4 w-4" />
              Add New Product
            </Button>
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <MapPin className="h-4 w-4" />
              Update Store Location
            </Button>
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Clock className="h-4 w-4" />
              Set Business Hours
            </Button>
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <AlertCircle className="h-4 w-4" />
              Manage Inventory Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}