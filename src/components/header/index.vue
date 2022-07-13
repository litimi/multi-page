<template>
  <div class="page-head">
    <div class="logo"></div>
    <div class="heade-right">
      <div class="enterapp-btn" @click="handlerDownLoadApp">{{down}}</div>
      <div class="lang-btn" @click="handlerChangeLan">{{language == 'en'?'EN':'ZH'}}</div>
    </div>
  </div>
</template>

<script>
import {getUrlParams} from "@/utils/commen";

export default {
  name: "Header",
  data() {
    return {
      language: 'zh',
      down: 'APP观看'
    }
  },
  mounted() {
    const urlparams = getUrlParams()
    this.language = urlparams.language || 'zh'
  },
  methods: {
    handlerDownLoadApp() {
      window.location.href = "https://www.tongpumed.com/appbk/tpapkurl.html"
    },
    handlerChangeLan() {
      console.log("4444")
      if (this.language == 'zh') {
        this.language = 'en'
        this.down = 'OpenAPP'
        this.$emit("handlerChangeLan", 'en')
      } else {
        this.language = 'zh'
        this.down = 'APP观看'
        this.$emit("handlerChangeLan", 'zh')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-head{
  width: 100%;
  height: 42px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .logo{
    width: 35px;
    height: 35px;
    background: url("../../assets/logo.png") no-repeat center;
    background-size: 100%;
  }
  .heade-right{
    display: flex;
    .enterapp-btn{
      width: 82px;
      height: 26px;
      background: #0067FD;
      border-radius: 15px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 26px;
      text-align: center;
    }
    .lang-btn{
      width: 26px;
      height: 26px;
      background: rgba(0,0,0,0.1);
      border-radius: 15px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0067FD;
      line-height: 26px;
      margin-left: 15px;
      text-align: center;
    }
  }
}
</style>
