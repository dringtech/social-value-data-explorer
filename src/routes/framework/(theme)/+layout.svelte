<script>
  import { base } from '$app/paths';
  export let data;
</script>

<a href="./">Back</a>

<h2>{ data.theme.title }</h2>

<p>
  This theme defines the following outcomes:
</p>

<ul>
{#each data.theme.outcomes as outcome (outcome.id)}
  <li><a href={ './' + data.theme.id + '/' + outcome.id }>{ outcome.title }</a></li>
{/each}
</ul>

<slot></slot>