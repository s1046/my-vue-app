<template>
<div class="login_container">
    <div class="login_box">
    <!-- 登陆表单区域 -->
    <el-form ref="loginFormRef" :model="loginFrom" :rules="LoginfromRules"   label-width="0px" class="login_form">
        <!-- 用戶名 -->
      <el-form-item prop="username">
         <el-input  v-model="loginFrom.username">
         </el-input>
      </el-form-item>
      <!-- 密碼 -->
        <el-form-item prop="password">
         <el-input  type="password" v-model="loginFrom.password">
         </el-input>
      </el-form-item>
      <!-- 按鈕 -->
        <el-form-item  class="btns">
         <el-button type="primary" @click="login">登录</el-button>
         <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>




    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
         
            loginFrom:{
                username:'',
                password:''
            },
             LoginfromRules:{
                   // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]

    }
        }
    },
    mounted(){
          var cloud = new this.cloud.Cloud({
            // 必填，表示是未登录模式
            identityless: true,
            resourceAppid: this.APPID,       
            resourceEnv: this.ENVID
       })
      cloud.init()
      const db = cloud.database()
      this.db=db  

      if(window.localStorage.getItem("token")){
           this.$router.push({
             path:'/table'                       
          })
      }       
       
    },
    methods:{
        login(){
           this.db.collection('admin').where({
               username:this.username,
               password:this.password
           }).get().then(res=>{
               if(res.data.length>0){
                   window.localStorage.setItem("token",this.username)
                   this.$router.push({
                        path:'/table'                       
                   })
               }
           })
        },
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        }
    }
   
}
</script>
<style  scoped>
.login_container{
    background: #2b4b6b;
    height:100%;

}
.login_box{
    width: 450px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.418);
    border-radius:5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;  
    box-sizing: border-box;

}
.btns{
    display: flex;
    justify-content: center;
}
</style>
