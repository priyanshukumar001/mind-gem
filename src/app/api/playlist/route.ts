import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Define types for Spotify API responses
interface SpotifyAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
}

interface SpotifyRecommendationsResponse {
  tracks: SpotifyTrack[];
}

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post<SpotifyAccessTokenResponse>(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
    throw new Error('Failed to fetch access token');
  }
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  const seedGenres =
    mood === 'happy' ? ['pop', 'dance'] :
    mood === 'sad' ? ['acoustic', 'blues'] :
    mood === 'calm' ? ['chill', 'ambient'] :
    ['pop']; // Default genres

  const targetEnergy = mood === 'happy' ? 0.8 : mood === 'sad' ? 0.3 : 0.5;

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get<SpotifyRecommendationsResponse>(
      'https://api.spotify.com/v1/recommendations',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seed_genres: seedGenres.join(','),
          target_energy: targetEnergy,
          limit: 10,
        },
      }
    );

    return NextResponse.json(response.data.tracks, { status: 200 });
  } catch (error) {
    console.error('Error fetching Spotify recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
