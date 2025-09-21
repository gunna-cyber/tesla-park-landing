import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DUMMY_PARKING_LOTS, DUMMY_BOOKINGS, ANALYTICS_DATA } from '@/data/dummyData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Car, CreditCard, Download, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedLot, setSelectedLot] = useState<string>('');
  const [vehicleDetails, setVehicleDetails] = useState({
    licensePlate: '',
    vehicleType: '',
    color: ''
  });
  const [activeBooking, setActiveBooking] = useState<string | null>('2'); // Mock active booking
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  if (!user) return null;

  const userBookings = DUMMY_BOOKINGS.filter(booking => booking.userId === user.id);
  const activeBookings = userBookings.filter(booking => booking.status === 'active');
  const completedBookings = userBookings.filter(booking => booking.status === 'completed');
  const totalSpent = userBookings.reduce((sum, booking) => sum + booking.cost, 0);

  const handleBookParkingSpot = () => {
    if (!selectedLot || !vehicleDetails.licensePlate || !vehicleDetails.vehicleType || !vehicleDetails.color) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock booking logic
    toast({
      title: "Booking Successful!",
      description: `Parking spot reserved at ${DUMMY_PARKING_LOTS.find(lot => lot.id === selectedLot)?.name}`,
    });

    setActiveBooking('new-booking');
    setIsBookingDialogOpen(false);
    setSelectedLot('');
    setVehicleDetails({ licensePlate: '', vehicleType: '', color: '' });
  };

  const handleMarkAsParked = () => {
    toast({
      title: "Status Updated",
      description: "Parking spot marked as occupied. Billing started.",
    });
  };

  const handleMarkAsReleased = () => {
    toast({
      title: "Spot Released",
      description: "Parking completed. Thank you for using Smart Parking!",
    });
    setActiveBooking(null);
  };

  const handleExportCSV = () => {
    // Mock CSV export
    const csvContent = "Slot ID,Spot ID,Start Time,End Time,Cost,Vehicle\n" +
      userBookings.map(booking => 
        `${booking.spotId},${booking.spotId},${booking.startTime.toISOString()},${booking.endTime?.toISOString() || 'Active'},${booking.cost},${booking.vehicleDetails.licensePlate}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parking-history.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your parking history has been downloaded as CSV file.",
    });
  };

  // Mock user-specific analytics
  const userAnalytics = {
    monthlyUsage: [
      { month: 'Jan', hours: 24, cost: 120 },
      { month: 'Feb', hours: 32, cost: 160 },
      { month: 'Mar', hours: 28, cost: 140 },
      { month: 'Apr', hours: 36, cost: 180 },
      { month: 'May', hours: 40, cost: 200 },
      { month: 'Jun', hours: 35, cost: 175 }
    ],
    favoriteSpots: [
      { name: 'Downtown Plaza', visits: 15 },
      { name: 'Shopping Mall', visits: 8 },
      { name: 'Airport Terminal A', visits: 5 },
      { name: 'Business District', visits: 2 }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Find and manage your parking spots</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBookings.length}</div>
              <p className="text-xs text-muted-foreground">Currently parked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBookings.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-green-600">Savings: $45.20</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Lots</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {DUMMY_PARKING_LOTS.filter(lot => lot.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Ready to book</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="book">Book Parking</TabsTrigger>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">My Analytics</TabsTrigger>
          </TabsList>

          {/* Book Parking Tab */}
          <TabsContent value="book" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Available Parking Lots</h2>
              <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!selectedLot}>
                    <Car className="h-4 w-4 mr-2" />
                    Book Selected Lot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Parking Spot</DialogTitle>
                    <DialogDescription>
                      Enter your vehicle details to complete the booking
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="licensePlate" className="text-right">
                        License Plate
                      </Label>
                      <Input
                        id="licensePlate"
                        value={vehicleDetails.licensePlate}
                        onChange={(e) => setVehicleDetails(prev => ({ ...prev, licensePlate: e.target.value }))}
                        className="col-span-3"
                        placeholder="ABC-1234"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="vehicleType" className="text-right">
                        Vehicle Type
                      </Label>
                      <Select value={vehicleDetails.vehicleType} onValueChange={(value) => setVehicleDetails(prev => ({ ...prev, vehicleType: value }))}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sedan">Sedan</SelectItem>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="Hatchback">Hatchback</SelectItem>
                          <SelectItem value="Truck">Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="color" className="text-right">
                        Color
                      </Label>
                      <Select value={vehicleDetails.color} onValueChange={(value) => setVehicleDetails(prev => ({ ...prev, color: value }))}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Black">Black</SelectItem>
                          <SelectItem value="White">White</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Blue">Blue</SelectItem>
                          <SelectItem value="Red">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBookParkingSpot}>Confirm Booking</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {DUMMY_PARKING_LOTS.filter(lot => lot.status === 'active').map((lot) => (
                <Card 
                  key={lot.id} 
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    selectedLot === lot.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLot(selectedLot === lot.id ? '' : lot.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {lot.name}
                          <Badge variant="default">Available</Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {lot.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${lot.pricePerHour}/hr</div>
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
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold text-green-600">{lot.totalSpots - lot.occupiedSpots}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Occupancy</p>
                        <p className="text-lg font-semibold">{Math.round((lot.occupiedSpots / lot.totalSpots) * 100)}%</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={(lot.occupiedSpots / lot.totalSpots) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Bookings Tab */}
          <TabsContent value="active" className="space-y-6">
            <h2 className="text-2xl font-semibold">Active Bookings</h2>
            
            {activeBooking ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Shopping Mall Complex - Spot S045
                    <Badge>Active</Badge>
                  </CardTitle>
                  <CardDescription>456 Mall Ave, City Center</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle</p>
                      <p className="font-semibold">XYZ-5678 - White SUV</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Started</p>
                      <p className="font-semibold">Today 2:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="font-semibold">$3.50/hour</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleMarkAsParked} variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Parked
                    </Button>
                    <Button onClick={handleMarkAsReleased} variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Release Spot
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No active bookings</p>
                  <p className="text-sm text-muted-foreground">Book a parking spot to get started</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Parking History</h2>
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="grid gap-4">
              {userBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {DUMMY_PARKING_LOTS.find(lot => lot.id === booking.lotId)?.name} - Spot {booking.spotId}
                          </h3>
                          <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {booking.vehicleDetails.licensePlate} - {booking.vehicleDetails.color} {booking.vehicleDetails.vehicleType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.startTime.toLocaleString()} 
                          {booking.endTime && ` - ${booking.endTime.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${booking.cost.toFixed(2)}</div>
                        <p className="text-sm text-muted-foreground">
                          {booking.endTime ? 
                            `${Math.round((booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60))} hours` :
                            'Active'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Parking Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Usage & Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userAnalytics.monthlyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={2} name="Hours Parked" />
                      <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={2} name="Amount Spent ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Favorite Spots */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Used Parking Lots</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userAnalytics.favoriteSpots}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visits" fill="#8884d8" name="Visits" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.2 hours</div>
                  <p className="text-sm text-muted-foreground">Per parking session</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Most Used Lot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Downtown Plaza</div>
                  <p className="text-sm text-muted-foreground">15 visits this year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$162</div>
                  <p className="text-sm text-muted-foreground">Spent on parking</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};