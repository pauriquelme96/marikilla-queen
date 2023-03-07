export interface Res<T> {
  ok: boolean;
  message: ResponseMessage<T>;
  payload: T;
}

type ResponseStatus = 'valid' | 'warn' | 'error';

type ResponseMessage<T> = {
  [key in keyof T]: T[key] extends object
    ? ResponseMessage<T[key]>
    : {
        status: ResponseStatus;
        msgs: { code: number; content: string }[];
      };
};
