import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  sampleId: string;
  size?: number;
  includeMargin?: boolean;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  sampleId,
  size = 128,
  includeMargin = true,
}) => {
  // Generate QR code data in a specific format
  const qrData = JSON.stringify({
    id: sampleId,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
      <QRCodeSVG
        value={qrData}
        size={size}
        level="H" // High error correction level
        includeMargin={includeMargin}
        className="mx-auto"
      />
      <div className="mt-2 text-center text-sm text-gray-600">{sampleId}</div>
    </div>
  );
};

export default QRCodeGenerator;