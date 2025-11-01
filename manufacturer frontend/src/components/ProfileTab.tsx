import { Building2, User, Mail, Phone, MapPin, Globe, Edit, CheckCircle, Package } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ProfileTab() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2>EcoFemme Manufacturing</h2>
                <p className="text-gray-600">Owner: Priya Sharma</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>4.7</span>
                    <span className="text-sm text-gray-600">(245 reviews)</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Manufacturer
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="bg-black hover:bg-gray-800">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card className="border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5" />
              <h2>Business Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Business Name</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg">
                  EcoFemme Manufacturing
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Owner Name</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg">
                  Priya Sharma
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Business Description</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-sm">
                  Leading manufacturer of eco-friendly and sustainable menstrual health products. 
                  We specialize in organic cotton cloth pads, menstrual cups, and period underwear. 
                  Committed to women's health and environmental sustainability.
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Website</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-blue-600 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  https://ecofemme.com
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">GST Number</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg">
                  29ABCDE1234F1Z5
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Manufacturing License</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg">
                  MFG-2020-KA-12345
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-5 h-5" />
              <h2>Contact Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  priya@ecofemme.com
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  +91 9876543210
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Alternative Phone</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  +91 9876543211
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Address</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <p>123 Industrial Area, Phase 2</p>
                    <p>Bangalore, Karnataka 560058</p>
                    <p>India</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Factory Address</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <p>Plot No. 45, KIADB Industrial Area</p>
                    <p>Peenya, Bangalore 560058</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Business Stats */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5" />
            <h2>Business Statistics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl text-purple-600">15+</p>
              <p className="text-sm text-gray-600 mt-1">Years in Business</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl text-blue-600">50+</p>
              <p className="text-sm text-gray-600 mt-1">Active Vendors</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl text-green-600">2.5L+</p>
              <p className="text-sm text-gray-600 mt-1">Products Sold</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-3xl text-orange-600">100%</p>
              <p className="text-sm text-gray-600 mt-1">Eco-Friendly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Certifications */}
      <Card className="border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5" />
            <h2>Certifications & Compliance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>ISO 9001:2015</p>
              </div>
              <p className="text-sm text-gray-600">Quality Management System</p>
            </div>

            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>GOTS Certified</p>
              </div>
              <p className="text-sm text-gray-600">Global Organic Textile Standard</p>
            </div>

            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>FDA Approved</p>
              </div>
              <p className="text-sm text-gray-600">Medical Grade Products</p>
            </div>

            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>Fair Trade</p>
              </div>
              <p className="text-sm text-gray-600">Ethical Manufacturing</p>
            </div>

            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>Carbon Neutral</p>
              </div>
              <p className="text-sm text-gray-600">Net Zero Emissions</p>
            </div>

            <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p>Cruelty Free</p>
              </div>
              <p className="text-sm text-gray-600">No Animal Testing</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
