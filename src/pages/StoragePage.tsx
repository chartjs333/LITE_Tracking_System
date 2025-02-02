import React, { useState, useEffect } from 'react';
import { X, Plus, Move } from 'lucide-react';

interface Sample {
  id: string;
  position: string;
  status: 'available' | 'occupied' | 'expired';
  expirationDate?: string;
  temperature?: number;
  type?: string;
  notes?: string;
}

interface CellPosition {
  row: number;
  col: number;
}

const StoragePage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data - replace with API call
  const [samples, setSamples] = useState<Sample[]>([
    {
      id: 'SAMPLE-001',
      position: 'A1',
      status: 'occupied',
      expirationDate: '2024-12-31',
      temperature: -20,
      type: 'Blood',
      notes: 'Priority sample'
    },
    {
      id: 'SAMPLE-002',
      position: 'B3',
      status: 'expired',
      expirationDate: '2024-03-15',
      temperature: -20,
      type: 'Plasma',
      notes: 'Expired'
    }
  ]);

  const fetchSampleDetails = async (position: string) => {
    setIsLoading(true);
    try {
      // API call would go here
      // const response = await axios.get(`/api/samples/${position}`);
      // setSelectedSample(response.data);
      const sample = samples.find(s => s.position === position);
      setSelectedSample(sample || null);
    } catch (error) {
      console.error('Error fetching sample details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    const position = `${String.fromCharCode(65 + row)}${col + 1}`;
    setSelectedCell({ row, col });
    setIsSidebarOpen(true);
    fetchSampleDetails(position);
  };

  const getCellStatus = (row: number, col: number): 'available' | 'occupied' | 'expired' => {
    const position = `${String.fromCharCode(65 + row)}${col + 1}`;
    const sample = samples.find(s => s.position === position);
    return sample?.status || 'available';
  };

  const getCellColor = (status: 'available' | 'occupied' | 'expired'): string => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'expired':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Storage View</h1>
          <button
            className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm transition-colors duration-150"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Samples
          </button>
        </div>

        {/* Grid Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-10 gap-2 mb-4">
            {/* Column Headers */}
            <div className="col-start-2 col-span-10 grid grid-cols-10 gap-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="text-center text-sm font-medium text-gray-600">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Grid with Row Headers */}
            {Array.from({ length: 10 }, (_, row) => (
              <React.Fragment key={row}>
                <div className="flex items-center justify-center text-sm font-medium text-gray-600">
                  {String.fromCharCode(65 + row)}
                </div>
                {Array.from({ length: 10 }, (_, col) => (
                  <button
                    key={`${row}-${col}`}
                    onClick={() => handleCellClick(row, col)}
                    className={`
                      w-10 h-10 rounded-full 
                      ${getCellColor(getCellStatus(row, col))}
                      transition-all duration-150
                      flex items-center justify-center
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                    `}
                  >
                    <span className="sr-only">
                      Position {String.fromCharCode(65 + row)}{col + 1}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-2" />
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Occupied</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />
              <span className="text-sm text-gray-600">Expired</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed right-0 top-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Sample Details
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-150"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
            </div>
          ) : selectedSample ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sample ID</label>
                <p className="mt-1 text-lg font-semibold text-gray-900">{selectedSample.id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <p className="mt-1 text-lg text-gray-900">{selectedSample.position}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1
                  ${selectedSample.status === 'occupied' ? 'bg-blue-100 text-blue-800' : 
                    selectedSample.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {selectedSample.status.charAt(0).toUpperCase() + selectedSample.status.slice(1)}
                </span>
              </div>

              {selectedSample.expirationDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(selectedSample.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {selectedSample.temperature && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temperature</label>
                  <p className="mt-1 text-lg text-gray-900">{selectedSample.temperature}°C</p>
                </div>
              )}

              {selectedSample.type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sample Type</label>
                  <p className="mt-1 text-lg text-gray-900">{selectedSample.type}</p>
                </div>
              )}

              {selectedSample.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="mt-1 text-lg text-gray-900">{selectedSample.notes}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <Move className="h-5 w-5 mr-2" />
                  Move Sample
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No sample in this position
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoragePage;