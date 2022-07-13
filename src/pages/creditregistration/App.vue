<template>
  <div id="app">
    <Header v-if="isWab" @handlerChangeLan="handlerChangeLan"></Header>
    <div class="page-content">
      <div  class="reginst-btn" @click="handlerLogin">确定登记</div >
      <!--       @click="handlerLogin"-->
    </div>

    <!--  登录弹窗  -->
    <div class="login-dialog-marsk" v-if="formShow">
      <div class="login-form-box">
        <input class="login-form-input phone" placeholder="手机号：" v-model="form.usr_mobile" />
        <input class="login-form-input code" placeholder="验证码：" v-model="form.msgcode" />
        <div class="msg-btn" @click="handlerGetCode">{{hasgetCode?`${timerCount}s`:'获取短信验证码'}}</div>
        <div class="login-btn" @click="handlerRecord">进入学分登记</div>
      </div>
      <div class="close-btn" @click="handlerCloseForm"></div>
    </div>

    <!--  进入签到弹窗  -->
    <div class="enter-dialog-marsk" v-if="enterRecord">
      <div class="enter-out-box">
        <div class="enter-out-title">
          学分登记
        </div>
        <div class="enter-out-btn-box">
          <div class="btn-box" @click="handlerEnter">
            <div class="enter-btn"></div>
            <span class="btn-desc enter-desc">请在规定时间内签入</span>
          </div>
          <div class="btn-box" @click="handlerOut">
            <div class="out-btn"></div>
            <span class="btn-desc out-desc">请在规定时间内签出</span>
          </div>
        </div>
      </div>
      <div class="enter-out-close" @click="handlerCloseRecord"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from "@/components/header";
import {getUrlParams, imageUrl, isIosPlatement, platement} from "@/utils/commen";
import {getCode, getWenxinInfo, loginSystem} from "@/service/api";
import {setCookies} from "@/utils/cookie";
import { Toast } from 'vant';
var wx = require('weixin-js-sdk') || window['wx'];

Vue.use(Toast);

