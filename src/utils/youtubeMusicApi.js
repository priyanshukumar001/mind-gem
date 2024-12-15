'use server';
import axios from 'axios';

// YouTube Music API URL
const YOUTUBE_MUSIC_API_URL = 'https://www.googleapis.com/youtube/v3/search'; // Example endpoint
const YOUTUBE_API_KEY = 'AIzaSyAXyeIJudX416dErbgXLnrrJpi6DlvV1Vo';
// Fetch mood-based songs from YouTube Music API
const fetchMoodBasedSongs = async (mood) => {
  try {
    let searchQuery = `${mood} music`;
    
    // Define parameters based on mood
    switch (mood.toLowerCase()) {
      case 'happy':
        searchQuery = 'happy music';
        break;
      case 'sad':
        searchQuery = 'sad music';
        break;
      case 'energetic':
        searchQuery = 'energetic music';
        break;
      case 'calm':
        searchQuery = 'calm music';
        break;
      default:
        searchQuery = 'music'; // Default search if mood is not recognized
    }

    const response = await axios.get(YOUTUBE_MUSIC_API_URL, {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: 10,
        key: process.env.YOUTUBE_API_KEY || YOUTUBE_API_KEY, // Ensure you have your YouTube API key in your environment variables
      },
    });

    // Map the response to the desired structure
    return response.data.items.map((item) => ({
      title: item.snippet.title,
      artists: item.snippet.channelTitle ? [item.snippet.channelTitle] : [], // YouTube doesn't have a direct artist field
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error fetching mood-based songs:', error);
    return [];
  }
};

export default fetchMoodBasedSongs;