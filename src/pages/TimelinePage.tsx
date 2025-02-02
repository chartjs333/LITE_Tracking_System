import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  TestTube,
  Thermometer,
  QrCode,
  ClipboardCheck,
  AlertCircle,
  Plus,
  User,
  Calendar,
  MapPin,
  MessageSquarePlus
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'creation' | 'storage' | 'scan' | 'check' | 'note';
  title: string;
  description: string;
  timestamp: string;
  operator: string;
  location?: string;
}

interface SampleDetails {
  id: string;
  status: 'active' | 'processing' | 'expired';
  type: string;
  location: string;
  lastUpdated: string;
  operator: string;
  temperature?: number;
}

const TimelinePage: React.FC = () => {
  const { sampleId } = useParams<{ sampleId: string }>();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [sampleDetails, setSampleDetails] = useState<SampleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Fetch timeline events and sample details
  useEffect(() => {
    const fetchTimelineData = async () => {
      setIsLoading(true);
      try {
        // API calls would go here
        // const [eventsResponse, detailsResponse] = await Promise.all([
        //   axios.get(`/api/samples/${sampleId}/timeline`),
        //   axios.get(`/api/samples/${sampleId}`)
        // ]);
        // setEvents(eventsResponse.data);
        // setSampleDetails(detailsResponse.data);

        // Mock data
        setEvents([
          {
            id: '1',
            type: 'creation',
            title: 'Sample Registered',
            description: 'Blood sample collected and registered in the system',
            timestamp: '2024-03-20T09:00:00Z',
            operator: 'Dr. Sarah Johnson',
            location: 'Lab Room 101'
          },
          {
            id: '2',
            type: 'storage',
            title: 'Stored in Freezer',
            description: 'Sample stored at -20°C',
            timestamp: '2024-03-20T09:15:00Z',
            operator: 'Tech John Smith',
            location: 'Freezer A, Slot B3'
          },
          {
            id: '3',
            type: 'scan',
            title: 'QR Code Scanned',
            description: 'Sample verified during weekly inventory check',
            timestamp: '2024-03-25T14:30:00Z',
            operator: 'Tech Emily Brown'
          },
          {
            id: '4',
            type: 'note',
            title: 'Analysis Note',
            description: 'Sample shows excellent viability after thawing',
            timestamp: '2024-03-26T11:20:00Z',
            operator: 'Dr. Michael Lee'
          }
        ]);

        setSampleDetails({
          id: sampleId || 'SAMPLE-001',
          status: 'active',
          type: 'Blood',
          location: 'Freezer A, Slot B3',
          lastUpdated: '2024-03-26T11:20:00Z',
          operator: 'Dr. Sarah Johnson',
          temperature: -20
        });
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sampleId) {
      fetchTimelineData();
    }
  }, [sampleId]);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'creation':
        return <TestTube className="h-6 w-6 text-green-500" />;
      case 'storage':
        return <Thermometer className="h-6 w-6 text-blue-500" />;
      case 'scan':
        return <QrCode className="h-6 w-6 text-purple-500" />;
      case 'check':
        return <ClipboardCheck className="h-6 w-6 text-amber-500" />;
      case 'note':
        return <MessageSquarePlus className="h-6 w-6 text-gray-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      // API call would go here
      // await axios.post(`/api/samples/${sampleId}/notes`, { note: newNote });
      
      // Optimistically add the note to the timeline
      const newEvent: TimelineEvent = {
        id: Date.now().toString(),
        type: 'note',
        title: 'Note Added',
        description: newNote,
        timestamp: new Date().toISOString(),
        operator: 'Current User', // Would come from auth context
      };

      setEvents(prev => [newEvent, ...prev]);
      setNewNote('');
      setShowNoteModal(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Timeline Events */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Sample Timeline</h1>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm transition-colors duration-150"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Note
                </button>
              </div>

              <div className="space-y-8">
                {events.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index !== events.length - 1 && (
                      <div className="absolute top-12 left-6 h-full w-px bg-gray-200" />
                    )}
                    <div className="relative flex gap-6">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                          {getEventIcon(event.type)}
                        </div>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                          <time className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </time>
                        </div>
                        <p className="mt-1 text-gray-700">{event.description}</p>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {event.operator}
                          </div>
                          {event.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Details Panel */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sample Details</h2>
              {sampleDetails && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Sample ID</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{sampleDetails.id}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1
                      ${sampleDetails.status === 'active' ? 'bg-green-100 text-green-800' :
                        sampleDetails.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}
                    `}>
                      {sampleDetails.status.charAt(0).toUpperCase() + sampleDetails.status.slice(1)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Type</label>
                    <p className="mt-1 text-gray-900">{sampleDetails.type}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Current Location</label>
                    <p className="mt-1 text-gray-900">{sampleDetails.location}</p>
                  </div>

                  {sampleDetails.temperature && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Temperature</label>
                      <p className="mt-1 text-gray-900">{sampleDetails.temperature}°C</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(sampleDetails.lastUpdated).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Registered By</label>
                    <p className="mt-1 text-gray-900">{sampleDetails.operator}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Note</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your note here..."
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm transition-colors duration-150"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelinePage;