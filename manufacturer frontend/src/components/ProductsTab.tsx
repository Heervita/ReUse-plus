import { useState } from 'react';
import { Plus, Package, TrendingUp, AlertTriangle, IndianRupee, Star, Edit, Trash2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  manufacturer: string;
  status: string;
  sustainability: string;
  tags: string[];
}

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Cotton Cloth Pads - Regular Flow',
      description: 'Super-soft organic cotton cloth pads with bamboo absorbent core. Leak-proof, breathable and reusable for up to 3-5 years.',
      price: 299,
      stock: 45,
      sales: 98,
      rating: 4.7,
      manufacturer: 'EcoFemme',
      status: 'active',
      sustainability: '100% Sustainable',
      tags: ['Organic cotton top layer', 'Bamboo fiber absorbent core', '8-hour protection']
    },
    {
      id: '2',
      name: 'Menstrual Cup - Medical Grade',
      description: 'FDA-approved medical grade silicone menstrual cup. 12-hour protection with zero waste generation for 10+ years.',
      price: 599,
      stock: 78,
      sales: 162,
      rating: 4.6,
      manufacturer: 'Boondh',
      status: 'active',
      sustainability: '55% Sustainable',
      tags: ['Medical grade silicone', 'FDA approved', '12-hour protection']
    },
    {
      id: '3',
      name: 'Reusable Panty Liners',
      description: 'Ultra-thin reusable panty liners made from organic cotton. Perfect for daily use and light flow days.',
      price: 199,
      stock: 67,
      sales: 46,
      rating: 4.5,
      manufacturer: 'Saukhyam',
      status: 'active',
      sustainability: '100% Sustainable',
      tags: ['Ultra-thin design', 'Organic cotton surface', 'Breathable bamboo core']
    },
    {
      id: '4',
      name: 'Period Underwear',
      description: 'Revolutionary period underwear with built-in absorbent layers. No pads needed - just wear and go.',
      price: 899,
      stock: 23,
      sales: 89,
      rating: 4.8,
      manufacturer: 'EcoFemme',
      status: 'active',
      sustainability: '95% Sustainable',
      tags: ['Built-in absorption', 'No pads needed', 'Machine washable']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [renewStockDialog, setRenewStockDialog] = useState<string | null>(null);
  const [renewQuantity, setRenewQuantity] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    manufacturer: '',
    sustainability: '',
    tags: ''
  });

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter(p => p.stock < 30).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 3);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        sales: 0,
        rating: 0,
        manufacturer: newProduct.manufacturer,
        status: 'active',
        sustainability: newProduct.sustainability,
        tags: newProduct.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: '', stock: '', manufacturer: '', sustainability: '', tags: '' });
      setIsDialogOpen(false);
    }
  };

  const handleRenewStock = (productId: string) => {
    const quantity = Number(renewQuantity);
    if (quantity > 0) {
      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, stock: p.stock + quantity }
          : p
      ));
      toast.success(`Successfully added ${quantity} units to stock!`);
      setRenewStockDialog(null);
      setRenewQuantity('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl mt-1">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock</p>
              <p className="text-2xl mt-1">{totalStock}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl mt-1">{lowStock}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl mt-1 flex items-center">
                <IndianRupee className="w-5 h-5" />
                {totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Product Management */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <h2>Product Management</h2>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add a new product to your catalog.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Organic Cotton Cloth Pads"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Detailed product description..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="299"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="45"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="manufacturer">Manufacturer Brand</Label>
                    <Input
                      id="manufacturer"
                      value={newProduct.manufacturer}
                      onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })}
                      placeholder="e.g., Saukhyam"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sustainability">Sustainability</Label>
                    <Select
                      value={newProduct.sustainability}
                      onValueChange={(value) => setNewProduct({ ...newProduct, sustainability: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sustainability level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100% Sustainable">100% Sustainable</SelectItem>
                        <SelectItem value="95% Sustainable">95% Sustainable</SelectItem>
                        <SelectItem value="75% Sustainable">75% Sustainable</SelectItem>
                        <SelectItem value="55% Sustainable">55% Sustainable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Product Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newProduct.tags}
                      onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                      placeholder="e.g., Organic cotton, FDA approved, 12-hour protection"
                    />
                  </div>
                  <Button onClick={handleAddProduct} className="w-full bg-purple-600 hover:bg-purple-700">
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Product List</TabsTrigger>
              <TabsTrigger value="bestsellers">Best Sellers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {products.map((product) => (
                <div key={product.id} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3>{product.name}</h3>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                          {product.manufacturer}
                        </Badge>
                        {product.status === 'active' && (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            active
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                          {product.sustainability}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Price: ₹{product.price}</span>
                        <span>Stock: {product.stock}</span>
                        <span>Sales: {product.sales}</span>
                        <span className="flex items-center gap-1">
                          Rating: {product.rating}
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {product.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white text-xs rounded-full border border-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={renewStockDialog === product.id} onOpenChange={(open) => {
                        setRenewStockDialog(open ? product.id : null);
                        if (!open) setRenewQuantity('');
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Renew Stock
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Renew Stock</DialogTitle>
                            <DialogDescription>
                              Add more inventory for {product.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Product:</span>
                                <span>{product.name}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Current Stock:</span>
                                <span className={product.stock < 30 ? 'text-orange-600' : 'text-green-600'}>
                                  {product.stock} units
                                </span>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="renewQuantity">Quantity to Add</Label>
                              <Input
                                id="renewQuantity"
                                type="number"
                                min="1"
                                value={renewQuantity}
                                onChange={(e) => setRenewQuantity(e.target.value)}
                                placeholder="Enter quantity"
                              />
                            </div>
                            {renewQuantity && Number(renewQuantity) > 0 && (
                              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">New Stock Total:</span>
                                  <span className="text-green-600">
                                    {product.stock + Number(renewQuantity)} units
                                  </span>
                                </div>
                              </div>
                            )}
                            <Button 
                              onClick={() => handleRenewStock(product.id)} 
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              disabled={!renewQuantity || Number(renewQuantity) <= 0}
                            >
                              Confirm & Add Stock
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="bestsellers" className="mt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  <p>Top 3 Best Selling Products</p>
                </div>
              </div>
              <div className="space-y-4">
                {bestSellers.map((product, index) => (
                  <div key={product.id} className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shrink-0">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{product.name}</h3>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            {product.manufacturer}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 px-3 py-1 bg-purple-200 text-purple-800 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            {product.sales} sales
                          </span>
                          <span>Price: ₹{product.price}</span>
                          <span>Stock: {product.stock}</span>
                          <span className="flex items-center gap-1">
                            Rating: {product.rating}
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
