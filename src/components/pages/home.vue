<template>
  <el-container>
    <el-header>
      <Headers />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-main>
         <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Headers from '@/layout/headers.vue'
import SideBar from '@/layout/sidebar.vue'

export default {
  components: {
    Headers,
    SideBar
  },
  //利用生命周期的beforeCreate 的钩子函数提前验证用户是否登录
  beforeCreate(){
    var token = window.localStorage.getItem('token')
    if(!token){
      //没有跳转
      this.$message.error('请先登录')
      this.$router.push('/login')
      return
    }
  }
};
</script>
   
<style>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    padding: 0;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height:100%;
  }
  
   .el-container {
    height:100%;
  }
  
</style>
