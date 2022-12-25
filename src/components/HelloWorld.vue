<template>
  <div class="hello">
    <h1>{{ msg }}</h1>    
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
      var c1 = new this.cloud.Cloud({
        // 必填，表示是未登录模式
        identityless: true,
        // 资源方 AppID 填自己的
        resourceAppid: 'wx751f9b34cbfd4fef',
        // 资源方环境 ID	填自己的
        resourceEnv: 'cloud1-8gupzdmcdb84088b',
      })

      c1.init()

      const db = c1.database();

      db.collection("students").get().then(res => {
        
  
         console.log(res.data)
     })      

    

  }
}






</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