export default {
  name: 'index',
  components: {
    Header
  },
  data () {
    return {
      isWab: true,
      form: {
        usr_mobile: '',
        msgcode: ''
      },
      formShow: false,
      enterRecord: false,
      timerCount: 60,
      hasgetCode: false,
      timer: null,
      urlParam: null,
      language: 'zh',
      shareUrl: "",
      shareImage: imageUrl+'wxfx00001.jpg'
    }
  },
  mounted () {
    this.shareUrl = window.location.href
    this.init();
    this.isWab = platement();
    this.urlParam = getUrlParams();
    this.language = this.urlParam.language || 'en';
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
    // 切换语言
    handlerChangeLan(info){
      this.language = info
    },
    async handlerGetCode () {
      if (this.hasgetCode) {
        return
      }
      let regex = /^1[34578]\d{9}$/g;
      if(!regex.test(this.form.usr_mobile)) {
        Toast('请输入正确的手机号');
        return
      }
      try {
        const param = {
          isGj: this.language == 'en'?0:1,
          mobile: this.form.usr_mobile
        }
        const res = await getCode(param);
        if (res.status == 200) {
          this.hasgetCode = true
          let time = 60
          this.timer = setInterval(() => {
            if (time > 0) {
              time--
              this.timerCount = time
            } else {
              clearInterval(this.timer)
              this.hasgetCode = false
              this.timerCount = 60
            }
          }, 1000)
        }
      } catch (e) {
        console.log(e)
      }

    },
    handlerLogin () {
      const str = isIosPlatement();
      if (str == 'ios') {
        if (window.webkit && window.webkit.messageHandlers.goLiving) {
          window.location.href = `./weblinkpage.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`
        } else {
          const token = localStorage.getItem("exkey");
          if (token) {
            window.location.href = `./weblinkpage.html?data_id=${this.urlParam.data_id}&language=${this.urlParam.language}&usr_id=${this.urlParam.usr_id}`
          } else {
            this.formShow = true
          }
        }
      }
      if (str == 'android') {
        if (window.android) {
          window.location.href = `./weblinkpage.html`
        } else {
          const token = localStorage.getItem("exkey");
          if (token) {
            // this.enterRecord = true
            window.location.href = `./weblinkpage.html`
          } else {
            this.formShow = true
          }
        }
      }
      // const token = localStorage.getItem("exkey");


    },
    async handlerRecord () {
      let regex = /^1[34578]\d{9}$/g;
      if (!regex.test(this.form.usr_mobile)) {
        Toast("请输入正确的手机号！")
        return
      }
      if (this.form.msgcode.trim() == "") {
        Toast("请输入验证码！")
        return
      }
      try {
        const res = await loginSystem(this.form);
        if (res.status == 200) {
          console.log(res, "res")
          localStorage.setItem("exkey", res.data.token);
          localStorage.setItem("otherid", res.data.usr_id);
          setCookies('token', res.data.token);
          this.formShow = false
          // this.enterRecord = true
          window.location.href = `./weblinkpage.html`;
        }
      } catch (e) {
        console.log()
      }
    },
    handlerCloseForm () {
      this.formShow = false
    },
    handlerCloseRecord () {
      this.enterRecord = false
    },
    handlerEnter () {
      this.enterRecord = false
    },
    handlerOut () {
      this.enterRecord = false
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
  .page-content{
    width: 100%;
    height: 1040px;
    background: url("https://tprsc.tongpumed.com/tpapprsc/library/image/xf22063001.jpg") no-repeat center;
    background-size: 100%;
    .reginst-btn{
      width: 90%;
      height: 42px;
      background: #0067FD;
      border-radius: 5px;
      line-height: 42px;
      text-align: center;
      font-size: 17px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #FFFFFF;
      position: fixed;
      bottom: 20px;
      left: 5%;
      z-index: 2;
    }
  }

  .login-dialog-marsk{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-form-box{
      width: 360px;
      height: 330px;
      background: #FFFFFF;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-form-input{
        width: 290px;
        height: 55px;
        background: #EAEAEA;
        border-radius: 38px;
        border: none;
        padding-left: 20px;
      }
      input::-webkit-input-placeholder{
        color:#FFFFFF;
        font-size: 18px;
      }
      input::-moz-placeholder{
        color:#FFFFFF;
        font-size: 18px;
      }
      input:-ms-input-placeholder{
        color:#FFFFFF;
        font-size: 18px;
      }
      input::-webkit-input-placeholder{
        color:#FFFFFF;
        font-size: 18px;
      }
      input::placeholder{
        color: #FFFFFF;
        font-size: 18px;
      }
      .login-form-input:focus{
        outline: none;
      }
      .phone{
        margin-bottom: 23px;
      }
      .code{
        margin-bottom: 20px;
      }
      .msg-btn{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0067FD;
        line-height: 20px;
        margin-left: 180px;
      }
      .login-btn{
        width: 290px;
        height: 55px;
        background: #0067FD;
        border-radius: 38px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 55px;
        text-align: center;
        margin-top: 20px;
      }
    }
    .close-btn{
      width: 35px;
      height: 35px;
      background: url("../../assets/del.png") no-repeat center;
      background-size: 100%;
      margin-top: 56px;
    }
  }
  .enter-dialog-marsk{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .enter-out-box{
      width: 360px;
      height: 330px;
      background: #FFFFFF;
      border-radius: 8px;
      .enter-out-title{
        width: 100%;
        font-size: 22px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #4E4E4E;
        line-height: 40px;
        padding: 18px 22px;
        box-sizing: border-box;
      }
      .enter-out-btn-box{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .btn-box{
          width: 120px;
          .enter-btn{
            width: 120px;
            height: 120px;
            background: url("../../assets/enter.png") no-repeat center;
            background-size: 100%;
          }
          .out-btn{
            width: 120px;
            height: 120px;
            background: url("../../assets/enter.png") no-repeat center;
            background-size: 100%;
          }
          .btn-desc{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #222222;
            line-height: 24px;
            letter-spacing: 1px;
            text-align: center;
          }
        }
      }
    }
    .enter-out-close{
      width: 35px;
      height: 35px;
      background: url("../../assets/del.png") no-repeat center;
      background-size: 100%;
      margin-top: 56px;
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
