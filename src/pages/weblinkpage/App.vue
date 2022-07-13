<template>
  <div id="app">
    <Header v-if="isWab"></Header>
    <div class="enter-out-box" v-for="(item, index) in navLinkList" :key="index">
      <div class="enter-out-title">
        {{item.title}}
      </div>
      <p class="title-dec">{{item.desc}}</p>
      <div class="enter-out-btn-box">
        <div v-for="(el, eld) in item.children" :key="eld" class="btn-box" @click="handlerEnter(el)">
<!--          <div v-if="!isWab" :class="eld == 0?'enter-btn':'out-btn'"></div>-->
          <img :class="eld == 0?'enter-btn':'out-btn'" :src="el.code">
          <span class="btn-desc" :class=" eld == 0?'enter-desc':'out-desc'">{{el.desc}}</span>
          <span class="btn-desc">{{el.desc1}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/index'
import {imageUrl, platement} from '@/utils/commen'
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
      navLinkList: [
        {
          title: "7月学分登记",
          desc: '请扫描下方签入签出二维码进行学分登记。\n' +
              '若长按不能扫码，请截图扫描。',
          children: [
              {
                link: "https://cme.jsma.net.cn/web/stureg/?pid=11846",
                desc: "请在7月1日12:00～17:00",
                desc1: "内签入",
                code: require("../../assets/qianru.png"),
              },
            {
              link: "https://cme.jsma.net.cn/web/prono/?s=%e6%82%a8%e7%9a%84%e6%89%ab%e6%8f%8f%e4%ba%8c%e7%bb%b4%e7%a0%81%e6%97%b6%e9%97%b4%e6%97%a0%e6%95%88",
              desc: "请在7月3日15:00～20:00",
              desc1: "内签出",
              code: require("../../assets/qianchu.png"),
            }
          ]
        },
      ],
      shareUrl: window.location.href||"",
      shareImage: imageUrl+'wxfx00001.jpg'
    }
  },
  mounted () {
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
    handlerEnter(info) {
      console.log(info);
      // window.location.href = info.link;
    },
    handlerOut() {

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
  .enter-out-box{
    width: 100%;
    //height: 330px;
    background: #FFFFFF;
    border-radius: 8px;
    .enter-out-title{
      width: 100%;
      font-size: 22px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #4E4E4E;
      line-height: 40px;
      padding: 18px 22px 10px 22px;
      box-sizing: border-box;
    }
    .title-dec{
      width: 100%;
      padding: 0 22px;
      box-sizing: border-box;
      font-size: 15px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #7A7A7A;
      line-height: 23px;
    }
    .enter-out-btn-box{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .btn-box{
        width: 100%;
        margin-top: 62px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .enter-btn{
          width: 120px;
          height: 120px;
          background: url("../../assets/enter.png") no-repeat center;
          background-size: 100%;
          margin-bottom: 10px;
        }
        .out-btn{
          width: 120px;
          height: 120px;
          background: url("../../assets/out.png") no-repeat center;
          background-size: 100%;
          margin-bottom: 10px;
        }
        .btn-desc{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: SourceHanSansCN-Bold, SourceHanSansCN;
          font-weight: bold;
          color: #222222;
          line-height: 24px;
          letter-spacing: 2px;
        }
      }
      .btn-box:first-child{
        margin-top: 20px;
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
