export interface ParkingLot {
  id: string;
  name: string;
  location: string;
  totalSpots: number;
  occupiedSpots: number;
  pricePerHour: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface ParkingSpot {
  id: string;
  lotId: string;
  spotNumber: string;
  status: 'available' | 'occupied' | 'reserved';
  userId?: string;
  vehicleDetails?: {
    licensePlate: string;
    vehicleType: string;
    color: string;
  };
  parkedAt?: Date;
  reservedAt?: Date;
}

export interface Booking {
  id: string;
  userId: string;
  spotId: string;
  lotId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'cancelled';
  cost: number;
  vehicleDetails: {
    licensePlate: string;
    vehicleType: string;
    color: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  totalBookings: number;
  totalSpent: number;
  joinedAt: Date;
}

// Dummy Parking Lots
export const DUMMY_PARKING_LOTS: ParkingLot[] = [
  {
    id: '1',
    name: 'Downtown Plaza',
    location: '123 Main St, Downtown',
    totalSpots: 50,
    occupiedSpots: 32,
    pricePerHour: 5.00,
    status: 'active',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Shopping Mall Complex',
    location: '456 Mall Ave, City Center',
    totalSpots: 120,
    occupiedSpots: 85,
    pricePerHour: 3.50,
    status: 'active',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Airport Terminal A',
    location: 'Airport Rd, Terminal A',
    totalSpots: 200,
    occupiedSpots: 150,
    pricePerHour: 8.00,
    status: 'active',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'Business District',
    location: '789 Corporate Blvd',
    totalSpots: 75,
    occupiedSpots: 0,
    pricePerHour: 6.00,
    status: 'inactive',
    createdAt: new Date('2024-03-01')
  }
];

// Generate dummy parking spots
export const DUMMY_PARKING_SPOTS: ParkingSpot[] = [];

DUMMY_PARKING_LOTS.forEach(lot => {
  for (let i = 1; i <= lot.totalSpots; i++) {
    const isOccupied = i <= lot.occupiedSpots;
    DUMMY_PARKING_SPOTS.push({
      id: `${lot.id}-${i}`,
      lotId: lot.id,
      spotNumber: `${lot.name.charAt(0)}${i.toString().padStart(3, '0')}`,
      status: isOccupied ? 'occupied' : 'available',
      userId: isOccupied ? `user-${Math.floor(Math.random() * 10) + 1}` : undefined,
      vehicleDetails: isOccupied ? {
        licensePlate: `ABC-${Math.floor(Math.random() * 9000) + 1000}`,
        vehicleType: ['Sedan', 'SUV', 'Hatchback', 'Truck'][Math.floor(Math.random() * 4)],
        color: ['Black', 'White', 'Silver', 'Blue', 'Red'][Math.floor(Math.random() * 5)]
      } : undefined,
      parkedAt: isOccupied ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) : undefined
    });
  }
});

// Dummy Users
export const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@parkingsystem.com',
    phone: '+1-555-0001',
    role: 'admin',
    totalBookings: 0,
    totalSpent: 0,
    joinedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+1-555-0002',
    role: 'user',
    totalBookings: 25,
    totalSpent: 347.50,
    joinedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0003',
    role: 'user',
    totalBookings: 18,
    totalSpent: 225.75,
    joinedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1-555-0004',
    role: 'user',
    totalBookings: 32,
    totalSpent: 456.25,
    joinedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1-555-0005',
    role: 'user',
    totalBookings: 14,
    totalSpent: 189.50,
    joinedAt: new Date('2024-02-01')
  }
];

// Dummy Bookings
export const DUMMY_BOOKINGS: Booking[] = [
  {
    id: '1',
    userId: '2',
    spotId: '1-15',
    lotId: '1',
    startTime: new Date('2024-03-15T09:00:00'),
    endTime: new Date('2024-03-15T12:00:00'),
    status: 'completed',
    cost: 15.00,
    vehicleDetails: {
      licensePlate: 'ABC-1234',
      vehicleType: 'Sedan',
      color: 'Black'
    }
  },
  {
    id: '2',
    userId: '3',
    spotId: '2-45',
    lotId: '2',
    startTime: new Date('2024-03-16T14:00:00'),
    status: 'active',
    cost: 0,
    vehicleDetails: {
      licensePlate: 'XYZ-5678',
      vehicleType: 'SUV',
      color: 'White'
    }
  },
  {
    id: '3',
    userId: '2',
    spotId: '3-100',
    lotId: '3',
    startTime: new Date('2024-03-14T06:00:00'),
    endTime: new Date('2024-03-14T18:00:00'),
    status: 'completed',
    cost: 96.00,
    vehicleDetails: {
      licensePlate: 'ABC-1234',
      vehicleType: 'Sedan',
      color: 'Black'
    }
  }
];

// Analytics Data
export const ANALYTICS_DATA = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18900 },
    { month: 'Apr', revenue: 16800 },
    { month: 'May', revenue: 21300 },
    { month: 'Jun', revenue: 19700 }
  ],
  lotUtilization: [
    { name: 'Downtown Plaza', utilization: 64 },
    { name: 'Shopping Mall', utilization: 71 },
    { name: 'Airport Terminal A', utilization: 75 },
    { name: 'Business District', utilization: 0 }
  ],
  userActivity: [
    { date: '2024-03-10', bookings: 45 },
    { date: '2024-03-11', bookings: 52 },
    { date: '2024-03-12', bookings: 38 },
    { date: '2024-03-13', bookings: 61 },
    { date: '2024-03-14', bookings: 49 },
    { date: '2024-03-15', bookings: 56 },
    { date: '2024-03-16', bookings: 43 }
  ]
};