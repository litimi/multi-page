<template>
  <div id="app">
    <Header v-if="!isPlateMent" @handlerChangeLan="handlerChangeLan"></Header>
    <div class="page-banner"></div>
    <div class="page-navebox">
      <div class="page-nave-item" v-for="(item, index) in naveList" :key="index" @click="handlerEnterLive(item, index)">
        <div :class="['page-nave-item-icon', 'page-nave-item-icon'+index]"></div>
        <span class="page-nave-item-name">{{language == 'zh'?item.zhname:item.enname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {isIosPlatement, getUrlParams, baseUrl, imageUrl} from '../../utils/commen'
import { getWenxinInfo } from '@/service/api'
// import wx from 'weixin-js-sdk'
import Header from "@/components/header";
// const wx = require('weixin-js-sdk')
var wx = require('weixin-js-sdk') || window['wx']
export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      isPlateMent: false,
      urlParam: null,
      language: 'zh',
      naveList: [
        {zhname: '欢迎词', enname: 'welcome', path: 'welcomespeech'},
        {zhname: '会议通知', enname: 'notice', path: 'notice'},
        {zhname: '大会日程', enname: 'schedule', path: 'schedule'},
        {zhname: '学分登记', enname: 'register', path: 'creditregistration'},
        {zhname: '直播间', enname: 'livebroadcast',path: ''},
        {zhname: '联系方式', enname: 'contact', path: 'contact'},
        // {zhname: '专家简介', enname: '', path: 'introduction'},
        {zhname: '云展厅', enname: 'showroom', path: 'cloudroom'}
      ],
      shareUrl: "",
      shareImage: imageUrl+'wxfx00001.jpg',
      // fengmian: require("../assets/fengmian.jpg"),
    }
  },
  mounted() {
    // console.log(wx,'wx')
    this.urlParam = getUrlParams();
    this.shareUrl = window.location.href
    this.init();
    this.language = this.urlParam.language || 'zh';
    if (window.webkit || window.android) {
      this.isPlateMent = true
    } else {
      this.isPlateMent = false
    }

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
    // 导航点击
    handlerEnterLive (item, index) {
      if (index == 4) {
        const str = isIosPlatement();
        if (str == 'ios') {
          if (window.webkit && window.webkit.messageHandlers.goLiving) {
            window.webkit.messageHandlers.goLiving.postMessage({name: 'zhangyutang', age: 12})
          } else {
            window.location.href = `https://www.tongpumed.com/share/onlinelive.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`;
          }
        } else if (str == 'android') {
          if (window.android) {
            console.log("9090909090");
            window.android.goLiving();
          } else {
            window.location.href = `https://www.tongpumed.com/share/onlinelive.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`;
          }
        } else {
          window.location.href = `https://www.tongpumed.com/share/onlinelive.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`;
        }
      } else {
        // window.location.href = `https://tpuat.tongpumed.com/document/${item.path}.html`;
        window.location.href = `${item.path}.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`
      }
    },

    // 切换语言
    handlerChangeLan(info){
      this.language = info
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
  .page-banner{
    width: 100%;
    height: 232px;
    background: url("https://uatrsc.tongpumed.com/tpapprsc/library/image/js00001.jpg") center no-repeat;
    background-size: 100% 232px;
  }
  .page-navebox{
    width: 100%;
    padding: 9px;
    margin: auto;
    box-sizing: border-box;
    //height: calc(100vh - 274px);
    //background: #222222;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .page-nave-item{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin: 10px;
      .page-nave-item-icon{
        width: 80px;
        height: 80px;
      }
      .page-nave-item-icon0{
        background: url("../../assets/hy@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon1{
        background: url("../../assets/tz@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon2{
        background: url("../../assets/rc@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon3{
        background: url("../../assets/xf@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon4{
        background: url("../../assets/zb@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon5{
        background: url("../../assets/lx@3x.png") no-repeat center;
        background-size: 100%;
      }

      .page-nave-item-icon6{
        background: url("../../assets/jj@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-icon7{
        background: url("../../assets/zt@3x.png") no-repeat center;
        background-size: 100%;
      }
      .page-nave-item-name{
        font-size: 16px;
        font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
        font-weight: 800;
        color: #012964;
        line-height: 24px;
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
