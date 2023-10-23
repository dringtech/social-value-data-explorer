<script>
  import { base } from '$app/paths';
  export let data;
</script>


<h2>{ data.theme.title }</h2>

<a href="..">Back</a>

<p>
  This theme defines the following outcomes:
</p>

<ul>
{#each data.theme.outcomes as outcome (outcome.id)}
  <li><a href={ './' + outcome.id }>{ outcome.title }</a></li>
{/each}
</ul>

<slot></slot>