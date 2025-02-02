import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BarChart2, 
  Info, 
  ChevronUp, 
  ChevronDown,
  X,
  Loader2,
  QrCode,
  Plus,
  Keyboard
} from 'lucide-react';
import QRCodeScanner from '../components/QRCodeScanner';
import QRCodeGenerator from '../components/QRCodeGenerator';
import ManualSampleInput from '../components/ManualSampleInput';

interface Sample {
  id: string;
  type: 'Blood' | 'DNA' | 'Tissue';
  status: 'active' | 'expired' | 'processing';
  expirationDate: string;
  freezeThawCount: number;
  operator: string;
  collectionDate: string;
  location: string;
}

interface FilterState {
  search: string;
  type: string;
  status: string;
  operator: string;
  dateRange: {
    start: string;
    end: string;
  };
}

const SamplesPage: React.FC = () => {
  const navigate = useNavigate();
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Sample;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: '',
    status: '',
    operator: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  useEffect(() => {
    const fetchSamples = async () => {
      setIsLoading(true);
      try {
        setSamples([
          {
            id: 'SAMPLE-001',
            type: 'Blood',
            status: 'active',
            expirationDate: '2024-12-31',
            freezeThawCount: 2,
            operator: 'John Doe',
            collectionDate: '2024-01-15',
            location: 'A1'
          },
          {
            id: 'SAMPLE-002',
            type: 'DNA',
            status: 'processing',
            expirationDate: '2024-11-30',
            freezeThawCount: 0,
            operator: 'Jane Smith',
            collectionDate: '2024-02-01',
            location: 'B3'
          },
        ]);
      } catch (error) {
        console.error('Error fetching samples:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSamples();
  }, []);

  const handleSort = (key: keyof Sample) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const handleGenerateQR = (sampleId: string) => {
    setShowQRCode(sampleId);
  };

  const sortedSamples = React.useMemo(() => {
    if (!sortConfig) return samples;

    return [...samples].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [samples, sortConfig]);

  const filteredSamples = React.useMemo(() => {
    return sortedSamples.filter(sample => {
      const matchesSearch = sample.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        sample.operator.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = !filters.type || sample.type === filters.type;
      const matchesStatus = !filters.status || sample.status === filters.status;
      const matchesOperator = !filters.operator || sample.operator === filters.operator;
      
      const sampleDate = new Date(sample.collectionDate);
      const matchesDateRange = (!filters.dateRange.start || sampleDate >= new Date(filters.dateRange.start)) &&
        (!filters.dateRange.end || sampleDate <= new Date(filters.dateRange.end));

      return matchesSearch && matchesType && matchesStatus && matchesOperator && matchesDateRange;
    });
  }, [sortedSamples, filters]);

  const stats = React.useMemo(() => {
    return {
      total: samples.length,
      byStatus: {
        active: samples.filter(s => s.status === 'active').length,
        processing: samples.filter(s => s.status === 'processing').length,
        expired: samples.filter(s => s.status === 'expired').length
      },
      byType: {
        Blood: samples.filter(s => s.type === 'Blood').length,
        DNA: samples.filter(s => s.type === 'DNA').length,
        Tissue: samples.filter(s => s.type === 'Tissue').length
      }
    };
  }, [samples]);

  const getSortIcon = (key: keyof Sample) => {
    if (sortConfig?.key !== key) {
      return <Filter className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-amber-500" /> : 
      <ChevronDown className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Samples List</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowManualInput(true)}
              className="btn-secondary"
            >
              <Keyboard className="h-5 w-5 mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setShowScanner(true)}
              className="btn-primary"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="btn-secondary"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        {showStats && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Sample Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">By Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active</span>
                    <span className="font-medium">{stats.byStatus.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing</span>
                    <span className="font-medium">{stats.byStatus.processing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expired</span>
                    <span className="font-medium">{stats.byStatus.expired}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">By Type</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Blood</span>
                    <span className="font-medium">{stats.byType.Blood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DNA</span>
                    <span className="font-medium">{stats.byType.DNA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tissue</span>
                    <span className="font-medium">{stats.byType.Tissue}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Samples</h3>
                <p className="text-3xl font-bold text-amber-500">{stats.total}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Search samples..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="Blood">Blood</option>
                <option value="DNA">DNA</option>
                <option value="Tissue">Tissue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="processing">Processing</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: 'id', label: 'Sample ID' },
                    { key: 'type', label: 'Type' },
                    { key: 'status', label: 'Status' },
                    { key: 'expirationDate', label: 'Expiration Date' },
                    { key: 'freezeThawCount', label: 'Freeze/Thaw Count' },
                    { key: 'operator', label: 'Operator' },
                    { key: 'location', label: 'Location' },
                    { key: 'actions', label: '' }
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => key !== 'actions' && handleSort(key as keyof Sample)}
                      className={`
                        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                        ${key !== 'actions' ? 'cursor-pointer hover:bg-gray-100' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        {key !== 'actions' && getSortIcon(key as keyof Sample)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-500" />
                    </td>
                  </tr>
                ) : filteredSamples.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      No samples found
                    </td>
                  </tr>
                ) : (
                  filteredSamples.map((sample) => (
                    <tr
                      key={sample.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sample.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sample.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${sample.status === 'active' ? 'bg-green-100 text-green-800' :
                            sample.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}
                        `}>
                          {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sample.expirationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sample.freezeThawCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sample.operator}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sample.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleGenerateQR(sample.id)}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            <QrCode className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/timeline/${sample.id}`)}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            <Info className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showScanner && (
          <QRCodeScanner
            onClose={() => setShowScanner(false)}
            onScan={(data) => {
              console.log('Scanned data:', data);
              setShowScanner(false);
            }}
          />
        )}

        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sample QR Code</h3>
                <button
                  onClick={() => setShowQRCode(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <QRCodeGenerator sampleId={showQRCode} size={256} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm transition-colors duration-150"
                >
                  Print QR Code
                </button>
              </div>
            </div>
          </div>
        )}

        {showManualInput && (
          <ManualSampleInput onClose={() => setShowManualInput(false)} />
        )}
      </div>
    </div>
  );
};

export default SamplesPage;