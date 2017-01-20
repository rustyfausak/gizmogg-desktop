<style scoped>
  .input-file {
    padding-top: 4px;
  }
  label {
    color: #fff;
    font-weight: normal;
  }
</style>

<template>
  <form>
    <label class="label" for="watch_folder">Watch this directory for replays:</label>
    <nav class="level">
      <div class="level-item has-text-centered">
        <p class="control has-addons">
          <input class="input input-file" type="file" id="watch_folder" webkitdirectory>
          <a class="button is-info">
            Watch Directory
          </a>
        </p>
      </div>
    </nav>
  </form>
</template>

<script>
  export default {

  }
</script>
