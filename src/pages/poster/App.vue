<template>
  <div id="app">
    <Header v-if="isWab"></Header>
    <div class="poster-box">
      <div v-for="(item, index) in posterList" :key="index" class="poster-image">
        <img  v-if="pageid == item.title" class="poster" :src="imageUrl+item.image">
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import {getUrlParams, imageUrl, platement} from "@/utils/commen";
import {getWenxinInfo} from "@/service/api";
var wx = require('weixin-js-sdk') || window['wx'];
export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      isWab: true,
      imageUrl: imageUrl,
      pageid: null,
      posterList: [
        {title: '3m', image: '3m00001.jpg'},
        {title: '3m', image: '3m00002.jpg'},
        {title: '3m', image: '3m00003.jpg'},
        {title: 'as', image: 'as00001.jpg'},
        {title: 'as', image: 'as00002.jpg'},
        {title: 'as', image: 'as00003.jpg'},
        {title: 'fs', image: 'fs00001.jpg'},
        {title: 'fs', image: 'fs00002.jpg'},
        {title: 'fs', image: 'fs00003.jpg'},
        {title: 'de', image: 'de00001.jpg'},
        {title: 'de', image: 'de00002.png'},
        {title: 'de', image: 'de00003.png'},
        {title: 'de', image: 'de00004.jpg'},
        {title: 'de', image: 'de00005.jpg'},
        {title: 'eh', image: 'eh00001.jpg'},
        {title: 'eh', image: 'eh00002.jpg'},
        {title: 'eh', image: 'eh00003.jpg'},
        {title: 'eh', image: 'eh00004.jpg'},
        {title: 'eh', image: 'eh00005.jpg'},
        // {title: 'er', image: 'er00001.jpg'},
        // {title: 'er', image: 'er00002.jpg'},
        // {title: 'er', image: 'er00003.jpg'},
        {title: 'rx', image: 'rx00001.jpg'},
        {title: 'rx', image: 'rx00002.jpg'},
        {title: 'rx', image: 'rx00003.jpg'},
        {title: 'rx', image: 'rx00004.jpg'},
        {title: 'rx', image: 'rx00005.jpg'},
        {title: 'rx', image: 'rx00006.jpg'},
        {title: 'rx', image: 'rx00007.jpg'},
        {title: 'sp', image: 'sp00001.jpg'},
        {title: 'sp', image: 'sp00002.jpg'},
        {title: 'sp', image: 'sp00003.jpg'},
        {title: 'yz', image: 'yz00001.jpg'},
        {title: 'yz', image: 'yz00002.jpg'},
        {title: 'yz', image: 'yz00003.jpg'},
        {title: 'rf', image: 'rf00001.jpg'},
        {title: 'rf', image: 'rf00002.jpg'},
        { title: "mx", image: "mx00001.jpg" },
        { title: "mx", image: "mx00002.jpg" },
        { title: "md", image: "md00001.jpg" },
        { title: "md", image: "md00002.jpg" },
        { title: "ms", image: "ms00001.jpg" },
        { title: "ms", image: "ms00002.jpg" },
        { title: "ms", image: "ms00003.jpg" },
        { title: "wg", image: "wg00001.jpg" },
        { title: "wg", image: "wg00002.jpg" },
        { title: "wg", image: "wg00003.jpg" },
        { title: "mr", image: "mr00001.jpg" },
        { title: "mr", image: "mr00002.jpg" },
        { title: "db", image: "db00001.jpg" },
        { title: "db", image: "db00002.jpg" },
        { title: "tp", image: "tp00001.jpg" },
        { title: "tp", image: "tp00002.jpg" },
        { title: "tp", image: "tp00003.jpg" },
        { title: "tp", image: "tp00004.jpg" },

      ],
      shareUrl: window.location.href||"",
      shareImage: imageUrl+'wxfx00001.jpg'
    }
  },
  mounted () {
    this.shareUrl = window.location.href
    this.init();
    this.isWab = platement();
    const urlparam = getUrlParams()
    this.pageid = urlparam.c
  },
  methods: {
    async init() {
      const params = {
        shareurl: window.location.href
      }
      try {
        const res = await getWenxinInfo(params);
        if (res.status == 200) {
          const info = JSON.parse(res.data);
          console.log(info, "info");
          this.initShare({
            debug: false,
            appId: info.AppId,
            timestamp: info.timestamp,
            nonceStr: info.nonceStr,
            signature: info.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',
              'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    initShare(shareInfo) {
      console.log(wx,"9999")
      wx.config(shareInfo);
      console.log(wx, 'wx')
      wx.error((res)=>{//配置成功
        console.log(res, "tttt");
      })
      //以上是配置项注入成功
      const that = this
      wx.ready(function (){//点击要去分享
        console.log('我准备好了');
        wx.onMenuShareTimeline({//配置去分享朋友圈的选项
          title : "江苏省抗癌协会肿瘤麻醉与镇痛专业委员会2022学术年会",//分享标题
          link : that.shareurl, //分享链接
          imgUrl : that.shareImage, //分享图标
          success : function(){//分享成功
            console.log("已分享朋友圈成功")
            //如分享成功后想做一些其他的业务处理，可以在这里做
          },
          cancel:function(){
            //that.alert="失败弹框话术等等(注意 这里拿不到this实例的)"
            console.log("已分享失败")
          }
        })
        wx.onMenuShareAppMessage({//配置去分享好友的选项
          title : "江苏省抗癌协会肿瘤麻醉与镇痛专业委员会2022学术年会",//分享标题
          desc : "会议时间：7月1日-3日，江苏省抗癌协会肿瘤麻醉与镇痛专业委员会2022学术年会",
          link : that.shareurl, //分享链接
          imgUrl : that.shareImage, //分享图标
          success : function(){
            console.log("分享好友成功")
          },
          cancel:function(){
            console.log("分享失败")
          }
        });
      })
    },
  }
}
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  height: 100vh;
  padding: 0px;
  box-sizing: border-box;
  .poster-box{
    width: 100%;
    .poster-image{
      width: 100%;
      .poster{
        width: 100%;
      }
    }

  }
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
