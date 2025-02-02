import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface QRCodeScannerProps {
  onClose: () => void;
  onScan?: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onClose, onScan }) => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Create instance of QR Scanner
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    const handleScan = async (decodedText: string) => {
      try {
        const scannedData = JSON.parse(decodedText);
        
        // API call to verify and get sample data
        try {
          // const response = await axios.get(`/api/samples/scan?qr=${scannedData.id}`);
          // const sampleData = response.data;
          
          // Call the onScan callback if provided
          if (onScan) {
            onScan(scannedData.id);
          }

          // Stop the scanner and navigate
          scanner.clear();
          navigate(`/timeline/${scannedData.id}`);
        } catch (error) {
          setError('Failed to verify sample. Please try again.');
        }
      } catch (error) {
        setError('Invalid QR code format');
      }
    };

    const handleError = (err: string) => {
      setError('Error accessing camera: ' + err);
    };

    // Render the scanner
    scanner.render(handleScan, handleError);

    // Cleanup on unmount
    return () => {
      scanner.clear();
    };
  }, [navigate, onScan]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Scan QR Code</h3>
          <button
            onClick={() => {
              onClose();
            }}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative">
          <div id="qr-reader" className="w-full" />
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Position the QR code within the frame to scan
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;