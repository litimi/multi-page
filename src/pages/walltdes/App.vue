<template>
  <div id="app">
    <div class="title">收益提现</div>
    <p class="desc">当前，用户可在手机端同普医学账号后台进行提现：
      个人类帐号需要在同普医学App点击“我的 - 钱包- 提现” 进行提现</p>
    <p class="tips">请注意：根据平台规则，帐号若被封禁，自封禁之时起不可提现，请遵守用户协议与平台相关规范，以避免不必要的损失。</p>
    <div class="title">1.提现规则</div>
    <p class="desc">适用范围：<br/>
      支持个人类帐号提现<br/>
      机构帐号（企业、群媒体、国家机构、其他组织、新闻媒体）暂不支持
    </p>
    <div class="title">2.提现时间</div>
    <p class="desc">每月3号以后对上月及以前月份的账单进行提现，每月1-3号三天不支持提现<br/>
      申请提现后，收益实时到账，一般不超过两天，如遇特殊情况，可能会延迟
      若未及时到账，请通过“同普医学App - 我的 - 客服中心”进行咨询
    </p>
    <div class="title">3.绑定/修改/解绑支付宝</div>
    <p class="desc">在“同普医学App - 我的 - 钱包 - 右上角  -修改认证信息”进行操作
      绑定收款账号时，必须使用同普医学号实名认证人所持有的支付宝
    </p>
    <div class="title">4.提现标准</div>
    <p class="desc">帐号可提现金额≥100元，每次提现可选择提现金额</p>
    <div class="title">5.个人所得税</div>
    <p class="desc">说明：个人所得税纳税信息可在【个人所得税App】中查询，非签约个人作者的扣缴义务人为“同普医学科技（杭州）有限公司”。
      扣税金额与收益产生的月份无关，只与操作提现的自然月有关
    </p>
    <div class="title">6.具体扣税规则：</div>
    <p class="desc">您在同普医学的收益属劳务报酬，根据《中华人民共和国个人所得税法》，个人得到劳务报酬时需缴纳个税。相关个税的缴纳由同普医学代扣代缴，以下是计算公式。</p>
    <img class="guize" src="../../assets/guize.png" />
    <p class="tips">相关信息请参考《中华人民共和国个人所得税法》</p>
    <p class="lizi">例如：金额为2000（税前），扣税金额为（2000-800）*0.2=240，到手金额为1760元。</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
  }
}
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  .title{
    font-size: 17px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: #222222;
    line-height: 26px;
  }
  .desc{
    font-size: 15px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 26px;
  }
  .tips{
    font-size: 15px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #222222;
    line-height: 26px;
  }
  .guize{
    width: 100%;
  }
  .lizi{
    font-size: 15px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #7A7A7A;
    line-height: 24px;
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
  background: #ffffff;
}
h1,h2,h3,h4,h5,p,span,div{
  padding: 0;
  margin: 0;
}
</style>
