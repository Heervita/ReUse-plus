import { TrendingUp, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function IncomeTab() {
  const monthlyData = [
    { month: 'Jan', income: 45000, orders: 32 },
    { month: 'Feb', income: 52000, orders: 38 },
    { month: 'Mar', income: 48000, orders: 35 },
    { month: 'Apr', income: 61000, orders: 45 },
    { month: 'May', income: 55000, orders: 40 },
    { month: 'Jun', income: 67000, orders: 48 },
    { month: 'Jul', income: 72000, orders: 52 },
    { month: 'Aug', income: 68000, orders: 49 },
    { month: 'Sep', income: 75000, orders: 55 },
    { month: 'Oct', income: 82000, orders: 60 },
    { month: 'Nov', income: 0, orders: 0 },
    { month: 'Dec', income: 0, orders: 0 }
  ];

  const currentMonthIncome = 82000;
  const lastMonthIncome = 75000;
  const growthRate = ((currentMonthIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1);
  const totalYearlyIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
  const averageMonthlyIncome = Math.round(totalYearlyIncome / 10);

  const topProducts = [
    { name: 'Menstrual Cup - Medical Grade', revenue: 97038, units: 162 },
    { name: 'Organic Cotton Cloth Pads', revenue: 29302, units: 98 },
    { name: 'Period Underwear', revenue: 79911, units: 89 },
    { name: 'Reusable Panty Liners', revenue: 9154, units: 46 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Month</p>
              <p className="text-2xl mt-1">₹{currentMonthIncome.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+{growthRate}%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Yearly Income</p>
              <p className="text-2xl mt-1">₹{totalYearlyIncome.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Monthly Income</p>
              <p className="text-2xl mt-1">₹{averageMonthlyIncome.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-2xl mt-1">+{growthRate}%</p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Income Chart */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" />
            <h2>Monthly Income Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `₹${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#9333ea"
                strokeWidth={3}
                dot={{ fill: '#9333ea', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Orders Chart */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" />
            <h2>Monthly Orders</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Revenue Products */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5" />
            <h2>Top Revenue Products</h2>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                    #{index + 1}
                  </div>
                  <div>
                    <p>{product.name}</p>
                    <p className="text-sm text-gray-600">{product.units} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>₹{product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
