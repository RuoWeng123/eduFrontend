<template>
  <div class="login_container">
    <div class="left">
      这是一张图片
    </div>
    <div class="right">
      <h2>中州小学教务系统</h2>
      <el-form
        ref="formRef"
        label="left"
        :model="formData"
        :rules="rules"
        status-icon
        class="form_class"
        :validate-on-rule-change="true"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="formData.pass" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="submit_btn" type="primary" @click="submit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import type {FormInstance, FormRules} from 'element-plus'
  import { getEduClient, setAuthToken } from '@/api/eduApi'
  import { useUserStore } from '@/stores/auth'
  import router from '@/router'

  const formRef = ref<FormInstance>();
    const formData = reactive({
      username: 'admin',
      pass: 'Abc12345'
    })
    const validateUsername = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if(value.length < 2 || value.length > 8) {
        callback(new Error('长度在 2 到 8 个字符'))
      } else {
        callback()
      }
    }
    const validatePass = (rule: any, value: string, callback: any) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if(value.length < 6 || value.length > 10) {
        callback(new Error('长度在 6 到 10 个字符'))
      } else if(!reg.test(value)) {
        callback(new Error('密码必须包含大小写字母和数字'))
      } else{
        callback();
      }
    }
    const rules = reactive<FormRules>({
      username: [{validator: validateUsername, trigger: 'blur'}],
      pass: [{validator: validatePass, trigger: 'blur'}]
    })

    const submit = async (formEl: FormInstance | undefined) => {
      if(!formEl) return
      let valid = await formEl.validate()
      if(!valid) return;
      getEduClient().loginTeacher({username: formData.username, password: formData.pass}).then(res => {
        console.log('登录结果',res)
        if(res.id){
          setAuthToken(res.token)
          const {setUser} = useUserStore();
          setUser({id: res.id, name: formData.username, role_id: res.role_id,token: res.token});
          router.push('/inner')
        }
      }).catch(err => {
        console.log(err)
      });
    }
</script>

<style scoped lang='less'>
.login_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
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
  .right {
    width: 40%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2{
      width: 400px;
      margin-bottom: 36px;
    }

    .form_class{
      width: 400px;

      .el-form-item{
        margin-bottom: 24px;
      }
    }

    .submit_btn{
      width: 100%;
      margin-top: 12px;
    }
  }
}
</style>
