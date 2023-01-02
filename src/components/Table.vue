<template>
  <div style="padding:10px;">       
        <div style="text-align:left;">
          <el-form label-position="left" :inline="true" class="demo-form-inline">
          <el-form-item label="会员编号">
            <el-input v-model="number" placeholder="输入会员编号检索"></el-input>
          </el-form-item>   
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button  @click="deleteData">删除</el-button>
          </el-form-item>
        </el-form>
    </div>
    <el-table  ref="multipleTable" style="width: 100%" stripe border highlight-current-row :data="userList"  @selection-change="handleSelectionChange">
      <el-table-column  type="selection"  width="55"></el-table-column>     
      <el-table-column align="center" prop="number"   label="会员编号" ></el-table-column>
      <el-table-column align="center" prop="nickName"   label="姓名" ></el-table-column>
      <el-table-column label="是否会员">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.isMember"
          active-value="1"
          inactive-value="0"
          disabled
        >
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
          <i class="el-icon-edit"  @click="handleEdit(scope.row)"></i>  &nbsp;&nbsp;          
          <i class="el-icon-s-data" @click="lookForDakaData(scope.row)"></i>  &nbsp;&nbsp;             
          <i class="el-icon-delete"  @click="handleDelete(scope.row)"></i>        
        </template>
      </el-table-column>
    </el-table>     
    <div class="block">
      <el-pagination
        hide-on-single-page  
        @size-change="handleSizeChange"        
        @current-change="handleCurrentChange"  
        :current-page="pageNo"                
        :page-sizes="[5, 10, 30, 50]"         
        :page-size="pageSize"				  
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">				  
      </el-pagination>
    </div>
    <DakaPopup   ref="DakaPopup" />
    
  </div>
</template>

<script>
import DakaPopup from './DakaPopup.vue'
export default {
  components: {
    DakaPopup
  }, 
  data(){
    return{
      dialogVisible:false,
      number:'',
      multipleSelection:[],
      userList:[],
      pageNo:1,      // 默认当前是第一页
      pageSize:10,    // 当前每页的数据是5条
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
    this.getCount();  // 获取当前数据的总数
    this.getList();   // 按当前的页号和每页的数据量进行查询
  },
  methods:{ 
    lookForDakaData (row){
        this.$refs.DakaPopup.openPop(row.openId)
    },
    deleteData:function(){
      let that=this;
       let val= this.multipleSelection
       const newArr=val.map(function(value,index){
         return value._id
       })
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
    handleSelectionChange(val) {       
        this.multipleSelection = val;       
    },
    search(){      
        this.getList()
    },
    async getCount(){       
        let number= await this.db.collection('users').count()  
        number=number.total
        this.totalCount=number  
    },
    getList(){
      debugger
      var that=this;
      var collection=this.db.collection('users') 
      if(this.number){
        collection=collection.where({number:this.number})
        .orderBy('registerDate','desc')
        .skip((this.pageNo-1)*this.pageSize)
        .limit(this.pageSize)
        .get({
            success: function(res) {           
              that.userList=res.data   
              console.log(that.userList)             
          }
        })
      }else{
         collection=collection
        .orderBy('registerDate','desc')
        .skip((this.pageNo-1)*this.pageSize)
        .limit(this.pageSize)
        .get({
            success: function(res) {           
              that.userList=res.data  
               console.log(that.userList)                
          }
        })
      }      
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
      this.getList();       // 按新的pageNo和pageSize进行查询
    },
    handleCurrentChange(val) { // 修改当前页所触发的函数
      this.pageNo = val;       // 更新当前的页
      this.getList();          // 按新的pageNo和pageSize进行查询
    }
  }
}
</script>

<style scoped>

</style>

