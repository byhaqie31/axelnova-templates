<script setup lang="ts">
const { data: health } = await useAsyncData('health', () =>
  useApi<{ status: string }>('/api/health').catch(() => ({ status: 'unreachable' })),
)
</script>

<template>
  <main class="mx-auto max-w-2xl px-6 py-24">
    <p class="font-display text-sm uppercase tracking-widest text-brand-500">
      axelnova / template
    </p>
    <h1 class="mt-2 font-display text-5xl font-medium leading-tight">
      Hello, tool.
    </h1>
    <p class="mt-6 text-lg text-ink/70">
      You've successfully booted the web app. Replace this page with your tool's landing screen.
    </p>

    <div class="mt-12 rounded-2xl border border-ink/10 p-6">
      <p class="text-xs font-medium uppercase tracking-widest text-ink/50">
        API status
      </p>
      <p class="mt-2 font-mono text-sm">
        {{ health?.status ?? 'pending' }}
      </p>
    </div>
  </main>
</template>
