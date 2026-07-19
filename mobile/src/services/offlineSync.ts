import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { API_URL } from '../config/api';

const QUEUE_KEY = '@vote_queue';

export class OfflineSyncService {
  /**
   * Queues a vote if offline, or sends immediately if online.
   */
  static async queueOrSendVote(electionId: string, encryptedPayload: string, token: string) {
    const networkState = await Network.getNetworkStateAsync();
    
    if (networkState.isConnected && networkState.isInternetReachable) {
      return await this.sendToServer({ electionId, encryptedPayload, token });
    } else {
      console.log('Device offline. Queuing vote for later sync.');
      await this.addToQueue({ electionId, encryptedPayload, token });
      return { status: 'queued', message: 'Vote will sync when online.' };
    }
  }

  private static async addToQueue(vote: any) {
    const existing = await AsyncStorage.getItem(QUEUE_KEY);
    const queue = existing ? JSON.parse(existing) : [];
    queue.push(vote);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }

  /**
   * Called on app startup or network restoration
   */
  static async syncQueue() {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) return;

    const existing = await AsyncStorage.getItem(QUEUE_KEY);
    if (!existing) return;

    const queue = JSON.parse(existing);
    if (queue.length === 0) return;

    console.log(`Syncing ${queue.length} offline votes...`);
    const remainingQueue = [];

    for (const vote of queue) {
      try {
        await this.sendToServer(vote);
      } catch (err) {
        remainingQueue.push(vote); // Keep in queue if sync fails
      }
    }

    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remainingQueue));
  }

  private static async sendToServer(vote: any) {
    const res = await fetch(`${API_URL}/vote/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vote)
    });
    if (!res.ok) throw new Error('Failed to send vote');
    return res.json();
  }
}
