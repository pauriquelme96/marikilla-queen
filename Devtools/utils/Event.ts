import { LazyPromise } from './LazyPromise';

type EventCallback<T, R> = (value: T, accumulated: T[]) => Promise<R> | R;

export class Event<T> {
  private _timeout: any;
  private _value: T;
  private _emittedValues: T[] = [];
  private _accumulatedValues: T[] = [];
  private _listeners: EventCallback<T, any>[] = [];
  private _fullFilledPromises: {
    resolve: (value: any) => void;
    reject: (err: any) => void;
  }[] = [];

  public get value(): T {
    return this._value;
  }

  public get emittedValues(): T[] {
    return this._emittedValues;
  }

  constructor(
    private options?: {
      debounceTime?: number;
      skipSame?: boolean;
      emitLast?: boolean;
      saveValues?: boolean;
    }
  ) {}

  public listeners(): number {
    return this._listeners.length;
  }

  public next<R>(value: T, fullFilled?: EventCallback<T, R>): Promise<R> {
    let fullFilledPromise: Promise<R> | null = null;

    if (this.options?.saveValues) {
      this._emittedValues.push(value);
    }

    if (fullFilled) {
      fullFilledPromise = new Promise<R>((resolve, reject) => {
        this._fullFilledPromises.push({ resolve, reject });
      });
    }

    if (this.options?.debounceTime) {
      if (fullFilled) {
        this.debouncedNext(value, fullFilled);
      } else {
        throw new Error('fullFilled is undefined');
      }
    } else {
      if (fullFilled) {
        this.standardNext(value, fullFilled);
      } else {
        throw new Error('fullFilled is undefined');
      }
    }

    return fullFilledPromise as any;
  }

  private standardNext(value: T, fullFilled: EventCallback<T, any>) {
    if (this.options?.skipSame && this._value === value) return;
    this._value = value;
    this._listeners.forEach((listener) => listener(value, [value]));
    this.runFullFilledPromises(fullFilled, value, [value]);
  }

  private debouncedNext(value: T, fullFilled: EventCallback<T, any>) {
    if (this.options?.skipSame && this._accumulatedValues.includes(value))
      return;

    this._accumulatedValues.push(value);

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._value = value;
      this._listeners.forEach((listener) => {
        listener(this._value, this._accumulatedValues);
      });

      this.runFullFilledPromises(
        fullFilled,
        this._value,
        this._accumulatedValues
      );

      this._accumulatedValues = [];
    }, this.options?.debounceTime);
  }

  private runFullFilledPromises(
    fullFilled: EventCallback<T, any>,
    value: T,
    accumulated: T[]
  ) {
    if (this._fullFilledPromises.length === 0 || !fullFilled) return;

    const promises = [...this._fullFilledPromises];
    this._fullFilledPromises = [];

    LazyPromise.promisify(() => fullFilled(value, accumulated))
      .then((value) => promises.forEach((promise) => promise.resolve(value)))
      .catch((err) => promises.forEach((promise) => promise.reject(err)));
  }

  public subscribe(callback: EventCallback<T, any>): {
    unsuscribe: () => void;
  } {
    if (this.options?.emitLast && this._value !== undefined) {
      callback(this._value, [this._value]);
    }

    const index = this._listeners.push(callback) - 1;

    return {
      unsuscribe: () => {
        this._listeners = this._listeners.filter((_, i) => i !== index);
      },
    };
  }

  public wait(cond: EventCallback<T, boolean>): Promise<T> {
    if (this._value !== undefined && cond(this._value, [this._value]))
      return Promise.resolve(this._value);

    return new Promise((resolve) => {
      const sub = this.subscribe((value, accumulated) => {
        if (cond(value, accumulated)) {
          resolve(value);
          sub.unsuscribe();
        }
      });
    });
  }

  public waitValue(): Promise<T> {
    return this.wait((value) => value !== undefined);
  }
}
