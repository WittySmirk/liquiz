<script lang="ts">
    import Write from "$lib/Write.svelte";
    import { page } from '$app/stores';
    import { shuffle } from "$lib/utils/shuffle.js";
  
    export let data;
  </script>
  
  <h1>Write</h1>
  <a href="/{$page.params.userid}/{$page.params.set}">Back to Set 🏠</a>
  <Write type="Page" cards={shuffle(data.cards)} />