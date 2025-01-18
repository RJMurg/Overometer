<script lang="ts">
	import Card from '../ui/card/card.svelte';

	let {
		overPercent = 0,
		time,
		message = ''
	}: { overPercent: number; time: string; message: string } = $props();
	let backPercent = $derived(100 - overPercent);
</script>

<Card
	class="z-40 w-full rounded-md border border-gray-100 bg-gray-600 bg-opacity-30 bg-clip-padding p-5 backdrop-blur-md backdrop-filter md:w-2/3"
>
	<div class="flex flex-col items-center">
		<div class="text-center text-3xl font-bold lg:text-6xl">
			It is
			<span class="text-red-500">{overPercent}% OVER</span>
			and
			<span class="text-green-500">{backPercent}% BACK</span>
		</div>
		<div class="text-lg text-neutral-400">Last Updated: {time}</div>

		{#if message}
			<div class="text-bold mt-5 text-xl font-bold">Ruán's Update:</div>
			<div class="text-2xl italic">{message}</div>
		{/if}
	</div>
</Card>
