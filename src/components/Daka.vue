<template>
  <div style="padding:10px;">       
        <div style="text-align:left;">
          <el-form label-position="left" :inline="true" class="demo-form-inline">
            <el-form-item label="打卡日期">
              <el-date-picker 
                align="left"
                v-model="selectDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
                </el-date-picker>           
            </el-form-item>   
            <el-form-item label="会员编号">
                <el-input v-model="number" placeholder="输入会员编号检索"></el-input>
            </el-form-item>   
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>            
          </el-form-item>
        </el-form>
    </div>
    <el-table  ref="multipleTable" style="width: 100%" stripe border highlight-current-row :data="userList"  >     
      <el-table-column align="center" prop="number"   label="会员编号" ></el-table-column>     
      <el-table-column label="是否会员">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.isMember"
          active-value="1"
          inactive-value="0"
          disabled>
        </el-switch>
      </template>
      </el-table-column>  
      <el-table-column align="center" prop="cardType" label="卡类型"></el-table-column>
      <el-table-column align="center" prop="cardBeginTime" label="卡开始时间"></el-table-column>
      <el-table-column align="center" prop="cardEndTime" label="卡截至时间"></el-table-column>     
      <el-table-column align="center" prop="cardLeft" label="剩余次数"></el-table-column>  
      <el-table-column align="center" prop="registerDate" label="注册时间" ></el-table-column>   
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>   
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <i class="el-icon-edit"  @click="handleEdit(scope.row)"></i>  &nbsp;&nbsp;   &nbsp;&nbsp;         
          <i class="el-icon-s-data" @click="lookForDakaData(scope.row)"></i> 
        </template>
      </el-table-column>
    </el-table>  

    <el-dialog
      title="今日打卡记录"
      :visible.sync="dialogVisible"
      width="30%"
      >      

       <el-table  ref="multipleTable" style="width: 100%" stripe border highlight-current-row :data="dakaList"  >     
          <el-table-column align="center" prop="number"   label="会员编号" ></el-table-column>
          <el-table-column align="center" prop="daka_time" label="打卡时间"></el-table-column>
      </el-table>  
     
      <span slot="footer" class="dialog-footer">      
        <el-button  @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>   

  </div>
</template>

<script>
export default { 
  data(){
    return{
      dialogVisible: false,
      selectDate:this.utils.formateDate(new Date()),
      number:'',
      multipleSelection:[],
      userList:[],
      dakaList:[] 
    }
  },
  mounted() {    
     
    var cloud = new this.cloud.Cloud({
        // 必填，表示是未登录模式
        identityless: true,
        // 资源方 AppID 填自己的
        resourceAppid: this.APPID,
        // 资源方环境 ID	填自己的
        resourceEnv: this.ENVID
      })

    cloud.init()
    const db = cloud.database();    
    this.db=db  
    this.cloud=cloud 
    this.getList();   // 按当前的页号和每页的数据量进行查询
    
  },
  methods:{    
   
    search(){      
        this.getList()
    },
  
    getList(){ 
        var param={type:'backendDaka'}
        if(this.selectDate){
          param.searchDate=this.selectDate
        }    
        if(this.number){
            param.number=this.number
        } 
        let userList=[]    
        this.cloud.callFunction({
          name: 'quickstartFunctions',      
          data:param
        }).then(res=>{            
            if(res.result.list.length>0){
              res.result.list.forEach(item=>{
                 if(item.user.length>0){
                     userList.push(item.user[0])    
                 }
                  
              })                      
              this.userList=userList           
            }else{
              this.userList=[]
            }            
        })
        
    },
    handleEdit(row){    // 对该行数据进行更新
      this.$router.push({
        path:'/edit',
        query:{id:row._id}
      })
    },
    lookForDakaData(row){ // 对改行数据进行删除      
      this.dialogVisible=true    
      let openId=row.openId  
      this.db.collection('daka').where({
        daka_date:this.selectDate,
        openId:openId
      }).get().then(res=>{
         this.dakaList=res.data
      })
    }
  
  }
}
</script>

<style scoped>

</style>

