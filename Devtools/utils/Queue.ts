import { Event } from './Event';
import { LazyPromise } from './LazyPromise';

export type QueueRequest<T> = (channel?: QueueChannel<T>) => T | Promise<T>;
export interface QueueOptions {
  pool?: number;
  merge?: boolean;
  reutilize?: boolean;
  debounceTime?: number;
}

type QueueJob<T> = () => Promise<T>;
interface QueueChannel<T> {
  dispatcher: Event<QueueRequest<T>>;
  queue: QueueJob<T>[];
  activeJob: LazyPromise<T>;
  runningJobs: number;
  locked: boolean;
  remove: () => void;
  purge: () => void;
  lock: () => void;
}

export class Queue<T> {
  private channels: { [channel: string]: QueueChannel<T> } = {};

  constructor(private options: QueueOptions = {}) {}

  public push(request: QueueRequest<T>): Promise<T> {
    const { dispatcher } = this.getChannel();
    return dispatcher.next(request, (settedRequest) =>
      this.addToQueue(settedRequest)
    );
  }

  public channelPush(channelKey: string, request: QueueRequest<T>): Promise<T> {
    const { dispatcher, locked } = this.getChannel(channelKey);

    return !locked
      ? dispatcher.next(request, (settedRequest) =>
          this.addToQueue(settedRequest, channelKey)
        )
      : Promise.reject(new Error('Channel locked'));
  }

  public purge(channelKey?: string) {
    this.getChannel(channelKey).purge();
  }

  private addToQueue(
    request: QueueRequest<T>,
    channelKey?: string
  ): Promise<T> {
    const channel = this.getChannel(channelKey);
    const createNewJob =
      !channel.activeJob || !(this.options.merge || this.options.reutilize);

    if (createNewJob) {
      channel.activeJob = new LazyPromise<T>();
      channel.queue.push(() =>
        channel.activeJob.fromCallback(() => request(channel))
      );
    }

    this.runJobs(channel);

    return channel.activeJob.subscribe();
  }

  private runJobs(channel: QueueChannel<T>) {
    while (
      this.options.pool === -1 ||
      channel.runningJobs < (this.options.pool || 1)
    ) {
      const job = channel.queue.shift();

      if (job) {
        channel.runningJobs++;
        job().finally(() => {
          channel.runningJobs--;
          this.runJobs(channel);
        });
      } else {
        if (!this.options.reutilize) {
          channel.remove();
        }
        break;
      }
    }
  }

  private getChannel(channelKey: string = 'default'): QueueChannel<T> {
    if (!this.channels[channelKey]) {
      this.channels[channelKey] = {
        dispatcher: new Event<QueueRequest<T>>({ ...this.options }),
        queue: [],
        runningJobs: 0,
        activeJob: null as any,
        locked: false,
        purge: () => (this.channels[channelKey].activeJob = null as any),
        remove: () => delete this.channels[channelKey],
        lock: () => (this.channels[channelKey].locked = true),
      };
    }

    return this.channels[channelKey];
  }
}
