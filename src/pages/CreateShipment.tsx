import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, Truck, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';

// Types
interface Location {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
  supported_services: string[];
  is_office: boolean;
}

interface ServiceLevel {
  id: number;
  name: string;
  description: string;
  price_multiplier: number;
  estimated_delivery_days: number;
}

interface Package {
  description: string;
  weight_kg: number;
  dimensions_cm: string;
}

interface Address {
  address_line_1: string;
  address_line_2?: string;
  location: number;
  postal_code: string;
  landmark?: string;
  special_instructions?: string;
}

interface ContactData {
  full_name: string;
  phone_number: string;
  address: Address;
}

interface ShipmentData {
  id: number;
  tracking_number: string;
  sender_contact: number;
  receiver_contact: number;
  service_level: number;
  packages: Package[];
  created_at: string;
  status: string;
  delivery_type: 'pickup' | 'dropoff';
  office_location?: number;
}

// Mock API service
class ShipmentService {
  private baseUrl = 'https://linkafrex.onrender.com/api/v1/';
  private authToken = 'mock_token';

  async getLocations(): Promise<Location[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: 1, 
            name: 'Nairobi Main Office', 
            country: 'Kenya', 
            state: 'NR', 
            city: 'Nairobi', 
            supported_services: ['standard', 'express'],
            is_office: true
          },
          { 
            id: 2, 
            name: 'Lagos Warehouse', 
            country: 'Nigeria', 
            state: 'LA', 
            city: 'Lagos', 
            supported_services: ['standard', 'express', 'overnight'],
            is_office: true
          },
          { 
            id: 3, 
            name: 'Kampala', 
            country: 'Uganda', 
            state: 'KM', 
            city: 'Kampala', 
            supported_services: ['standard', 'express'],
            is_office: false
          },
          { 
            id: 4, 
            name: 'Dar es Salaam Branch', 
            country: 'Tanzania', 
            state: 'TX', 
            city: 'Dar es Salaam', 
            supported_services: ['standard'],
            is_office: true
          },
        ]);
      }, 500);
    });
  }

  async getServiceLevels(): Promise<ServiceLevel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Standard', description: '3-5 business days', price_multiplier: 1.0, estimated_delivery_days: 5 },
          { id: 2, name: 'Express', description: '1-2 business days', price_multiplier: 1.5, estimated_delivery_days: 2 },
          { id: 3, name: 'Overnight', description: 'Next business day', price_multiplier: 2.0, estimated_delivery_days: 1 },
        ]);
      }, 500);
    });
  }

  async createContact(contactData: ContactData & { contact_role: 'sender' | 'receiver' }): Promise<{ id: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Math.floor(Math.random() * 1000) + 100 });
      }, 800);
    });
  }

  async createShipment(shipmentData: Omit<ShipmentData, 'id' | 'tracking_number' | 'created_at'>): Promise<{ id: number; tracking_number: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000) + 1000,
          tracking_number: `SH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`
        });
      }, 1000);
    });
  }
}

const shipmentService = new ShipmentService();

