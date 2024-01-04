<template>
  <el-container>
    <el-header>
      <div class="edu_header">
        过滤器，可以查看自己关联的班级,这里选中的classId，需要传入给AbnormalBehavior组件
      </div>
    </el-header>
    <el-main>
      <div class="left">
        <video width="100%" height="100%" ref="video" autoplay/>
      </div>
      <div class="right">
        <AbnormalBehavior :class-id="1"></AbnormalBehavior>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AbnormalBehavior from '@/components/AbnormalBehavior.vue'
let mediaStream = ref(null);

const startCamera = async () => {
  try {
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    // 绑定媒体流到 video 标签
    const videoElement = document.querySelector('video') as HTMLVideoElement
    videoElement.srcObject = mediaStream.value;
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};

const stopCamera = () => {
  if (mediaStream.value) {
    // 停止媒体流中的所有 tracks
    const tracks = mediaStream.value.getTracks();
    tracks.forEach(track => track.stop());
    // 解绑 video 标签
    const videoElement = document.querySelector('video') as HTMLVideoElement
    videoElement.srcObject = null;
  }
};
onMounted(async () =>{
  await startCamera();
})
onBeforeUnmount(stopCamera)
</script>
<style scoped lang="less">
.el-container{
  height: 100%;
}
.el-main{
  padding: 0 0 0 14px;
  display: flex;
  justify-content: space-between;

  .left {
    width: 60%;
    height: 100%;
    background-color: #f5f5f5;
    border-right: #dbdee0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  .right{
    width: 40%;
    height: 100%;
    overflow-y: auto;
    background: rgba(222, 220, 220, 0.59);
    padding: 14px;
  }
}
.edu_header{
  padding-top: 14px;
  font-size: 20px;
}

</style>
