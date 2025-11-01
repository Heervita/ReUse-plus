import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  IndianRupee,
  Package2,
  AlertTriangle,
  CheckCircle,
  Eye,
  TrendingUp
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  sales: number;
  rating: number;
  image?: string;
}

interface VendorProductsProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'sales' | 'rating'>) => void;
  onEditProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

export function VendorProducts({ products, onAddProduct, onEditProduct, onDeleteProduct }: VendorProductsProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'pads',
    status: 'active' as const
  });

  const categories = [
    { value: 'pads', label: 'Sanitary Pads' },
    { value: 'cups', label: 'Menstrual Cups' },
    { value: 'tampons', label: 'Tampons' },
    { value: 'underwear', label: 'Period Underwear' },
    { value: 'reusable', label: 'Reusable Products' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'supplements', label: 'Health Supplements' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'out_of_stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Eye className="h-4 w-4" />;
      case 'out_of_stock': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      return;
    }

    onAddProduct(newProduct);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'pads',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    onEditProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const productStats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.stock < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{productStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Products</p>
                <p className="text-2xl font-bold">{productStats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold">{productStats.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold">₹{productStats.totalValue.toLocaleString()}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Product Management
            </CardTitle>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="list">Product List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {showAddForm && (
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Product Name *</Label>
                        <Input
                          value={editingProduct ? editingProduct.name : newProduct.name}
                          onChange={(e) => editingProduct 
                            ? setEditingProduct({...editingProduct, name: e.target.value})
                            : setNewProduct({...newProduct, name: e.target.value})
                          }
                          placeholder="e.g., Organic Cotton Pads"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={editingProduct ? editingProduct.category : newProduct.category}
                          onChange={(e) => editingProduct 
                            ? setEditingProduct({...editingProduct, category: e.target.value})
                            : setNewProduct({...newProduct, category: e.target.value})
                          }
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Price (₹) *</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editingProduct ? editingProduct.price : newProduct.price}
                          onChange={(e) => editingProduct 
                            ? setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})
                            : setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})
                          }
                          placeholder="0.00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Stock Quantity *</Label>
                        <Input
                          type="number"
                          min="0"
                          value={editingProduct ? editingProduct.stock : newProduct.stock}
                          onChange={(e) => editingProduct 
                            ? setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})
                            : setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        value={editingProduct ? editingProduct.description : newProduct.description}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, description: e.target.value})
                          : setNewProduct({...newProduct, description: e.target.value})
                        }
                        placeholder="Describe your product features, benefits, and usage..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={editingProduct ? handleSaveEdit : handleAddProduct}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {editingProduct ? 'Save Changes' : 'Add Product'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingProduct(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No products yet</p>
                    <p className="text-sm">Add your first product to get started</p>
                  </div>
                ) : (
                  products.map(product => (
                    <Card key={product.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{product.name}</h4>
                              <Badge className={getStatusColor(product.status)}>
                                {getStatusIcon(product.status)}
                                <span className="ml-1">{product.status.replace('_', ' ')}</span>
                              </Badge>
                              {product.stock < 10 && product.stock > 0 && (
                                <Badge variant="destructive">Low Stock</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium">Price: ₹{product.price}</span>
                              <span>Stock: {product.stock}</span>
                              <span>Sales: {product.sales}</span>
                              <span>Rating: {product.rating.toFixed(1)}⭐</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Top Selling Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {products
                        .sort((a, b) => b.sales - a.sales)
                        .slice(0, 5)
                        .map((product, index) => (
                          <div key={product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                                {index + 1}
                              </span>
                              <span className="font-medium">{product.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{product.sales} sales</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Category Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.map(category => {
                        const count = products.filter(p => p.category === category.value).length;
                        return (
                          <div key={category.value} className="flex items-center justify-between">
                            <span>{category.label}</span>
                            <span className="text-sm text-muted-foreground">{count} products</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}