<template>
<div>
<div style="margin: 20px;"></div>
<el-form label-position="right" label-width="120px" :model="formLabelAlign">
  <el-form-item label="姓名" >
    <el-input v-model="formLabelAlign.nickName" ></el-input>
  </el-form-item>
  <el-form-item label="会员编号" >
     <el-input v-model="formLabelAlign.number" ></el-input>
  </el-form-item>
  <el-form-item label="是否会员" >
    <div style="display:flex;text-align:left;align-items:center;height:100%;padding-top:12px;">
    <el-switch
    v-model="formLabelAlign.isMember"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="1"
    inactive-value="0"    >
    </el-switch>
    </div>
  </el-form-item>
   <el-form-item label="卡类型">
       <div style="display:flex;text-align:left;">
             <el-select v-model="formLabelAlign.cardType" placeholder="请选择"  clearable filterable allow-create default-first-option >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
       </div>
      
  </el-form-item>
  <el-form-item label="剩余次数">
    <el-input v-model="formLabelAlign.cardLeft" ></el-input>
  </el-form-item>
  <el-form-item label="卡开始时间">
      <div style="display:flex;text-align:left;">
                <el-date-picker 
        align="left"
        v-model="formLabelAlign.cardBeginTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
        </el-date-picker>
      </div> 
  </el-form-item>
  <el-form-item label="卡结束时间">
      <div style="display:flex;text-align:left;">
                <el-date-picker 
        align="left"
        v-model="formLabelAlign.cardEndTime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期">
        </el-date-picker>
      </div> 
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
          options:[{value:'小时卡','lable':'小时卡'},{value:'月卡','lable':'月卡'},{value:'长期卡','lable':'长期卡'},{value:'次卡','lable':'次卡'}], 
          formLabelAlign: {}
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
      this.db=db;
      db.collection('users').doc(id).get().then(res=>{      
          this.formLabelAlign=res.data                  
      })
    },
    methods:{
       async onSubmit(){      
            var that=this;
            let data=this.formLabelAlign
            let id=data._id
            var param = {...data}
            delete param._id 
            const _ = this.db.command         

            let result= await this.db.collection('users').where({
               number:param.number,
               openId:_.nin([param.openId])
            }).get().then(res=>{                 
                 if(res.data.length>0){
                      this.$message({
                          message: '会员编号重复',
                          type: 'error'
                      });
                      return 0
                 }else{
                   return 1
                 }                
            })

            if(result==1){
              this.db.collection('users').doc(id).update({
                data:param,
                success: function(res) {                                  
                     that.$message({
                        message: '更新成功',
                        type: 'success'
                      });

                    setTimeout(function(){
                       that.$router.go(-1)
                    },1000)
                }
               })            

            }
            
            
        },
        cancel(){
            this.$router.go(-1)
        }
    }
  }
</script>