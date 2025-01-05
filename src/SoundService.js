import { Audio } from 'expo-av';

// Load the startup sound
export const loadPlayer = async (music, setPlayer, setPlayerLoaded) => {
  try {
    const { sound } = await Audio.Sound.createAsync(music);
    setPlayer(sound);
    setPlayerLoaded(true);
  } catch (error) {
    console.error('Error loading sound:', error);
  }
};

// Play the sound
export const playPlayer = async (player) => {
  if (player) {
    await player.replayAsync(); // Stops and replays the sound from the beginning
  }
};

// Stop the sound
export const stopPlayer = async (player) => {
  if (player) {
    await player.stopAsync(); // Stops the playback
  }
};
