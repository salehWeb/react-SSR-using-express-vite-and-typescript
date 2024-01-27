export type LoaderType<T> = T extends (...args: any[]) => Promise<infer U> ? U : never;
