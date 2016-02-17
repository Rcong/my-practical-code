<template>
  <div>
    <img class="logo" src="./assets/logo.png"/>
    <h1>{{msg}}></h1>
    <comp-a></comp-a>
    <comp-b></comp-b>
    <counter></counter>
  </div>
</template>

<script>
import CompA from './components/a.vue'
import CompB from './components/b.vue'
import Counter from './components/counter.vue'
export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    CompA,
    CompB,
    Counter
  }
}
</script>

<style>

.logo{
  width:40px;
  height:40px;
}

</style>
