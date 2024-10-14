import { UseMutationOptions } from "@tanstack/react-query";

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type AsyncFnReturnType<FnType extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>,
> = UseMutationOptions<
  AsyncFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
