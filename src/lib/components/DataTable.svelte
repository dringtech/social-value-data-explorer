<script lang="ts">
    export let data;
    export let columns;
</script>

<table>
    <thead>
        <tr>
            {#each columns as c}
            <th scope="col">{ c }</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data as r}
        <tr>
            {#each columns as c, i}
                {#if i > 0}
                <td>{ r[c] }</td>
                {:else}
                <th scope="row">{ r[c] }</th>
                {/if}
            {/each}
        </tr>
        {/each}
    </tbody>
</table>
