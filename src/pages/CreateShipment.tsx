import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  User, 
  Calendar,
  Clock,
  DollarSign,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface PackageItem {
  id: string;
  description: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  value: string;
  quantity: number;
}

const CreateShipmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Sender Info
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    senderCity: '',
    senderState: '',
    senderZip: '',
    
    // Recipient Info
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    recipientAddress: '',
    recipientCity: '',
    recipientState: '',
    recipientZip: '',
    
    // Shipment Details
    serviceType: 'standard',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    requireSignature: false,
    insuranceValue: '',
    
    // Package Items
    packages: [{
      id: '1',
      description: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      value: '',
      quantity: 1
    }] as PackageItem[]
  });

  const addPackage = () => {
    const newPackage: PackageItem = {
      id: (formData.packages.length + 1).toString(),
      description: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      value: '',
      quantity: 1
    };
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, newPackage]
    }));
  };

  const removePackage = (id: string) => {
    if (formData.packages.length > 1) {
      setFormData(prev => ({
        ...prev,
        packages: prev.packages.filter(pkg => pkg.id !== id)
      }));
    }
  };

  const updatePackage = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const updatePackageDimension = (id: string, dimension: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { 
          ...pkg, 
          dimensions: { ...pkg.dimensions, [dimension]: value }
        } : pkg
      )
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Shipment created:', formData);
    alert('Shipment created successfully!');
  };

  const steps = [
    { number: 1, title: 'Sender', icon: User },
    { number: 2, title: 'Recipient', icon: MapPin },
    { number: 3, title: 'Package Details', icon: Package },
    { number: 4, title: 'Service & Review', icon: Truck }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-yellow-500/30 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-800 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
              <ArrowLeft className="w-5 h-5 text-yellow-500" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Create New Shipment</h1>
              <p className="text-sm text-gray-400">Step {currentStep} of 4</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-yellow-500 border-yellow-500 text-black'
                    : isActive 
                    ? 'border-yellow-500 text-yellow-500'
                    : 'border-gray-600 text-gray-600'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-yellow-400' : isCompleted ? 'text-white' : 'text-gray-600'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    isCompleted ? 'bg-yellow-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 pb-24">
        {/* Step 1: Sender Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Sender Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.senderName}
                onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={formData.senderPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, senderPhone: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email Address"
              value={formData.senderEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, senderEmail: e.target.value }))}
              className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
            
            <input
              type="text"
              placeholder="Street Address *"
              value={formData.senderAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, senderAddress: e.target.value }))}
              className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
            
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City *"
                value={formData.senderCity}
                onChange={(e) => setFormData(prev => ({ ...prev, senderCity: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="State *"
                value={formData.senderState}
                onChange={(e) => setFormData(prev => ({ ...prev, senderState: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="ZIP Code *"
                value={formData.senderZip}
                onChange={(e) => setFormData(prev => ({ ...prev, senderZip: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Recipient Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Recipient Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.recipientName}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={formData.recipientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientPhone: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email Address"
              value={formData.recipientEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, recipientEmail: e.target.value }))}
              className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
            
            <input
              type="text"
              placeholder="Street Address *"
              value={formData.recipientAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
              className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
            
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City *"
                value={formData.recipientCity}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientCity: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="State *"
                value={formData.recipientState}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientState: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="ZIP Code *"
                value={formData.recipientZip}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientZip: e.target.value }))}
                className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Package Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-yellow-400">Package Details</h2>
              <button
                onClick={addPackage}
                className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.map((pkg, index) => (
              <div key={pkg.id} className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Package {index + 1}</h3>
                  {formData.packages.length > 1 && (
                    <button
                      onClick={() => removePackage(pkg.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Package Description *"
                    value={pkg.description}
                    onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Weight (lbs) *"
                      value={pkg.weight}
                      onChange={(e) => updatePackage(pkg.id, 'weight', e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={pkg.quantity}
                      onChange={(e) => updatePackage(pkg.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Length (in)"
                      value={pkg.dimensions.length}
                      onChange={(e) => updatePackageDimension(pkg.id, 'length', e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Width (in)"
                      value={pkg.dimensions.width}
                      onChange={(e) => updatePackageDimension(pkg.id, 'width', e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Height (in)"
                      value={pkg.dimensions.height}
                      onChange={(e) => updatePackageDimension(pkg.id, 'height', e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Declared Value ($)"
                    value={pkg.value}
                    onChange={(e) => updatePackage(pkg.id, 'value', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Service & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-yellow-400">Service Options & Review</h2>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Delivery Service</label>
              <div className="space-y-3">
                {[
                  { value: 'standard', label: 'Standard Delivery', price: '$15.99', time: '3-5 business days' },
                  { value: 'express', label: 'Express Delivery', price: '$25.99', time: '1-2 business days' },
                  { value: 'overnight', label: 'Overnight Delivery', price: '$45.99', time: 'Next business day' }
                ].map((service) => (
                  <label key={service.value} className="flex items-center p-4 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-yellow-500/40 transition-colors">
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.value}
                      checked={formData.serviceType === service.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.serviceType === service.value ? 'border-yellow-500 bg-yellow-500' : 'border-gray-400'
                    }`}>
                      {formData.serviceType === service.value && <div className="w-2 h-2 bg-black rounded-full m-0.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{service.label}</span>
                        <span className="font-bold text-yellow-400">{service.price}</span>
                      </div>
                      <p className="text-sm text-gray-400">{service.time}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                />
                <select
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                  className="bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                >
                  <option value="">Select Time Window</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>

              <textarea
                placeholder="Special delivery instructions..."
                value={formData.specialInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                rows={3}
                className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none"
              />

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="signature"
                  checked={formData.requireSignature}
                  onChange={(e) => setFormData(prev => ({ ...prev, requireSignature: e.target.checked }))}
                  className="w-4 h-4 text-yellow-500 bg-gray-900 border-gray-600 rounded focus:ring-yellow-500"
                />
                <label htmlFor="signature" className="text-sm text-gray-300">
                  Require signature on delivery (+$2.99)
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-400 mb-3">Shipment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">From:</span>
                  <span className="text-white">{formData.senderName || 'Sender name'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">To:</span>
                  <span className="text-white">{formData.recipientName || 'Recipient name'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Packages:</span>
                  <span className="text-white">{formData.packages.length} package(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-white capitalize">{formData.serviceType} delivery</span>
                </div>
                <hr className="border-gray-700 my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-yellow-400">Total:</span>
                  <span className="text-yellow-400">$25.99</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-yellow-500/30 p-4">
        <div className="flex justify-between space-x-4">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium transition-colors"
            >
              Create Shipment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentPage;