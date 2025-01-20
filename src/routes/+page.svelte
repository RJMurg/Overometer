<script lang="ts">
	import Background from '$lib/components/custom/Background.svelte';
	import StateCard from '$lib/components/custom/StateCard.svelte';
	import type { PageData } from './$types';
	import { source } from 'sveltekit-sse';

	let { data }: { data: PageData } = $props();

	const liveUpdate = $state(source('/api/liveUpdate').select('feelings').json());
	let feelingObject = $state({ over: data.over, timestamp: data.timestamp, message: data.message });

	$effect(() => {
		liveUpdate.subscribe((value: unknown) => {
			const data = value as feeling;
			feelingObject = data ?? feelingObject;
		});
	});

	let feeling = $derived(feelingObject);
	let feelingTime = $derived(
		feeling.timestamp.toLocaleDateString() + ' @ ' + feeling.timestamp.toLocaleTimeString()
	);
</script>

<svelte:head>
	<title>Ruán's Overometer</title>
</svelte:head>

<Background overPercent={feeling.over} />
<StateCard overPercent={feeling.over} time={feelingTime} message={feeling.message} />
