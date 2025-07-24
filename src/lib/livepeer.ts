// Livepeer configuration
export const LIVEPEER_GATEWAY_URL = 'https://livepeer-studio.com/api';

export interface StreamData {
  id: string;
  name: string;
  playbackId?: string;
  streamKey?: string;
  isActive: boolean;
  createdAt: string;
  lastSeen?: string;
}

export interface StreamSession {
  id: string;
  streamId: string;
  createdAt: string;
  lastSeen: string;
  sourceSegments: number;
  transcodedSegments: number;
  sourceSegmentsDuration: number;
  transcodedSegmentsDuration: number;
}

// Mock data for development/demo purposes
export const mockStreams: StreamData[] = [
  {
    id: 'stream-1',
    name: 'Brew & Bloom Café Live',
    playbackId: 'demo-playback-1',
    streamKey: 'demo-key-1',
    isActive: true,
    createdAt: '2025-01-21T20:30:00Z',
    lastSeen: '2025-01-21T23:45:00Z'
  },
  {
    id: 'stream-2', 
    name: 'Maya\'s Art Studio Workshop',
    playbackId: 'demo-playback-2',
    streamKey: 'demo-key-2',
    isActive: false,
    createdAt: '2025-01-21T18:00:00Z',
    lastSeen: '2025-01-21T20:15:00Z'
  },
  {
    id: 'stream-3',
    name: 'Sunset Skate Community Event',
    playbackId: 'demo-playback-3', 
    streamKey: 'demo-key-3',
    isActive: true,
    createdAt: '2025-01-21T19:30:00Z',
    lastSeen: '2025-01-21T23:50:00Z'
  }
];