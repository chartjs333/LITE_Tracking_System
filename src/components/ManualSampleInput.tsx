import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useSamples } from '../context/SamplesContext';

interface ManualSampleInputProps {
  onClose: () => void;
}

const ManualSampleInput: React.FC<ManualSampleInputProps> = ({ onClose }) => {
  const [sampleCode, setSampleCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addSample } = useSamples();

  const validateSampleCode = (code: string): boolean => {
    // Sample code format validation
    // Example format: LAB-YYYY-MMDD-XXXX
    const regex = /^LAB-\d{4}-\d{4}-\d{4}$/;
    return regex.test(code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateSampleCode(sampleCode)) {
      setError('Invalid sample code format. Expected: LAB-YYYY-MMDD-XXXX');
      return;
    }

    setIsLoading(true);
    try {
      // Parse the sample code to extract information
      const [lab, year, date, sequence] = sampleCode.split('-');
      
      await addSample({
        type: 'Blood', // Default type, can be made selectable
        status: 'active',
        location: 'Pending',
        expirationDate: new Date(
          parseInt(year),
          parseInt(date.substring(0, 2)) - 1,
          parseInt(date.substring(2))
        ).toISOString(),
        operator: 'Current User', // Should come from auth context
        freezeThawCount: 0
      });

      onClose();
    } catch (error) {
      setError('Failed to add sample. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Manual Sample Entry
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sampleCode" className="block text-sm font-medium text-gray-700">
              Sample Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="sampleCode"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value.toUpperCase())}
                className="input"
                placeholder="LAB-YYYY-MMDD-XXXX"
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Format: LAB-YYYY-MMDD-XXXX (e.g., LAB-2024-0320-0001)
            </p>
          </div>

          {error && (
            <div className="flex items-center p-4 bg-red-50 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Adding...' : 'Add Sample'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualSampleInput;