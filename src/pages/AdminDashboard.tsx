import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DUMMY_PARKING_LOTS, DUMMY_PARKING_SPOTS, DUMMY_USERS, ANALYTICS_DATA } from '@/data/dummyData';
import { Building, Car, Users, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdminDashboard = () => {
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const totalLots = DUMMY_PARKING_LOTS.length;
  const activeLots = DUMMY_PARKING_LOTS.filter(lot => lot.status === 'active').length;
  const totalSpots = DUMMY_PARKING_LOTS.reduce((sum, lot) => sum + lot.totalSpots, 0);
  const occupiedSpots = DUMMY_PARKING_LOTS.reduce((sum, lot) => sum + lot.occupiedSpots, 0);
  const totalUsers = DUMMY_USERS.filter(user => user.role === 'user').length;
  const totalRevenue = 45750; // Mock revenue

  const lotSpots = selectedLot ? DUMMY_PARKING_SPOTS.filter(spot => spot.lotId === selectedLot) : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage parking lots, spots, and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parking Lots</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLots}</div>
              <p className="text-xs text-muted-foreground">
                {activeLots} active, {totalLots - activeLots} inactive
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parking Spots</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSpots}</div>
              <p className="text-xs text-muted-foreground">
                {occupiedSpots} occupied ({Math.round((occupiedSpots / totalSpots) * 100)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-green-600">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="lots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lots">Parking Lots</TabsTrigger>
            <TabsTrigger value="spots" disabled={!selectedLot}>Parking Spots</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Parking Lots Tab */}
          <TabsContent value="lots" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Parking Lots Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Lot
              </Button>
            </div>

            <div className="grid gap-6">
              {DUMMY_PARKING_LOTS.map((lot) => (
                <Card key={lot.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {lot.name}
                          <Badge variant={lot.status === 'active' ? 'default' : 'secondary'}>
                            {lot.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{lot.location}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedLot(lot.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Spots
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={lot.occupiedSpots > 0}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Spots</p>
                        <p className="text-2xl font-bold">{lot.totalSpots}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Occupied</p>
                        <p className="text-2xl font-bold text-red-600">{lot.occupiedSpots}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold text-green-600">{lot.totalSpots - lot.occupiedSpots}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Occupancy Rate</span>
                        <span>{Math.round((lot.occupiedSpots / lot.totalSpots) * 100)}%</span>
                      </div>
                      <Progress value={(lot.occupiedSpots / lot.totalSpots) * 100} />
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                      <span>Rate: ${lot.pricePerHour}/hour</span>
                      <span>Created: {lot.createdAt.toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Parking Spots Tab */}
          <TabsContent value="spots" className="space-y-6">
            {selectedLot ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">
                    Parking Spots - {DUMMY_PARKING_LOTS.find(l => l.id === selectedLot)?.name}
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedLot(null)}>
                    Back to Lots
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {lotSpots.map((spot) => (
                    <Card 
                      key={spot.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        spot.status === 'occupied' 
                          ? 'border-red-200 bg-red-50' 
                          : spot.status === 'reserved'
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{spot.spotNumber}</div>
                          <Badge 
                            variant={
                              spot.status === 'occupied' ? 'destructive' : 
                              spot.status === 'reserved' ? 'secondary' : 'default'
                            }
                            className="mt-2"
                          >
                            {spot.status}
                          </Badge>
                          {spot.vehicleDetails && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              <div>{spot.vehicleDetails.licensePlate}</div>
                              <div>{spot.vehicleDetails.vehicleType}</div>
                              <div>{spot.vehicleDetails.color}</div>
                              {spot.parkedAt && (
                                <div className="mt-1">
                                  Since: {spot.parkedAt.toLocaleTimeString()}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a parking lot to view its spots</p>
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-semibold">Registered Users</h2>
            
            <div className="grid gap-4">
              {DUMMY_USERS.filter(user => user.role === 'user').map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total Bookings</div>
                        <div className="text-2xl font-bold">{user.totalBookings}</div>
                        <div className="text-sm text-green-600">${user.totalSpent}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                      <span>Member since: {user.joinedAt.toLocaleDateString()}</span>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ANALYTICS_DATA.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Lot Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle>Lot Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ANALYTICS_DATA.lotUtilization}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="utilization"
                      >
                        {ANALYTICS_DATA.lotUtilization.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Daily Bookings Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ANALYTICS_DATA.userActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};