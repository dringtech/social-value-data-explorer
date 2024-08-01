<script lang="ts">
    export let data;
    export let columns;
</script>

<table>
    <thead>
        <tr>
            {#each columns as c}
            <td>{ c }</td>
            {/each}
        </tr>
    </thead>
    {#each data as r}
    <tr>
        {#each columns as c}
        <td>{ r[c] }</td>
        {/each}
    </tr>
    {/each}
</table>