export default function CreateShipmentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [serviceLevels, setServiceLevels] = useState<ServiceLevel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'dropoff'>('pickup');
  const [selectedOffice, setSelectedOffice] = useState<number>(0);

  // Form data
  const [senderData, setSenderData] = useState<ContactData>({
    full_name: '',
    phone_number: '',
    address: {
      address_line_1: '',
      address_line_2: '',
      location: 0,
      postal_code: '',
      landmark: '',
      special_instructions: ''
    }
  });

  const [receiverData, setReceiverData] = useState<ContactData>({
    full_name: '',
    phone_number: '',
    address: {
      address_line_1: '',
      address_line_2: '',
      location: 0,
      postal_code: '',
      landmark: '',
      special_instructions: ''
    }
  });

  const [selectedServiceLevel, setSelectedServiceLevel] = useState<number>(0);
  const [packages, setPackages] = useState<Package[]>([
    { description: '', weight_kg: 0, dimensions_cm: '' }
  ]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [locationsData, serviceLevelsData] = await Promise.all([
        shipmentService.getLocations(),
        shipmentService.getServiceLevels()
      ]);
      setLocations(locationsData);
      setServiceLevels(serviceLevelsData);
      // Set default office location if available
      const defaultOffice = locationsData.find(loc => loc.is_office);
      if (defaultOffice) {
        setSelectedOffice(defaultOffice.id);
      }
    } catch (err) {
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const addPackage = () => {
    setPackages([...packages, { description: '', weight_kg: 0, dimensions_cm: '' }]);
  };

  const removePackage = (index: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };

  const updatePackage = (index: number, field: keyof Package, value: string | number) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setPackages(updatedPackages);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (deliveryType === 'pickup') {
          return !!(
            senderData.full_name && 
            senderData.phone_number && 
            senderData.address.address_line_1 && 
            senderData.address.location > 0 && 
            senderData.address.postal_code
          );
        } else {
          return selectedOffice > 0;
        }
      case 2:
        return !!(
          receiverData.full_name && 
          receiverData.phone_number && 
          receiverData.address.address_line_1 && 
          receiverData.address.location > 0 && 
          receiverData.address.postal_code
        );
      case 3:
        return selectedServiceLevel > 0;
      case 4:
        return packages.every(pkg => pkg.description && pkg.weight_kg > 0 && pkg.dimensions_cm);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError(null);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create sender contact (only needed for pickup)
      let senderContact = { id: 0 };
      if (deliveryType === 'pickup') {
        senderContact = await shipmentService.createContact({
          ...senderData,
          contact_role: 'sender'
        });
      }

      // Create receiver contact
      const receiverContact = await shipmentService.createContact({
        ...receiverData,
        contact_role: 'receiver'
      });

      // Create shipment payload
      const shipmentPayload = {
        sender_contact: deliveryType === 'pickup' ? senderContact.id : 0,
        receiver_contact: receiverContact.id,
        service_level: selectedServiceLevel,
        packages,
        created_at: new Date().toISOString(),
        status: 'processing',
        delivery_type: deliveryType,
        office_location: deliveryType === 'dropoff' ? selectedOffice : undefined
      };

      // Save to mock API
      const apiResponse = await shipmentService.createShipment(shipmentPayload);

      // Save to localStorage
      const savedShipments = JSON.parse(localStorage.getItem('shipments') || '[]');
      const newShipment = {
        ...shipmentPayload,
        id: apiResponse.id,
        tracking_number: apiResponse.tracking_number
      };
      const newShipments = [...savedShipments, newShipment];
      localStorage.setItem('shipments', JSON.stringify(newShipments));

      setSuccess(`Shipment created successfully! Tracking number: ${apiResponse.tracking_number}`);
      setCurrentStep(5);
      
      // Navigate to shipments page after 3 seconds
      setTimeout(() => navigate('/shipments'), 3000);
    } catch (err) {
      setError('Failed to create shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (shouldNavigate = false) => {
    setCurrentStep(1);
    setSenderData({
      full_name: '',
      phone_number: '',
      address: {
        address_line_1: '',
        address_line_2: '',
        location: 0,
        postal_code: '',
        landmark: '',
        special_instructions: ''
      }
    });
    setReceiverData({
      full_name: '',
      phone_number: '',
      address: {
        address_line_1: '',
        address_line_2: '',
        location: 0,
        postal_code: '',
        landmark: '',
        special_instructions: ''
      }
    });
    setSelectedServiceLevel(0);
    setPackages([{ description: '', weight_kg: 0, dimensions_cm: '' }]);
    setError(null);
    setSuccess(null);
    setDeliveryType('pickup');
    
    if (shouldNavigate) {
      navigate('/shipments');
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: deliveryType === 'pickup' ? 'Pickup Info' : 'Dropoff Info', icon: MapPin },
      { number: 2, title: 'Receiver Info', icon: User },
      { number: 3, title: 'Service Level', icon: Truck },
      { number: 4, title: 'Packages', icon: Package },
    ];

    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex flex-col items-center ${index > 0 ? 'ml-4' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted 
                    ? 'bg-[#800000] border-[#800000] text-white' 
                    : isActive 
                      ? 'border-[#800000] text-[#800000]' 
                      : 'border-[#D1D5DB] text-[#9CA3AF]'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`mt-2 text-sm ${isActive ? 'text-[#800000] font-medium' : 'text-[#6B7280]'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-[#800000]' : 'bg-[#E5E7EB]'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderContactForm = (
    data: ContactData,
    setData: React.Dispatch<React.SetStateAction<ContactData>>,
    title: string
  ) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Full Name *</label>
          <input
            type="text"
            value={data.full_name}
            onChange={(e) => setData({ ...data, full_name: e.target.value })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            placeholder="Enter full name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Phone Number *</label>
          <input
            type="tel"
            value={data.phone_number}
            onChange={(e) => setData({ ...data, phone_number: e.target.value })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            placeholder="+2547XXXXXXXX"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1F2937]">Address Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Address Line 1 *</label>
          <input
            type="text"
            value={data.address.address_line_1}
            onChange={(e) => setData({ 
              ...data, 
              address: { ...data.address, address_line_1: e.target.value }
            })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            placeholder="Street address"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Address Line 2</label>
          <input
            type="text"
            value={data.address.address_line_2}
            onChange={(e) => setData({ 
              ...data, 
              address: { ...data.address, address_line_2: e.target.value }
            })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            placeholder="Apartment, suite, etc."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Location *</label>
            <select
              value={data.address.location}
              onChange={(e) => setData({ 
                ...data, 
                address: { ...data.address, location: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
              required
            >
              <option value={0}>Select location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}, {location.state}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Postal Code *</label>
            <input
              type="text"
              value={data.address.postal_code}
              onChange={(e) => setData({ 
                ...data, 
                address: { ...data.address, postal_code: e.target.value }
              })}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
              placeholder="12345"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Landmark</label>
          <input
            type="text"
            value={data.address.landmark}
            onChange={(e) => setData({ 
              ...data, 
              address: { ...data.address, landmark: e.target.value }
            })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            placeholder="Near Central Park"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Special Instructions</label>
          <textarea
            value={data.address.special_instructions}
            onChange={(e) => setData({ 
              ...data, 
              address: { ...data.address, special_instructions: e.target.value }
            })}
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
            rows={3}
            placeholder="Ring doorbell twice, business hours: 9 AM - 5 PM"
          />
        </div>
      </div>
    </div>
  );

  const renderDeliveryTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
        {deliveryType === 'pickup' ? 'Pickup Information' : 'Dropoff Information'}
      </h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setDeliveryType('pickup')}
          className={`px-4 py-2 rounded-md border-2 ${
            deliveryType === 'pickup'
              ? 'border-[#800000] bg-[#FFF5F5] text-[#800000]'
              : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#FECACA]'
          }`}
        >
          Pickup From Sender
        </button>
        <button
          onClick={() => setDeliveryType('dropoff')}
          className={`px-4 py-2 rounded-md border-2 ${
            deliveryType === 'dropoff'
              ? 'border-[#800000] bg-[#FFF5F5] text-[#800000]'
              : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#FECACA]'
          }`}
        >
          Dropoff at Our Office
        </button>
      </div>

      {deliveryType === 'pickup' ? (
        renderContactForm(senderData, setSenderData, "Sender/Pickup Information")
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Select Office Location *</label>
            <select
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
              required
            >
              <option value={0}>Select office location</option>
              {locations
                .filter(location => location.is_office)
                .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}, {location.city}
                  </option>
                ))}
            </select>
          </div>
          <div className="bg-[#F9FAFB] p-4 rounded-md">
            <h3 className="font-medium text-[#1F2937] mb-2">Office Dropoff Instructions</h3>
            <p className="text-sm text-[#6B7280]">
              Please bring your package to the selected office during business hours (9AM-5PM, Monday-Friday).
              Ensure all items are properly packaged and labeled with the receiver's information.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderReceiverForm = () => (
    renderContactForm(receiverData, setReceiverData, "Receiver Information")
  );

  const renderServiceLevelSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Select Service Level</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceLevels.map((service) => (
          <div
            key={service.id}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
              selectedServiceLevel === service.id
                ? 'border-[#800000] bg-[#FFF5F5]'
                : 'border-[#E5E7EB] hover:border-[#FECACA]'
            }`}
            onClick={() => setSelectedServiceLevel(service.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1F2937]">{service.name}</h3>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedServiceLevel === service.id
                  ? 'border-[#800000] bg-[#800000]'
                  : 'border-[#D1D5DB]'
              }`} />
            </div>
            <p className="text-[#4B5563] mb-2">{service.description}</p>
            <p className="text-sm text-[#6B7280]">
              Price multiplier: {service.price_multiplier}x
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPackageForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1F2937]">Package Information</h2>
        <button
          onClick={addPackage}
          className="flex items-center px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#9B2C2C] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Package
        </button>
      </div>
      
      <div className="space-y-4">
        {packages.map((pkg, index) => (
          <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1F2937]">Package {index + 1}</h3>
              {packages.length > 1 && (
                <button
                  onClick={() => removePackage(index)}
                  className="text-[#DC2626] hover:text-[#B91C1C]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#374151] mb-2">Description *</label>
                <input
                  type="text"
                  value={pkg.description}
                  onChange={(e) => updatePackage(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                  placeholder="Books and clothes"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  value={pkg.weight_kg}
                  onChange={(e) => updatePackage(index, 'weight_kg', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                  placeholder="5.5"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-[#374151] mb-2">Dimensions (cm) *</label>
                <input
                  type="text"
                  value={pkg.dimensions_cm}
                  onChange={(e) => updatePackage(index, 'dimensions_cm', e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                  placeholder="30x20x15"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-[#10B981]" />
      </div>
      <h2 className="text-3xl font-bold text-[#1F2937]">Shipment Created Successfully!</h2>
      <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-lg p-6">
        <p className="text-[#065F46] font-medium">{success}</p>
        <p className="text-sm mt-2">
          Delivery Type: {deliveryType === 'pickup' ? 'Pickup from sender' : `Dropoff at ${locations.find(l => l.id === selectedOffice)?.name}`}
        </p>
      </div>
      <button
        onClick={() => resetForm(true)}
        className="px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-[#9B2C2C] transition-colors"
      >
        View All Shipments
      </button>
    </div>
  );

  if (loading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800000] mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-[#1F2937]">Create New Shipment</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep < 5 && renderStepIndicator()}
        
        {error && (
          <div className="mb-6 bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-[#DC2626] mr-2" />
            <p className="text-[#B91C1C]">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          {currentStep === 1 && renderDeliveryTypeSelection()}
          {currentStep === 2 && renderReceiverForm()}
          {currentStep === 3 && renderServiceLevelSelection()}
          {currentStep === 4 && renderPackageForm()}
          {currentStep === 5 && renderSuccessPage()}
        </div>

        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-md transition-colors ${
                currentStep === 1
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#4B5563] text-white hover:bg-[#374151]'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-[#9B2C2C] transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-[#9B2C2C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Shipment...
                  </>
                ) : (
                  'Create Shipment'
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}