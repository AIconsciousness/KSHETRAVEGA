// Real-time Data Synchronization Service
// This service keeps data in sync across all devices in real-time

interface RealtimeConfig {
  enabled: boolean;
  syncInterval: number; // milliseconds
  maxRetries: number;
  retryDelay: number;
}

interface SyncTask {
  id: string;
  url: string;
  lastSync: number;
  retries: number;
  callback: (data: any) => void;
}

class RealtimeService {
  private tasks: Map<string, SyncTask> = new Map();
  private config: RealtimeConfig;
  private syncInterval: NodeJS.Timeout | null = null;

  constructor(config: RealtimeConfig) {
    this.config = config;
    if (config.enabled) {
      this.startRealtimeSync();
    }
  }

  // Add real-time sync task
  addSyncTask(id: string, url: string, callback: (data: any) => void): void {
    if (!this.config.enabled) return;

    const task: SyncTask = {
      id,
      url,
      lastSync: 0,
      retries: 0,
      callback
    };

    this.tasks.set(id, task);
    console.log(`🔄 REALTIME SYNC ADDED: ${id}`);
  }

  // Start real-time sync
  private startRealtimeSync(): void {
    this.syncInterval = setInterval(() => {
      this.syncAllTasks();
    }, this.config.syncInterval);
  }

  // Sync all tasks
  private async syncAllTasks(): Promise<void> {
    const now = Date.now();
    
    for (const [id, task] of this.tasks.entries()) {
      // Check if it's time to sync
      if (now - task.lastSync < this.config.syncInterval) continue;
      
      // Check retry limit
      if (task.retries >= this.config.maxRetries) {
        console.log(`❌ SYNC ABANDONED: ${id} (max retries reached)`);
        this.tasks.delete(id);
        continue;
      }

      await this.syncTask(task);
    }
  }

  // Sync individual task
  private async syncTask(task: SyncTask): Promise<void> {
    try {
      console.log(`🔄 SYNCING: ${task.id}`);
      
      const response = await fetch(task.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      task.lastSync = Date.now();
      task.retries = 0;
      
      task.callback(data);
      console.log(`✅ SYNC SUCCESS: ${task.id}`);
      
    } catch (error) {
      task.retries++;
      console.error(`❌ SYNC FAILED: ${task.id} (retry ${task.retries})`, error);
      
      // Retry after delay
      setTimeout(() => {
        this.syncTask(task);
      }, this.config.retryDelay);
    }
  }

  // Force sync specific task
  async forceSync(id: string): Promise<void> {
    const task = this.tasks.get(id);
    if (task) {
      await this.syncTask(task);
    }
  }

  // Remove sync task
  removeSyncTask(id: string): void {
    this.tasks.delete(id);
    console.log(`🗑️ SYNC REMOVED: ${id}`);
  }

  // Get sync statistics
  getStats(): any {
    const tasks = Array.from(this.tasks.values());
    const now = Date.now();
    
    return {
      totalTasks: tasks.length,
      activeTasks: tasks.filter(t => now - t.lastSync < this.config.syncInterval).length,
      failedTasks: tasks.filter(t => t.retries > 0).length,
      averageSyncTime: tasks.reduce((sum, t) => sum + (now - t.lastSync), 0) / tasks.length
    };
  }

  // Stop real-time sync
  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    console.log('🛑 REALTIME SYNC STOPPED');
  }
}

// Create global real-time service
export const realtimeService = new RealtimeService({
  enabled: true,
  syncInterval: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 5000 // 5 seconds
});

// Real-time marketplace sync
export const startMarketplaceSync = (callback: (data: any) => void): void => {
  realtimeService.addSyncTask(
    'marketplace_realtime',
    'https://kshetravega-57p9.onrender.com/api/crops/marketplace',
    callback
  );
};

// Real-time farmer data sync
export const startFarmerSync = (farmerId: string, callback: (data: any) => void): void => {
  realtimeService.addSyncTask(
    `farmer_realtime_${farmerId}`,
    `https://kshetravega-57p9.onrender.com/api/crops/farmer/${farmerId}`,
    callback
  );
};

// Real-time buyer data sync
export const startBuyerSync = (buyerId: string, callback: (data: any) => void): void => {
  realtimeService.addSyncTask(
    `buyer_realtime_${buyerId}`,
    `https://kshetravega-57p9.onrender.com/api/orders/buyer/${buyerId}`,
    callback
  );
};

export default realtimeService;
