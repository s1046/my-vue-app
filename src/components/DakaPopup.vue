<template>
  <div style="padding:10px;"> 
    <el-dialog
      title="打卡记录"
      :visible.sync="show"
      width="40%"      
      >
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
            
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>            
          </el-form-item>
        </el-form>
    </div>
      <el-table  ref="multipleTable1" style="width: 100%" stripe border highlight-current-row :data="dakaList"  >     
          <el-table-column align="center" prop="number"   label="会员编号" ></el-table-column>
          <el-table-column align="center" prop="daka_time" label="打卡时间"></el-table-column>
      </el-table> 
      <div class="block">
            <el-pagination
              hide-on-single-page  
              @size-change="handleSizeChange"        
              @current-change="handleCurrentChange"  
              :current-page="pageNo"                
              :page-sizes="[6, 12]"         
              :page-size="pageSize"				  
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">				  
            </el-pagination>
        </div>
      <span slot="footer" class="dialog-footer">      
        <el-button  @click="closePop">关闭</el-button>
      </span>
    </el-dialog>  

  </div>
</template>

<script>
export default { 
  data(){
    return{  
      selectDate:'',
      number:'',
      show:false,
      dakaList:[],    
      multipleSelection:[],
      userList:[],
      pageNo:1,      // 默认当前是第一页
      pageSize:6,    // 当前每页的数据是5条
      totalCount:0   // 总数默认为0
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
  },
  methods:{
    handleClose(){
        this.show=false
        this.$emit('closePop');
    },
    openPop(number){        
        this.show=true  
        this.number=number     
        this.getList(number)
        this.getCount(number)
    },
    closePop(){
        this.show=false
        this.$emit('closePop');
    },   
    handleSelectionChange(val) {       
        this.multipleSelection = val;       
    },
    search(){      
        this.getList(this.number)
        this.getCount(this.number)
    },
     async getCount(no){
        var param={}
        param.openId=no
        if(this.selectDate){
           param.daka_date=this.selectDate
        } 
        let num= await this.db.collection('daka').where(param).count()        
        let number=num.total
        this.totalCount=number  
    },
    getList(number){     
      var that=this;
      var param={}
      param.openId=number
      if(this.selectDate){
         param.daka_date=this.selectDate
      }     
      var collection=this.db.collection('daka').where(param).orderBy('daka_time','desc')
        .skip((this.pageNo-1)*this.pageSize)
        .limit(this.pageSize)
        .get({
            success: function(res) { 
              that.dakaList=res.data   
              console.log(that.userList)             
          }
        })
          
    },
    handleEdit(row){    // 对该行数据进行更新
      this.$router.push({
        path:'/edit',
        query:{id:row._id}
      })
    },
    handleDelete(row){ // 对改行数据进行删除
      let newArr=[]
      var that=this;
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          newArr.push(row._id)
          newArr.forEach(item=>{
             var collection=this.db.collection('users')
             collection.doc(item).remove()
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          setTimeout(function(){
               that.getCount()
               that.getList()
          },500)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      
    },
    handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
      this.pageSize = val;  // 修改页的大小
      this.getList(this.number);       // 按新的pageNo和pageSize进行查询
    },
    handleCurrentChange(val) { // 修改当前页所触发的函数
      this.pageNo = val;       // 更新当前的页
      this.getList(this.number);          // 按新的pageNo和pageSize进行查询
    }
  }
}
</script>

<style scoped>

</style>

