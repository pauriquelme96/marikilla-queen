import { Event } from './Event';

export class LazyPromise<T, P = any> {
  private result = new Event<T>();
  private error = new Event<T>();

  constructor(public payload?: P) {}

  public resolve(value?: T): Promise<T> {
    return this.result.next<T>(value as any) as any;
  }

  public reject(error: any): Promise<T> {
    return this.error.next<T>(error) as any;
  }

  public subscribe(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.result.waitValue().then(resolve);
      this.error.waitValue().then(reject);
    });
  }

  public fromCallback(callback: () => T | Promise<T>): Promise<T> {
    return LazyPromise.promisify<T>(callback)
      .then((value) => this.resolve(value))
      .catch((err) => this.reject(err));
  }

  public static promisify<T>(callback: () => T | Promise<T>): Promise<T> {
    try {
      const result = callback();

      if (result instanceof Promise) {
        return result;
      } else {
        return Promise.resolve(result);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static toPromise<T>(func): (...args: any) => Promise<T> {
    return (...args) => {
      try {
        const result = func(...args);

        if (result instanceof Promise) {
          return result;
        } else {
          return Promise.resolve(result);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
}
