<div class='page-header'><header>
	<h1><a href="/">CHY Social Value Data Explorer</a></h1>
</header>
<nav>
	<ul><li><a href="/framework/">Framework</a></li></ul>
</nav>
</div>
<main>
	<slot />
</main>

<style>
	header,
	nav,
	main {
		box-sizing: content-box;
		max-inline-size: 60ch;
		margin-inline: auto;
		padding-inline-start: var(--s1);
		padding-inline-end: var(--s1);
	}
	nav > ul {
		list-style: none;
	}
  main {
    padding-block: 2ch;
  }
  .page-header {
    background: black;
    color: white;
    padding-block: 2ch;
  }
  .page-header a {
    color: inherit;
  }
</style>
