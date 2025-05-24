import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/generic/Card";
import {Package, Languages, List, Cog} from 'lucide-react';
import Link from 'next/link';

import '../globals.css'

const AdminDashboard: React.FC = () => {
  return (
      <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={18} />
                <span>Products</span>
              </CardTitle>
              <CardDescription>Manage product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add, edit, or remove products from your store.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/translations">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages size={18} />
                <span>Translations</span>
              </CardTitle>
              <CardDescription>Manage site translations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Edit translation key-value pairs for internationalization.</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/orders">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List size={18} />
                <span>Orders</span>
              </CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View and update order status and information.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/settings">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog size={18} />
                <span>Settings</span>
              </CardTitle>
              <CardDescription>Manage Site Settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View And Update Site Settings.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
