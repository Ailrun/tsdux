export type Diff<T extends keyof any, U extends keyof any> =
  (& {[P in T]: P}
   & {[P in U]: never}
   & {[x: string]: never})[T];

export type Omit<T, K extends keyof any> =
  Pick<T, Diff<keyof T, K>>;
