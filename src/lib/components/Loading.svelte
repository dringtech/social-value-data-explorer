<script>
  import spinner from '../spinner.svg';
  export let message = 'Loading data';
</script>
<div class="loading">
  <img src={spinner} alt="Loading spinner"/>
  <p>{ message }</p>
</div>

<style>
  .loading {
    box-sizing: border-box;
    width: 100%;
    height: 15rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    /* font-size: 2em; */
  }
</style>