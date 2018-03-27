<template>
  <div class='login-container'>
    <div class="login-content">
      <!-- login -->
      <el-form label-position='left' label-width='80px'>
        <el-form-item label='用户名'>
          <el-input></el-input>  
        </el-form-item>
        <el-form-item label='密码'>
          <el-input></el-input>  
        </el-form-item>
      </el-form>
      <el-button type='primary' @click='login'>确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
    login(){
      this.$router.push({
        name:'main'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.login-container{
  width:100%;


  .login-content{
      width:384px;
      height:246px;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      background: #FFFFFF;
      border: 1px solid #D3DCE6;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
      border-radius: 2px;
      text-align: center;

      .el-form{
        padding:42px 32px;
        padding-bottom:0
      }
      .el-button{
        width:82%;
        margin:0 auto;
      }


  }
}
</style>
