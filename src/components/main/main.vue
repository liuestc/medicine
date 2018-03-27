<template>
  <div class='main-container'>
  	<el-container>
  		<el-header>
        <div class="main-title" @click='gohome'><img src="/static/lhs.png" alt=""></div>
          <el-menu background-color='#324057'  text-color='#C0CCDA ' active-text-color='#fff' router  mode="horizontal" >
              <el-menu-item index='/main/today' >
                  <span>当日病人诊断</span>
              </el-menu-item>
              <el-menu-item index='/main/patient' >
                  <span>病人管理</span>
              </el-menu-item>
              <el-menu-item index='/main/record' >
                  <span>病历管理</span>
              </el-menu-item>
              <el-menu-item index='/main/data'>
                  <span>数据统计</span>
              </el-menu-item>
          </el-menu>
  			<div class="user">
  				<span><img src="/static/account.png" alt="" class='main-account-img'></span>
  				<span class='luwei'>name</span>
  				<span class="main-login-out">注销</span>
  			</div>
  		</el-header>
  		<el-container >
			<el-main><router-view></router-view></el-main>
  		</el-container>
  	</el-container>
  </div>
</template>
<script>
import '../../../static/css/common.css'
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
    gohome(){
      this.$router.push({
        name:'home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.main-container{
		.el-container{
			.el-header{
				background: #324057;
				border-radius: 2px;		
				line-height: 60px;	

				div{
					display: inline-block;
				}
				.user{
					float: right;
					padding-right:20px;
					span{
						display: inline-block;
						vertical-align: middle;
						.main-account-img{
							   width: 30px;
						    height: 30px;
						    vertical-align: middle;
						    margin-right:16px;
						}

					}
					span.main-login-out{
						padding-left:36px;
						font-size: 20px;
						color: #20A0FF;
					}
				}
			}
			.el-aside{
				background: #EFF2F7;
				border-radius: 2px;	
				// height: calc( 100vh - 60px );
				height: calc(~"100vh - 60px");
				padding-top: 90px;
			}
		}
	}
  .main-title{
    float: left;
    line-height: 60px;
    margin-right:98px;
    // vertical-align: middle;
    img{
      vertical-align: middle;
      // width:40px;
      // height:40px;
    }
  }

  .el-menu {
    // float: left;
    float: left;
    .el-menu-item{
      span {
        font-size: 30px;
      }
    }
  }

  .luwei{
    font-size: 28px;
    line-height: 60px;
    color:#fff;
  }
  .el-main{
    padding:10px;
  }

</style>
