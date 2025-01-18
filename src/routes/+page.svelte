<script lang="ts">
	import Background from '$lib/components/custom/Background.svelte';
	import StateCard from '$lib/components/custom/StateCard.svelte';
	import { Label } from '$lib/components/ui/label';
	import { SettingsIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover/index';
	import { Switch } from '$lib/components/ui/switch';
	import { source } from 'sveltekit-sse';

	let { data }: { data: PageData } = $props();
	let live = $state(true);

	const liveUpdate = $state(source('/api/liveUpdate').select('feelings').json());
	let feelingObject = $state({ over: data.over, timestamp: data.timestamp, message: data.message });

	$effect(() => {
		liveUpdate.subscribe((value: unknown) => {
			const data = value as feeling;
			feelingObject = data ?? feelingObject;
		});
	});

	let feeling = $derived(live ? feelingObject : data);
</script>

<svelte:head>
	<title>Ruán's Overometer</title>
</svelte:head>

<Background overPercent={feeling.over} />
<StateCard
	overPercent={feeling.over}
	time={feeling.timestamp.toLocaleDateString() + ' @ ' + feeling.timestamp.toLocaleTimeString()}
	message={feeling.message}
/>

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<div class="absolute bottom-0 right-0 z-50 ml-auto">
			<Button builders={[builder]} variant="outline" class="m-5 ml-auto">
				<SettingsIcon class="h-6 w-6" />
			</Button>
		</div>
	</Popover.Trigger>
	<Popover.Content class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Live Update</h4>
				<p class="text-sm text-muted-foreground">
					Overometer will automatically update how over or back it is for Ruán.
					<br />
					<br />
					If you want to minimise data usage, you can disable this feature.
				</p>
			</div>
			<div class="grid gap-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="toggleLiveUpdates">Get Live Updates</Label>
					<Switch id="toggleLiveUpdates" value="none" class="col-span-2 h-8" bind:checked={live} />
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
