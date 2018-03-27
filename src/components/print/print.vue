<template>
  <div class='print-container'>

	<div class="print-img">
		<img src="/static/title.png" alt="">
	</div>

  	<div class="print-info">
  		<p class='print-info-wrapper'>
  			<span class='print-red'>姓名</span>
  			<span>{{info.name}}</span>
  		</p>
  		<p class='print-info-wrapper'>
  			<span class="print-red">性别</span>
  			<span>{{info.gender}}</span>
  		</p>
  		<p class='print-info-wrapper'>
  			<span class="print-red">年龄</span>
  			<span>{{info.age}}</span>
  			<span class="print-red"> 岁</span>
  		</p>

  		<p class='print-info-wrapper print-red'>
			{{time}}
  		</p>


  	</div>

	<div class="print-medicine">
		<div class="print-content" v-for='(item,index) in recipe'>
			<p></p>
			<p class="print-amount"> <span class='print-red'>{{changeIndex(index)}}</span>：{{item.amount}} <span class='print-red'>付</span></p>
			<div class="print-medicine-name" v-for='one in item.recipeDetailList'>
				<span>{{one.medicine}}</span>
				<span>{{one.dose}}g</span>
			</div>

		</div>
	</div>

	<div class="print-foot">
		<div class="print-foot-name">
			<span class='print-red'>处理医师</span>
			<span class="print-red-bottom"></span>
		</div>

		<div class="print-foot-name">
			<span class='print-red' >调配</span>
			<span class="print-red-bottom"></span>
		</div>
		
		<div class='print-foot-name'>
			<div class="print-foot-img">
				<img src="/static/zhang.png" alt="">
			</div>
			<div class="print-foot-img">
				<img src="/static/qrcode.png" alt="">
			</div>	



		</div>




<!-- 1、每张处方仅限患者本人用药；
2、一天一副药，一天三次，服用时请加热；
3、服药期间如有任何疑问，请及时咨询医师。
4、药物服用完后，请勿自行继续服用原方。 -->
		<div class="print-foot-name print-size">
			<p class='print-red1'>告知</p>
			<p class='print-red1'>1、每张处方仅限患者本人用药；</p>
			<p class='print-red1'>2、一天一副药，一天三次，服用时请加热；</p>
			<p class='print-red1'>3、服药期间如有任何疑问，请及时咨询医师。</p>
			<p class='print-red1'>4、药物服用完后，请勿自行继续服用原方。</p>
			<p class="print-address">
				地址：成都市武侯区丽都路2号附17号
			</p>
			<p class='print-red1'>短信预约电话：18010601111</p>


		</div>


	</div>

  </div>

</template>

<script>
import '../../../static/css/common.css'
import axios from 'axios'   
export default {
  name: '',
  data () {
    return {
      msg: '',
      inquiryId:'',
      recipe:"",
      info:"",
      time:""
    }
  },
  created(){
  	let inquiryId=this.$route.params.inquiryId
  	this.inquiryId=inquiryId
  	let patientId=this.$route.params.patientId
  	this.patientId=patientId

  	console.log(inquiryId)
  	this.getRecipe()
  	this.getInfo()
  	this.getTime()
  },
  methods:{
  	getRecipe(){
  		axios.get("/api/recipe/getRecipe",{
  			params:{
  				inquiryId:this.inquiryId
  			}
  		}).then((res)=>{
  			this.recipe=res.data.returnData.recipleList[0].recipeList
  			console.log("this.recipe",this.recipe)
  		})
  	},
  	getInfo(){
  		axios.get("/api/patient/getPatientInfo",{
  			params:{
  				patientId:this.patientId
  			}
  		}).then((res)=>{
  			this.info=res.data.returnData.patientInfo
  			console.log("this.info",this.info)
  		})
  	},
  	changeIndex(index){
  		if(index==0){
  			return "主方"
  		}
  		else{
  			return "附方"+index
  		}
  	},
  	getTime(){
  		axios.get('/api/dailyPatient/getInquiryInfo',{
  			params:{
  				inquiryId:this.inquiryId
  			}
  		}).then((res)=>{
  			console.log("res",res)
  			this.time=res.data.returnData.inquiry_date
  		})
  	}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.print-container{
	width:92%;margin:0 auto;
	font-size:16px;
}

.print-img{
	text-align: center;
	width:80%;
	margin:0 auto;
	img{
		width:100%;
	}
}

.print-info-wrapper{
	display: inline-block;
	width:20%
}
.print-red{
	color:#D02929 ;
	font-weight:600;
	display: inline-block;
	margin-right:20px;
}
.print-red1{
	color:#D02929 ;
	font-weight:600;
	// display: inline-block;
	margin-right:20px;
}
.print-address{
	color:#D02929 ;
	font-weight:600;
	border-top:1px dashed  #D02929;
	margin:10px 0;
	padding-top:10px;
	width:400px;
}
.print-info{
	border-bottom:1px solid #D02929;
	padding-bottom:10px;
}

.print-medicine-name{
	display: inline-block;
	width:25%;
}

.print-medicine-name{
	padding:4px 0;
	font-weight: 600;
}

.print-content{
	padding-bottom:20px;

}
.print-content:last-child{
	border-bottom: 1px solid #D02929 ;
}
.print-medicine{
	padding: 10px 0;
}

.print-red-bottom{
	display: inline-block;
	width:100px;
	height:30px;
	border-bottom:1px solid #D02929 ;
}
.print-foot-name{
	display: inline-block;
	width:48%;
}
.print-foot-name:nth-child(2){
	text-align: right;
}
.print-foot-img{
	display: inline-block;
	width:150px;
	img{
		width:100%;
	}
}
.print-size{
	font-size:16px;
}
</style>
