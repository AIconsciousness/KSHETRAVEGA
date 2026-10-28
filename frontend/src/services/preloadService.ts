// Intelligent Data Preloading Service
// This service predicts what data user might need and preloads it

interface PreloadConfig {
  enabled: boolean;
  maxConcurrent: number;
  priority: 'high' | 'medium' | 'low';
}

interface PreloadTask {
  id: string;
  url: string;
  priority: number;
  callback: (data: any) => void;
  status: 'pending' | 'loading' | 'completed' | 'failed';
}

class PreloadService {
  private tasks: Map<string, PreloadTask> = new Map();
  private config: PreloadConfig;
  private activeTasks: number = 0;

  constructor(config: PreloadConfig) {
    this.config = config;
    this.startPreloadWorker();
  }

  // Add preload task
  addTask(id: string, url: string, callback: (data: any) => void, priority: number = 1): void {
    if (!this.config.enabled) return;

    const task: PreloadTask = {
      id,
      url,
      priority,
      callback,
      status: 'pending'
    };

    this.tasks.set(id, task);
    console.log(`📋 PRELOAD QUEUED: ${id} (priority: ${priority})`);
  }

  // Start preload worker
  private startPreloadWorker(): void {
    if (!this.config.enabled) return;

    setInterval(() => {
      this.processQueue();
    }, 1000); // Check every second
  }

  // Process preload queue
  private async processQueue(): Promise<void> {
    if (this.activeTasks >= this.config.maxConcurrent) return;

    const pendingTasks = Array.from(this.tasks.values())
      .filter(task => task.status === 'pending')
      .sort((a, b) => b.priority - a.priority);

    for (const task of pendingTasks) {
      if (this.activeTasks >= this.config.maxConcurrent) break;

      this.executeTask(task);
    }
  }

  // Execute preload task
  private async executeTask(task: PreloadTask): Promise<void> {
    task.status = 'loading';
    this.activeTasks++;

    try {
      console.log(`🚀 PRELOADING: ${task.id}`);
      
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
      task.status = 'completed';
      task.callback(data);
      
      console.log(`✅ PRELOAD COMPLETE: ${task.id}`);
    } catch (error) {
      task.status = 'failed';
      console.error(`❌ PRELOAD FAILED: ${task.id}`, error);
    } finally {
      this.activeTasks--;
    }
  }

  // Cancel preload task
  cancelTask(id: string): void {
    const task = this.tasks.get(id);
    if (task && task.status === 'pending') {
      this.tasks.delete(id);
      console.log(`❌ PRELOAD CANCELLED: ${id}`);
    }
  }

  // Get preload statistics
  getStats(): any {
    const tasks = Array.from(this.tasks.values());
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      loading: tasks.filter(t => t.status === 'loading').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      failed: tasks.filter(t => t.status === 'failed').length,
      activeTasks: this.activeTasks
    };
  }
}

// Create global preload service
export const preloadService = new PreloadService({
  enabled: true,
  maxConcurrent: 3,
  priority: 'medium'
});

// Smart preloading for marketplace
export const preloadMarketplaceData = (): void => {
  preloadService.addTask(
    'marketplace_data',
    'https://kshetravega-57p9.onrender.com/api/crops/marketplace',
    (data) => {
      console.log('🎯 MARKETPLACE PRELOADED: Ready for instant display');
      // Store in cache for instant access
      localStorage.setItem('preloaded_marketplace', JSON.stringify(data));
    },
    10 // High priority
  );
};

// Smart preloading for farmer data
export const preloadFarmerData = (farmerId: string): void => {
  preloadService.addTask(
    `farmer_${farmerId}`,
    `https://kshetravega-57p9.onrender.com/api/crops/farmer/${farmerId}`,
    (data) => {
      console.log(`🎯 FARMER DATA PRELOADED: ${farmerId} ready for instant display`);
      localStorage.setItem(`preloaded_farmer_${farmerId}`, JSON.stringify(data));
    },
    8 // Medium priority
  );
};

// Smart preloading for buyer data
export const preloadBuyerData = (buyerId: string): void => {
  preloadService.addTask(
    `buyer_${buyerId}`,
    `https://kshetravega-57p9.onrender.com/api/orders/buyer/${buyerId}`,
    (data) => {
      console.log(`🎯 BUYER DATA PRELOADED: ${buyerId} ready for instant display`);
      localStorage.setItem(`preloaded_buyer_${buyerId}`, JSON.stringify(data));
    },
    7 // Medium priority
  );
};

export default preloadService;
