"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Checkout = () => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    if (!customerDetails.name.trim()) {
      setMessage("Please enter your name");
      setIsError(true);
      return false;
    }
    if (!customerDetails.email.trim() || !customerDetails.email.includes("@")) {
      setMessage("Please enter a valid email address");
      setIsError(true);
      return false;
    }
    if (!customerDetails.address.trim()) {
      setMessage("Please enter your address");
      setIsError(true);
      return false;
    }
    if (!customerDetails.city.trim()) {
      setMessage("Please enter your city");
      setIsError(true);
      return false;
    }
    if (!customerDetails.postalCode.trim()) {
      setMessage("Please enter your postal code");
      setIsError(true);
      return false;
    }
    if (!customerDetails.country.trim()) {
      setMessage("Please enter your country");
      setIsError(true);
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      setIsError(false);
      setIsSuccess(false);

      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/orders/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerDetails.name,
          customerEmail: customerDetails.email,
          customerAddress: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.postalCode}, ${customerDetails.country}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'Failed to place order'
        }));
        throw new Error(errorData.error || 'Failed to place order');
      }

      const data = await response.json();
      setIsSuccess(true);
      setMessage("Order placed successfully! Your order ID is: " + data.sanityOrderId);
      
      // Reset form
      setCustomerDetails({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: ""
      });
      
    } catch (error: any) {
      console.error('Order error:', error);
      setIsError(true);
      setMessage(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <p className="text-blue-100 mt-1">Please enter your details below</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                      value={customerDetails.email}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <textarea
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="123 Main St, Apt 4B"
                    value={customerDetails.address}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New York"
                      value={customerDetails.city}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10001"
                      value={customerDetails.postalCode}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="United States"
                    value={customerDetails.country}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        country: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]
                ${isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </button>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
                isError 
                  ? "bg-red-50 text-red-700" 
                  : "bg-green-50 text-green-700"
              }`}>
                {isError ? (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;