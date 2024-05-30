<template>
    <view class="activity" wx:for="{{currentActivityList}}" wx:key="{{index}}">
      <image src="{{item.activity_intro_pic}}" class="image"></image>
      <view class="text-container">
        <view class="text-name">{{item.activity_name}}</view>
        <view class="text-other">{{item.activity_start_time}}~{{item.activity_end_time}}</view>
        <view class="text-other">综测分值：{{item.activity_credit}}分</view>
        <view class="text-other">志愿时长：{{item.activity_hour}}小时</view>
        <button bindtap="gotoDetail" size="mini" data-a_id="{{item._id}}">详情：报名/取消</button>
      </view>
    </view>
</template>

<script>
</script>

<style>
</style>