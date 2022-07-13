<template>
  <div id="app">
    <Header v-if="isWab"></Header>
<!--    <div class="search-box">-->
<!--      <van-search-->
<!--          v-model="value"-->
<!--          show-action-->
<!--          placeholder="请输入搜索关键词"-->
<!--          @search="onSearch"-->
<!--      >-->
<!--        <template #action>-->
<!--          <div class="search-btn" @click="onSearch">搜索</div>-->
<!--        </template>-->
<!--      </van-search>-->
<!--    </div>-->
    <div class="list-title"></div>
    <div class="list-box">
      <div class="list-item" v-for="(item, index) in naveList" :key="index" @click="handlerEnterPoster(item)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search  } from 'vant'
import Header from "@/components/header";
import {getWenxinInfo} from "@/service/api";
import {getUrlParams, imageUrl, platement} from "@/utils/commen";
var wx = require('weixin-js-sdk') || window['wx'];
Vue.use(Search);
export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      naveList: [
        {name: '3M中国有限公司', c: '3m'},
        {name: '爱施健', c: 'as'},
        {name: '北京费森尤斯卡比医药有限公司', c: 'fs'},
        {name: '德尔格', c: 'de'},
        { name: "杭州坦帕医疗科技有限公司", c: "tp" },
        {name: '江苏恩华药业股份有限公司', c: 'eh'},
        // {name: '江苏恒瑞医药股份有限公司', c: 'er'},
        {name: '江苏人先医疗科技有限公司', c: 'rx'},
        {name: '南京舒普思达医疗设备有限公司', c: 'sp'},
        {name: '扬子江药业集团有限公司', c: 'yz'},
        {name: '宜昌人福药业有限责任公司', c: 'rf'},
        { name: "迈心诺（上海）实业有限公司", c: "mx" },
        { name: "萌蒂（中国）制药有限公司", c: "md" },
        { name: "默沙东", c: "ms" },
        { name: "山东威高集团医用高分子制品股份有限公司", c: "wg" },
        { name: "深圳迈瑞生物医疗电子股份有限公司", c: "mr" },
        { name: "东北制药", c: "db" },
      ],
      value: '',
      isWab: true,
      shareUrl: window.location.href || "",
      shareImage: imageUrl+'wxfx00001.jpg',
      urlParam: null,
    }
  },
  mounted () {
    this.urlParam = getUrlParams();
    this.isWab = platement();
    this.shareUrl = window.location.href
    this.init();
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
    onSearch () {
    },
    handlerEnterPoster(obj) {
      window.location.href = `./poster.html?c=${obj.c}&data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`;
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
  .search-box{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 15px;
    .search-btn{
      font-size: 15px;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: #0067FD;
    }
  }
  .list-title{
    width: 100%;
    height: 30px;
    //padding: 0px 15px;
    box-sizing: border-box;
    font-size: 22px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: #4E4E4E;
    line-height: 33px;
    letter-spacing: 1px;
  }
  .list-box{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
    .list-item{
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      font-size: 17px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #222222;
      line-height: 26px;
      position: relative;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow:ellipsis;
      border-bottom: 1px solid #eee;
    }
    .list-item:last-child{
      border-bottom: none;
    }
    .list-item::after{
      content: '';
      width: 10px;
      height: 2px;
      background: #ccc;
      position: absolute;
      top: 20px;
      right: 10px;
      transform: rotate(45deg);
    }
    .list-item::before{
      content: '';
      width: 10px;
      height: 2px;
      background: #ccc;
      position: absolute;
      top: 26px;
      right: 10px;
      transform: rotate(-45deg);
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
