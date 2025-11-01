import { useState } from 'react';
import { Package, ShoppingCart, TrendingUp, User, LogOut, Moon } from 'lucide-react';
import { Button } from './components/ui/button';
import { ProductsTab } from './components/ProductsTab';
import { OrdersTab } from './components/OrdersTab';
import { IncomeTab } from './components/IncomeTab';
import { ProfileTab } from './components/ProfileTab';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-purple-600">ReUse+ Manufacturer</h1>
                <p className="text-sm text-gray-600">Marketplace Dashboard</p>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <Button
                variant={activeTab === 'products' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('products')}
                className={activeTab === 'products' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('orders')}
                className={activeTab === 'orders' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
              </Button>
              <Button
                variant={activeTab === 'income' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('income')}
                className={activeTab === 'income' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Income
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className={activeTab === 'profile' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="ghost" size="icon">
                <Moon className="w-4 h-4" />
              </Button>
              <Button variant="ghost">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'income' && <IncomeTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>
    </div>
  );
}
