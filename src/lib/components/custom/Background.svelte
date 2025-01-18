<script lang="ts">
	import { isOver, getSeriousness, getBackgroundTextGradient } from '$lib';

	let { overPercent = 50 }: { overPercent: number } = $props();
	let backPercent = $derived(100 - overPercent);
	let overMajority = $derived(isOver(overPercent, backPercent));
	let majorityValue = $derived(overMajority ? overPercent : backPercent);
	let majoritySeriousness = $derived(getSeriousness(majorityValue));
	let gradient = $derived(getBackgroundTextGradient(overPercent, backPercent));
	let text = $derived(
		overPercent === backPercent
			? "I'M INDIFFERENT"
			: (isOver(overPercent, backPercent) ? "IT'S " : "WE'RE ") +
					majoritySeriousness.toUpperCase() +
					' ' +
					(isOver(overPercent, backPercent) ? 'OVER' : 'BACK')
	);
</script>

<div
	class="absolute z-0 flex h-full w-screen flex-col overflow-y-hidden text-center text-[5vw] font-bold leading-none md:text-[5vw] lg:text-[4vw] {gradient} bg-clip-text text-transparent"
>
	{#each Array(50).fill(0) as _}
		<div>{text}</div>
	{/each}
</div>
