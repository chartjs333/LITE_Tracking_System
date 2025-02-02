import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

interface Sample {
  id: string;
  type: string;
  status: 'active' | 'processing' | 'expired';
  location: string;
  expirationDate: string;
  operator: string;
  freezeThawCount: number;
}

interface TimelineEvent {
  id: string;
  sampleId: string;
  type: 'creation' | 'storage' | 'scan' | 'check' | 'note';
  title: string;
  description: string;
  timestamp: string;
  operator: string;
  location?: string;
}

interface SamplesContextType {
  samples: Sample[];
  timeline: TimelineEvent[];
  currentSample: Sample | null;
  loading: boolean;
  error: string | null;
  fetchSamples: () => Promise<void>;
  fetchSampleById: (id: string) => Promise<void>;
  fetchTimeline: (sampleId: string) => Promise<void>;
  addSample: (sample: Omit<Sample, 'id'>) => Promise<void>;
  updateSampleLocation: (id: string, newLocation: string) => Promise<void>;
  addTimelineEvent: (sampleId: string, event: Omit<TimelineEvent, 'id'>) => Promise<void>;
}

const SamplesContext = createContext<SamplesContextType | undefined>(undefined);

export const SamplesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [currentSample, setCurrentSample] = useState<Sample | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSamples = useCallback(async () => {
    setLoading(true);
    try {
      // const response = await axios.get('/api/samples');
      // setSamples(response.data);
      // Mock data
      setSamples([
        {
          id: 'SAMPLE-001',
          type: 'Blood',
          status: 'active',
          location: 'A1',
          expirationDate: '2024-12-31',
          operator: 'John Doe',
          freezeThawCount: 0
        }
      ]);
    } catch (error) {
      setError('Failed to fetch samples');
      console.error('Error fetching samples:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSampleById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      // const response = await axios.get(`/api/samples/${id}`);
      // setCurrentSample(response.data);
      const sample = samples.find(s => s.id === id);
      setCurrentSample(sample || null);
    } catch (error) {
      setError('Failed to fetch sample details');
      console.error('Error fetching sample:', error);
    } finally {
      setLoading(false);
    }
  }, [samples]);

  const fetchTimeline = useCallback(async (sampleId: string) => {
    setLoading(true);
    try {
      // const response = await axios.get(`/api/samples/${sampleId}/timeline`);
      // setTimeline(response.data);
      // Mock timeline data
      setTimeline([
        {
          id: '1',
          sampleId,
          type: 'creation',
          title: 'Sample Created',
          description: 'Sample registered in system',
          timestamp: new Date().toISOString(),
          operator: 'John Doe'
        }
      ]);
    } catch (error) {
      setError('Failed to fetch timeline');
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSample = useCallback(async (sample: Omit<Sample, 'id'>) => {
    setLoading(true);
    try {
      // const response = await axios.post('/api/samples', sample);
      // setSamples(prev => [...prev, response.data]);
      const newSample = { ...sample, id: `SAMPLE-${Date.now()}` };
      setSamples(prev => [...prev, newSample as Sample]);
    } catch (error) {
      setError('Failed to add sample');
      console.error('Error adding sample:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSampleLocation = useCallback(async (id: string, newLocation: string) => {
    setLoading(true);
    try {
      // await axios.patch(`/api/samples/${id}/location`, { location: newLocation });
      setSamples(prev =>
        prev.map(sample =>
          sample.id === id ? { ...sample, location: newLocation } : sample
        )
      );
    } catch (error) {
      setError('Failed to update sample location');
      console.error('Error updating location:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTimelineEvent = useCallback(async (sampleId: string, event: Omit<TimelineEvent, 'id'>) => {
    setLoading(true);
    try {
      // const response = await axios.post(`/api/samples/${sampleId}/timeline`, event);
      // setTimeline(prev => [...prev, response.data]);
      const newEvent = { ...event, id: `EVENT-${Date.now()}`, sampleId };
      setTimeline(prev => [...prev, newEvent as TimelineEvent]);
    } catch (error) {
      setError('Failed to add timeline event');
      console.error('Error adding event:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SamplesContext.Provider
      value={{
        samples,
        timeline,
        currentSample,
        loading,
        error,
        fetchSamples,
        fetchSampleById,
        fetchTimeline,
        addSample,
        updateSampleLocation,
        addTimelineEvent
      }}
    >
      {children}
    </SamplesContext.Provider>
  );
};

export const useSamples = () => {
  const context = useContext(SamplesContext);
  if (context === undefined) {
    throw new Error('useSamples must be used within a SamplesProvider');
  }
  return context;
};