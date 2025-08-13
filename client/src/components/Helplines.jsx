import { useState, useEffect } from 'react';
import Navbar from './Navigation/Navbar';

const Helplines = () => {
  const [location, setLocation] = useState(null);
  const [helplines, setHelplines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHelplinesByLocation = (country, region) => {
      const helplineData = {
        India: {
          National: [
            { name: 'National Mental Health Helpline', number: '1800-599-0019', description: '24/7 mental health support' },
            { name: 'Vandrevala Foundation', number: '1860-266-2345', description: 'Emotional support and crisis intervention' },
            { name: 'iCall Helpline', number: '022-25521111', description: 'Professional counseling support' },
            { name: 'Sneha Foundation', number: '044-24640050', description: 'Suicide prevention and emotional support' },
            { name: 'Emergency Services', number: '100', description: 'Police emergency' },
            { name: 'Ambulance Services', number: '102', description: 'Medical emergency' }
          ],
          Odisha: [
            { name: 'Odisha Mental Health Helpline', number: '1800-345-6789', description: 'State mental health support' },
            { name: 'Bhubaneswar Crisis Line', number: '0674-230-0000', description: 'Local crisis intervention' },
            { name: 'Odisha Police Helpline', number: '100', description: 'Emergency police assistance' },
            { name: 'Odisha Health Helpline', number: '104', description: 'Health information and support' }
          ],
          Bhubaneswar: [
            { name: 'Bhubaneswar Mental Health Support', number: '0674-230-0000', description: 'Local mental health assistance' },
            { name: 'Capital Hospital Helpline', number: '0674-239-0000', description: 'Medical and mental health support' },
            { name: 'Bhubaneswar Police Control', number: '100', description: 'Emergency police assistance' },
            { name: 'Odisha Crisis Intervention', number: '1800-345-6789', description: 'State crisis support' }
          ],
          Maharashtra: [
            { name: 'Mumbai Police Helpline', number: '022-22621855', description: 'Local crisis intervention' },
            { name: 'Mpower Helpline', number: '1800-120-820050', description: 'Mental health support in Maharashtra' }
          ],
          Delhi: [
            { name: 'Delhi Police Helpline', number: '011-23469000', description: 'Local crisis support' },
            { name: 'Delhi Mental Health Helpline', number: '011-22523435', description: 'Mental health assistance' }
          ],
          Karnataka: [
            { name: 'NIMHANS Helpline', number: '080-46110007', description: 'Professional mental health support' },
            { name: 'Karnataka Crisis Helpline', number: '104', description: 'State health crisis support' }
          ]
        }
      };

      const countryHelplines = helplineData[country] || helplineData['India'];
      return countryHelplines[region] || countryHelplines['National'];
    };

    const getDefaultHelplines = () => [
      { name: 'National Mental Health Helpline', number: '1800-599-0019', description: '24/7 mental health support' },
      { name: 'Vandrevala Foundation', number: '1860-266-2345', description: 'Emotional support and crisis intervention' },
      { name: 'Emergency Services', number: '100', description: 'Police emergency' },
      { name: 'Ambulance Services', number: '102', description: 'Medical emergency' }
    ];

    const fetchHelplines = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await response.json();

        const country = data.countryName;
        const region = data.locality || data.principalSubdivision;

        setLocation({ latitude: lat, longitude: lng, country, region });
        setHelplines(getHelplinesByLocation(country, region));
      } catch (err) {
        console.error('Error fetching location data:', err);
        setHelplines(getDefaultHelplines());
      } finally {
        setIsLoading(false);
      }
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchHelplines(latitude, longitude);
          },
          (err) => {
            console.error('Error getting location:', err);
            setError('Unable to get your location. Please enable location services or enter manually.');
            setIsLoading(false);
            setHelplines(getDefaultHelplines());
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setIsLoading(false);
        setHelplines(getDefaultHelplines());
      }
    };

    getCurrentLocation();
  }, []);

  const handleManualLocation = () => {
    alert('Please enable location services in your browser for automatic helpline detection.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Mental Health Helplines</h1>
          <p className="text-lg text-gray-600 mb-6">Get immediate support when you need it most</p>

          {location && location.country && (
            <div className="bg-white rounded-lg shadow-md p-4 inline-block mb-6">
              <p className="text-sm text-gray-500">Your Location</p>
              <p className="font-semibold text-purple-600">
                {location.region && location.region !== location.country
                  ? `${location.region}, ${location.country}`
                  : location.country}
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
            <p className="text-sm">{error}</p>
            <button
              onClick={handleManualLocation}
              className="text-yellow-800 underline text-sm mt-2 hover:text-yellow-900"
            >
              Learn more about location services
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {helplines.map((helpline, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">24/7 Available</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">{helpline.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{helpline.description}</p>

              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-gray-500 mb-1">Call or Text:</p>
                <p className="text-lg font-bold text-purple-600">{helpline.number}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto">
          <p>
            <strong>Important:</strong> These helplines provide crisis support and are not a replacement for professional mental health treatment.
            If you&apos;re experiencing a medical emergency, please call 100 (Police) or 102 (Ambulance) or go to the nearest hospital.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Helplines;