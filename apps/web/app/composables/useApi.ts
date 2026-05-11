export function useApi<T = unknown>(
  path: string,
  opts: Parameters<typeof $fetch<T>>[1] = {},
): Promise<T> {
  const config = useRuntimeConfig()
  const base = import.meta.server
    ? config.apiBaseInternal
    : config.public.apiBase

  return $fetch<T>(path, {
    baseURL: base,
    ...opts,
  })
}
