<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="今日打卡" name="second">今日打卡</el-tab-pane> 
  </el-tabs>    
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'App',
   data() {
      return {
        activeName: 'first'
      };
  },
  methods: {
    handleClick(tab, event) {  
      let index=tab.index
      if(index==1){
         this.activeName='second'
         this.$router.push({
            path:'/daka'          
         })
      }
      if(index==0){
        this.activeName='first'
         this.$router.push({
            path:'/table'          
         })
      }
      console.log(tab, event);
    }
  }
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
