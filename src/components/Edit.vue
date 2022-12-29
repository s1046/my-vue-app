<template>
<div>
<div style="margin: 20px;"></div>
<el-form label-position="right" label-width="120px" :model="formLabelAlign">
  <el-form-item label="昵称" >
    <el-input v-model="formLabelAlign.nickName" disabled></el-input>
  </el-form-item>
  <el-form-item label="会员编号" >
     <el-input v-model="formLabelAlign.number" disabled></el-input>
  </el-form-item>
   <el-form-item label="卡类型">
    <el-input v-model="formLabelAlign.cardType" ></el-input>
  </el-form-item>
  <el-form-item label="剩余次数">
    <el-input v-model="formLabelAlign.cardLeft" ></el-input>
  </el-form-item>
  <el-form-item label="卡开始时间">
    <el-input v-model="formLabelAlign.cardBeginTime" ></el-input>
  </el-form-item>
    <el-form-item label="卡结束时间">
    <el-input v-model="formLabelAlign.cardEndTime" ></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="formLabelAlign.remark"></el-input>
  </el-form-item>

   <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>   
     <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {     
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          nickName:'',
          avatarUrl:''
        }
      };
    },
    mounted(){
        let id=this.$route.query.id
        var cloud = new this.cloud.Cloud({
            // 必填，表示是未登录模式
            identityless: true,
            resourceAppid: this.APPID,       
            resourceEnv: this.ENVID
       })

      cloud.init()
      const db = cloud.database()
      db.collection('users').doc(id).get().then(res=>{
      
          this.formLabelAlign=res.data
        
      })
     
       
    },
    methods:{
        onSubmit(){},
        cancel(){
             this.$router.go(-1)
        }
    }
  }
</script>