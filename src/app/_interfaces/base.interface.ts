export interface ResponseBaseInterface<T> {
  code: number;
  message: string;
  response: T;
}
