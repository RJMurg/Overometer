<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Card from '$lib/components/ui/card/card.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import { Label } from '$lib/components/ui/label';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let { data }: { data: PageData } = $props();
	let value = $state([50]);
</script>

{#if !data.loggedIn}
	<h1 class="mb-5 text-center text-4xl font-bold">Admin Login</h1>
	<form
		action="?/login"
		method="post"
		class="flex w-full max-w-sm items-center space-x-2 px-4 md:p-0"
	>
		<Input type="password" name="password" placeholder="Enter admin password" />
		<Button type="submit">
			<ChevronRight class="" />
		</Button>
	</form>
	<Button variant="secondary" href="/" class="mt-2">Go Home</Button>
{:else}
	<Card class="flex h-full w-full flex-col items-center p-4 md:w-2/3">
		<h1 class="mb-5 text-4xl font-bold">Log Feeling</h1>
		<form action="?/addFeeling" method="post" class="mt-5 w-2/3">
			<input type="hidden" name="over" {value} />
			<Label for="feeling" class="text-xl">How over is it? - {value}% over</Label>
			<Slider id="feeling" bind:value max={100} step={1} />

			<Label for="message" class="mt-5 text-xl">Message</Label>
			<Textarea id="message" name="message" placeholder="Enter message" />

			<Button type="submit" class="mt-5">Submit</Button>
		</form>
	</Card>
{/if}
