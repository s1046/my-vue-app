<template>
  <div>
    <h2>用户列表</h2>
    <el-table style="width: 100%" stripe border highlight-current-row :data="userList" >
      <el-table-column align="center" prop="number"   label="会员编号" ></el-table-column>
      <el-table-column align="center" prop="nickName" label="员工姓名"></el-table-column>
      <el-table-column align="center" prop="beginDate" label="卡类型"></el-table-column>
      <el-table-column align="center" prop="beginDate" label="卡开始时间"></el-table-column>
      <el-table-column align="center" prop="beginDate" label="卡截至时间"></el-table-column>     
      <el-table-column align="center" prop="beginDate" label="剩余次数"></el-table-column>  
      <el-table-column align="center" prop="registerDate" label="注册时间"></el-table-column>   
      <el-table-column align="center" prop="registerDate" label="备注"></el-table-column>   
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <i class="el-icon-edit"  @click="handleEdit(scope.row)"></i>  &nbsp;&nbsp;    &nbsp;&nbsp;         
          <i class="el-icon-s-data" @click="handleEdit(scope.row)"></i>  &nbsp;&nbsp;    &nbsp;&nbsp;             
          <i class="el-icon-delete"  @click="handleDelete(scope.row)"></i>        
        </template>
      </el-table-column>
    </el-table>
     
    <div class="block">
      <el-pagination
        hide-on-single-page   当数据只有一页时,自动隐藏分页菜单
        @size-change="handleSizeChange"        当每页显示的数据数目发生改变生的动作,需要按新的pageSize查询数据
        @current-change="handleCurrentChange"  当改变当前页时产生的动作
        :current-page="pageNo"                 绑定当前页
        :page-sizes="[5, 10, 30, 50]"          显示pageSize的选项
        :page-size="pageSize"				  绑定当前页数
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">				  绑定当前总数
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default { 
  data(){
    return{
      userList:[],
      pageNo:1,      // 默认当前是第一页
      pageSize:5,    // 当前每页的数据是5条
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
    this.getCount(db);  // 获取当前数据的总数
    this.getList(db);   // 按当前的页号和每页的数据量进行查询
  },
  methods:{
    async getCount(db){       
        let number= await db.collection('users').count()  
        number=number.total
        this.totalCount=number  
    },
    getList(db){
      var that=this;
      var res=db.collection('users') 
      .skip((this.pageNo-1)*this.pageSize)
      .limit(this.pageSize)
      .get({
          success: function(res) {
            that.userList=res.data                
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

       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
          let id=row._id
      
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      // let params = new FormData();
      // params.append("id",row.id);
      // this.axios.post("/delete",params).then(res=>{
      //   if(res.data=="ok"){
      //     this.$notify.success({"title":"删除结果","message":"成功"});
      //     this.getCount();
      //     this.getList();
      //   }else {
      //     this.$notify.error({"title":"删除结果","message":"失败"});
      //   }
      // })
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

