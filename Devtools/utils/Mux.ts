import { Event } from './Event';
import { LazyPromise } from './LazyPromise';

export abstract class Mux<T, R> {
  private entry = new Event<LazyPromise<R, T>>({
    debounceTime: this.options.debounceTime,
  });

  constructor(private options: { debounceTime: number }) {}

  protected push(payload: T) {
    const job = new LazyPromise<R, T>(payload);
    this.entry.next(job, (_, settedJobs) => this.demux(settedJobs));
    return job.subscribe();
  }

  protected abstract demux(requests: LazyPromise<R>[]): void;
}
