<template>
  <div id="app">
    <Header v-if="isWab"></Header>

  </div>
</template>

<script>
import Header from "@/components/header";
import {imageUrl, platement} from "@/utils/commen";

export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      isWab: true,
      imageUrl: imageUrl
    }
  },
  mounted () {
    this.isWab = platement();
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  height: 100vh;
  padding: 0px;
  box-sizing: border-box;
}
</style>
<style lang="scss">
html,body{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
  background: #FFFFFF;
}
h1,h2,h3,h4,h5,p,span,div{
  padding: 0;
  margin: 0;
}
</style>
