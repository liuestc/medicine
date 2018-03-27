<template>
  <div class='home-container'>
  	<div class="home-img">
  		
  		<div class='home-img-wrapper'>
  			<img src="/static/ic_check.png" alt="" class='home-img-style'>
  			<p>今日预约病人</p>
  			<p class='blue'>123</p>	
  		</div>
  		<div class='home-img-wrapper'>
  			<img src="/static/ic_order.png" alt="" class='home-img-style'>
  			<p>今日预约病人</p>
  			<p class='blue'>123</p>	
  		</div>
  	</div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.home-img{
		text-align: center;
		margin-top:200px;
		font-size: 20px;
		.home-img-wrapper{
			display: inline-block;
			margin:0 40px;
			p{
				padding:10px 0;
				font-weight: 600;
			}
		}
		// .home-img-style{
		// 	margin:0 20px;
		// }
	}
</style>
