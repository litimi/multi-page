<template>
  <div id="app">
    <Header v-if="isWab"></Header>
  </div>
</template>

<script>
import Header from "@/components/header";
import {getUrlParams, imageUrl, platement} from "@/utils/commen";
export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      isWab: true,
      imageUrl: imageUrl,
    }
  },
  mounted () {
    this.isWab = platement();
  },
  methods: {
    onlinelive(cover, source) {
      player = new Aliplayer({
        "id": "player-con",
        "source": source,
        "width": "100%",
        "height": "100%",
        "autoplay": true,
        "isLive": state == 1?true:false,
        "cover": lv_logo,
        "rePlay": false,
        "videoHeight": "100%",
        "playsinline": true,
        "preload": false,
        "controlBarVisibility": "hover",
        "videoWidth": "100%",
        "useH5Prism": true,
        "skinLayout": [{
          "name": "bigPlayButton",
          "align": "blabs",
          "x": '45%',
          "y": '50%'
        },
          {name: "errorDisplay", align: "tlabs", x: 0, y: 0},
          {name: "infoDisplay"},
          {name:"tooltip", align:"blabs",x: 0, y: 56},
          {name: "thumbnail"},
          {
            name: "controlBar", align: "blabs", x: 0, y: 0,
            children: [
              {name: "progress", align: "blabs", x: 0, y: 44},
              {name: "playButton", align: "blabs", x: 15, y: 12},
              {name: "fullScreenButton", align: "tr", x: 10, y: 12},
              {name: "volume", align: "tr", x: 5, y: 10}
            ]
          }
        ]
      }, function(player) {
        console.log(player);
      });
    }
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
