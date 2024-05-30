<template>
  <!-- 模块中只能拥有一个主根对象 -->
<view>
  <homeSearch @click="gotoSearch"></homeSearch>
  <view class="swiperBox">
        <!-- 轮播图区域 -->
    <swiper  :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的item项 -->
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <!-- url中存放/subpkg路径下的活动详情界面 -->
        <navigator class="swiper-item">
          <!-- 动态绑定图片的src属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
  
  
  <view class="newNoticeBox">
    <view class="newNoticePicBox">
      <image class="newNoticePic" src="../../static/home-icons/notification.png"></image>
    </view>
    
    <swiper class="swiper_notice" :vertical="true" :autoplay="true" :circular="true" :interval="3000">
      <swiper-item v-for="(item,i) in notice" :key="i">
        <view class="textBox">
          <view class="swiper_notice_text">{{item}}</view>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- bindtap="goMore" -->
    <view class="goMore" @click="toDetail">
      详情 >
    </view>
  </view>
  
  <view class="volActBox">
    <view class="volActTop">
        <view class="textBox">
          志愿项目
        </view>
        <!-- bindtap="goMore" -->
        <view class="goMoreAct">
          更多 >
      </view>
    </view>
    
      <scroll-view class="volActMain" style="height: 45vh;" scroll-y="true" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
        <!-- <view class="volActItem" v-for="(item,i) in volActs" :key="i"> -->
        <view class="volActItem">
          <view class="volActImage">
            <image src="../../static/uni.png"></image>
          </view>
          <view class="volActMsg">
            <view class="volActMsgItem">活动名称：123123</view>
            <view class="volActMsgItem">活动名称：123123</view>
            <view class="volActMsgItem">活动名称：123123</view>
          </view>
          
          
        </view>
        <view class="volActItem">
          <view class="volActImage">
            <image src="../../static/uni.png"></image>
          </view>
          <view class="volActMsg">
            <view class="volActMsgItem">活动名称：123123</view>
            <view class="volActMsgItem">活动名称：123123</view>
              <view class="volActMsgItem">活动名称：123123</view>
          </view>
          
          
        </view>
        <view class="volActItem">
          <view class="volActImage">
            <image src="../../static/uni.png"></image>
          </view>
          <view class="volActMsg">
            <view class="volActMsgItem">活动名称：123123</view>
            <view class="volActMsgItem">活动名称：123123</view>
              <view class="volActMsgItem">活动名称：123123</view>
          </view>
          
          
        </view>
        
        
      </scroll-view>
    
  </view>
  
</view>
  
</template>

<script>
  export default {
    data() {
      return {
        // 这是轮播图的数据列表
        swiperList: [],
        notice:['清明烈士陵园扫墓活动','关爱母亲河水质'],
      };
    },
    onLoad(){
      // 调用方法，获取轮播图的数据
      this.getSwiperList()
    },
    
    methods:{
      async getSwiperList(){
        
        // const {data: res}= await uni.request({url:'http://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',method:'GET'})
        // 通过花括号来解构对象，以key:value的形式赋值
        const {data:res} =await uni.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败
        if(res.meta.status!==200) return uni.$showMsg()

        this.swiperList=res.message
      },
      
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      toDetail(){
        uni.navigateTo({
          url:'/pages/detail/detail'
        })
      }
    },
  }
</script>

<style lang="scss">
  
  
  .swiperBox{
    display: flex;
    background: #fff;
    margin: 30rpx 20rpx 20rpx 20rpx;
    border-radius: 10rpx;
    height:30vh;
    line-height: 30vh;
  }
  swiper{
      width: 100%;
      height: 100%;
    }
    .swiper-item image{
      width: 100%;
      height: 30vh;
    }
  .newNoticeBox{
    display: flex;
    background: #fff;
    margin: 30rpx 20rpx 20rpx 20rpx;
    border-radius: 10rpx;
    height: 5vh;
    line-height: 5vh;
  }
  .newNoticePicBox {
    flex: 1;
    padding-left: 20rpx;
    padding-top: 5rpx;
  }
  .newNoticePic {
    width: 34rpx;
    height: 34rpx;
  }
  .swiper_notice{
    flex: 15;
    height: 100%;
    padding-left: 12rpx;
    padding-bottom: 6rpx;
    width: 80vw;
    }
  .swiper_notice .textBox{
    height:100%;
    width: 100%;
    display: flex;/*横向布局*/
  }
  .swiper_zi .textBox .swiper_notice_text {
    font-size: 26rpx;
    overflow: hidden;/*隐藏溢出*/
    text-overflow: ellipsis;/*显示省略符号来代表被修剪的文本*/
    white-space: nowrap;/*强制文字不换行*/
    color: #E1BC74;
    height: 100%;
    line-height: 50rpx;
  }
  .goMore{
    font-size: 26rpx;
    color: #1AAD19;
    padding-right: 30rpx;
  }
  
  .volActBox{
    display: block;
    background: #fff;
    margin: 30rpx 20rpx 20rpx 20rpx;
    border-radius: 10rpx;
    height: 50vh;
    line-height: 56vh;
  }
  
  .volActTop{
    display:flex;
    border-bottom: #d9d9d9 solid 4rpx;
    width:100%;
    border-radius: 10rpx;
    height: 5vh;
    font-size: 26rpx;
    color: #1AAD19;
    line-height: 5vh;
  }
  .volActTop .textBox{
    font-weight: bold;
    padding-left: 30rpx;
    height:100%;
    width:100%;
    flex:15;
    
  }
  .goMoreAct{
    font-size: 26rpx;
    color: #1AAD19;
    padding-right: 30rpx;
  }
 
  .volActBox .volActMain{
    display: block;
    width:100%;
    height:30vh;
  }
  
  .volActItem{
    display: flex;
    flex-direction: row;
    // height: 20vh;
    padding: 15rpx;
    border: 1rpx solid #efefef;
    margin: 15rpx;
    border-radius: 8rpx;
    box-shadow: 1rpx 1rpx 15rpx #ddd;
  }
  
  .volActImage image{
    // flex:1;
    width: 240rpx;
    height: 220rpx;
    display: block;
    margin-right: 15rpx;
  }
  .volActMsg{
    flex:2;
    margin-left: 20rpx;
    // height: 200rpx;
    // display: flex;
    // flex-direction: column;
  }
  
  .volActMsgItem{
    // margin-left: 2vh;
    // flex:1;
    line-height: 64rpx;;
    font-size: 32rpx;
    color: #333;
  }
</style>
