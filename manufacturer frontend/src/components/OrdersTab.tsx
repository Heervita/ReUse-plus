import { Package, Clock, CheckCircle, XCircle, TruckIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

interface Order {
  id: string;
  orderNumber: string;
  vendor: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: string;
}

export function OrdersTab() {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-1001',
      vendor: 'Apollo Store',
      products: [
        { name: 'Organic Cotton Cloth Pads - Regular Flow', quantity: 10, price: 299 },
        { name: 'Menstrual Cup - Medical Grade', quantity: 5, price: 599 }
      ],
      total: 5985,
      status: 'delivered',
      date: '2024-10-28',
      shippingAddress: 'Pondha Dehradun, Uttrakhand 248007'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-1002',
      vendor: 'EcoLife Vendors',
      products: [
        { name: 'Reusable Panty Liners', quantity: 20, price: 199 }
      ],
      total: 3980,
      status: 'shipped',
      date: '2024-10-30',
      shippingAddress: 'MG Road, Bangalore 560001'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-1003',
      vendor: 'GreenChoice Market',
      products: [
        { name: 'Period Underwear', quantity: 8, price: 899 },
        { name: 'Organic Cotton Cloth Pads - Regular Flow', quantity: 15, price: 299 }
      ],
      total: 11677,
      status: 'processing',
      date: '2024-11-01',
      shippingAddress: 'Connaught Place, New Delhi 110001'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-1004',
      vendor: 'Sustainable Living Co.',
      products: [
        { name: 'Menstrual Cup - Medical Grade', quantity: 12, price: 599 }
      ],
      total: 7188,
      status: 'pending',
      date: '2024-11-01',
      shippingAddress: 'Park Street, Kolkata 700016'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <TruckIcon className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const processingOrders = orders.filter(o => o.status === 'processing');
  const shippedOrders = orders.filter(o => o.status === 'shipped');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl mt-1">{pendingOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl mt-1">{processingOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shipped</p>
              <p className="text-2xl mt-1">{shippedOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl mt-1">{deliveredOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5" />
            <h2>Order Tracking</h2>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3>{order.orderNumber}</h3>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vendor: {order.vendor}</p>
                      <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {product.name} x {product.quantity}
                        </span>
                        <span>₹{(product.price * product.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <p className="text-sm text-gray-600">Shipping Address:</p>
                    <p className="text-sm">{order.shippingAddress}</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {order.status === 'pending' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Process Order
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Mark as Shipped
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                      <p className="text-sm text-gray-600">Total: ₹{order.total.toLocaleString()}</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Process Order
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="processing" className="space-y-4 mt-6">
              {processingOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                      <p className="text-sm text-gray-600">Total: ₹{order.total.toLocaleString()}</p>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Mark as Shipped
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="shipped" className="space-y-4 mt-6">
              {shippedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                      <p className="text-sm text-gray-600">Total: ₹{order.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-2">📍 {order.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-4 mt-6">
              {deliveredOrders.map((order) => (
                <div key={order.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3>{order.orderNumber}</h3>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                      <p className="text-sm text-gray-600">Total: ₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
