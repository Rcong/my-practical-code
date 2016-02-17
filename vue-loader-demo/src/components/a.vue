<template>
  <div class="container">
    <h2 class="red">{{msg}}</h2>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg:'Hello from component A!'
      }
    }
  }
</script>

<style>
  .container{
    border:1px solid #00f;
  }
  .red{
    color:#f00;
  }
</style>
