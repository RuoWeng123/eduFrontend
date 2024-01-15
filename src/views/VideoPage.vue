<template>
  <el-container>
    <el-header>
      <div class="edu_header">
        过滤器，可以查看自己关联的班级,这里选中的classId，需要传入给AbnormalBehavior组件
      </div>
    </el-header>
    <el-main>
      <div class="left">
        <video
          id="myVideo"
          poster="https://dummyimage.com/1280x720"
          muted
          loop
          playsinline
          @loadedmetadata="fnRun"
        ></video>
        <canvas id="myCanvas" />
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
import * as faceApi from 'face-api.js'

let options = ref<any>(null)
let videoEl = ref(null)
let canvasEl = ref(null)
const detectFace = 'detectSingleFace'
const detection = 'landmark'
let timeout = null;
const constraints = {
    audio: false,
    video: {
      // ideal（应用最理想的）
      width: {
        min: 320,
        ideal: 1280,
        max: 1920
      },
      height: {
        min: 240,
        ideal: 720,
        max: 1080
      },
      // frameRate受限带宽传输时，低帧率可能更适宜
      frameRate: {
        min: 15,
        ideal: 30,
        max: 60
      },
      // 显示模式前置后置
      facingMode: 'environment'
    }
  };


const fnInit = async () => {
  await faceApi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceApi.loadFaceLandmarkModel('/models')
  options.value = new faceApi.SsdMobilenetv1Options({ minConfidence: 0.5 })
}

const fnRunFaceLandmark = async () =>{
  const videoIns = document.getElementById('myVideo');
  const canvasIns = document.getElementById('myCanvas');
  if(videoIns.paused){
    return clearTimeout(timeout)
  }
  // 识别绘制人脸信息  detectAllFaces 多模态
  const result = await faceApi.detectAllFaces(
    videoIns,
    options.value
  ).withFaceLandmarks()
  if (result && !videoIns.paused) {
    const dims = faceApi.matchDimensions(canvasIns, videoIns, true)
    const resizeResult = faceApi.resizeResults(result, dims)
    faceApi.draw.drawDetections(canvasIns, resizeResult)
  } else {
    canvasIns.getContext('2d').clearRect(0, 0, canvasIns.width, canvasIns.height)
  }

  // 置于宏任务队列的 循环，避免内存溢出
  timeout = setTimeout(() => {
    fnRunFaceLandmark();
  }, 0);
}

const fnRun = () =>{
  fnRunFaceLandmark();
}

let mediaStream = ref(null)
const fnOpen = () =>{
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoEl.value.srcObject = stream
      mediaStream.value = stream
      videoEl.value.onloadedmetadata = () => {
        videoEl.value.play()
        fnRun();
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const fnClose = () =>{
  canvasEl.value.getContext('2d').clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
  videoEl.value.pause()
  clearTimeout(timeout)
  if(mediaStream.value){
    const tracks = mediaStream.value.getTracks();
    tracks.forEach(track => track.stop());
    videoEl.value.srcObject = null
  }
}

onMounted(async () => {
  videoEl.value = document.getElementById('myVideo')
  canvasEl.value = document.getElementById('myCanvas')
  fnInit()
  setTimeout(() =>{
    fnOpen();
  },1000)
})
onBeforeUnmount(fnClose)
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
}

.el-main {
  padding: 0 0 0 14px;
  display: flex;
  justify-content: space-between;

  .left {
    width: 70%;
    height: 100%;
    background-color: #f5f5f5;
    border-right: #dbdee0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    position: relative;
  }

  .left canvas{
    position: absolute;
    top: 0;
    left: 0;
  }

  .right {
    width: 30%;
    height: 100%;
    overflow-y: auto;
    background: rgba(222, 220, 220, 0.59);
    padding: 14px;
  }
}

.edu_header {
  padding-top: 14px;
  font-size: 20px;
}

</style>
