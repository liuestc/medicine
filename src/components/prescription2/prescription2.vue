<template>
	<div class='pre-container'>
	  	<div class="pre-left">
	  		<div class='pre-left-content'>
	  			<div class="pre-left-p" v-for='item in problemDes'>
	  				<div class="one-des" v-for='more in item'>
	  					<!-- {{key}}/{{value}} -->
	  					<p v-for='(value,key) in more'>
	  						<span >{{key}}/</span>
	  						<span class='blue'>{{value}};</span>
	  					</p>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="pre-right">
	  		<div class="pre-right-main">
	  			<div class="pre-item"  v-for='(item,index) in recipe.recipeList'>
	  				<p class="pre-title">{{changeWord(index)}}</p>
		  			<div class="pre-input" v-for='detail in item.recipeDetailList'>
		  				<el-input placeholder="药名" v-model="detail.medicine" class='pre-input-name'>
						</el-input>
						<el-input class='pre-input-quantity' v-model.number="detail.dose"></el-input>
		  			</div>	
		  			<p class='pre-sub-fufang'>方{{index}}<el-input class='pre-input-medicine' v-model='recipeAmount[index].amount'></el-input>付</p>  
	  			</div>

			  	<div class="pre-btn-wrapper">
			  		<el-button type='primary' @click='addPrescription'>确认药方</el-button>
            <el-button type='primary' @click='completePrescription' :disabled='btnDisable'>完成诊断</el-button>
            <el-button type='primary' @click='printMedicine' :disabled='btnDisable'>打印</el-button>
			  	</div>

	  		</div>
	  	</div>

	</div>
</template>
<script>
import axios from 'axios'
import '../../../static/css/common.css'
export default {
  name: '',
  data () {
    return {
      btnDisable:true,
    	recipeAmount:[],
      mainRecipeId:"",
      recipe:{
      	recipeList:[]
      },
      msg: '',
      mainPreName:new Array(20),
      mainPreQuan:[],
      sub1PreName:[],
      sub1PreQuan:[],
      sub2PreName:[],
      sub2PreQuan:[],      
      sub3PreName:[],
      sub3PreQuan:[],   
      sub4PreName:[],
      sub4PreQuan:[],
      problemDes:[],
      zhufang1:"",
      fufang1:"",
      fufang2:"",
      fufang3:"",
      fufang4:"",
      prescriptionResult:{
      	main:{
      		quantity:20,
      		medicine:[{
      			name:"红花",
      			quantity:20
      		},{
      			name:"红花",
      			quantity:20
      		}]
      	},
      	subPrescription:[
      	{
      		quantity:20,
      		medicine:[
      			{
      				name:"红花",
      				quantity:20
      			}
      		]
      	},{

      	}

      	]
      }   
    }
  },
  computed:{
  	// changeWord(){

  	// }
  },
  created(){
  	let patientId=this.$route.params.patientId
  	let inquiryId=this.$route.params.inquiryId
  	this.patientId=patientId
  	this.inquiryId=inquiryId
    this.changeList()
    this.getMainRecipe()
    this.getContent()
  },
  methods:{
  	printMedicine(){
  		// axios.get("")
	  	const {href} = this.$router.resolve({
	        name: 'print',
	        params:{
	        	inquiryId:this.inquiryId,
	        	patientId:this.patientId
	        }
	      })
		    window.open(href, '_blank')
  	},
  	getContent(){
  		axios.get('/api/question/getInquiryAnswer',{
  			params:{
  				inquiryId:this.inquiryId
  			}
  		}).then((res)=>{
  			console.log(res)
  			this.problemDes=res.data.returnData.questionAnswer
  		})
  	},
  	changeWord(index){
  		if(index==0){
  			return "主方"
  		}
  		else{
  			return "附方"+index
  		}
  	},
  	getMainRecipe(){
      	axios.post('/api/recipe/addMainRecipe',{
      		inquiryId:this.inquiryId
      	}).then((res)=>{
      		this.getRecipe()
      	})
  	},
  	changeObj(obj){

  	},
    getRecipe(){
      axios.get("/api/recipe/getRecipe",{
        params:{
          inquiryId:this.inquiryId
        }
      }).then((res)=>{
      	let recipe=res.data.returnData.recipleList[0]
      	this.mainRecipeId=recipe.mainRecipeId
      	recipe.recipeList.forEach((item,index)=>{
      		item.mainRecipeId=this.mainRecipeId
      	})
      	this.recipeAmount=recipe.recipeList
        console.log("recipe",res.data.returnData)

        if(this.recipeAmount==0){
            console.log("recipe",recipe)
            recipe.recipeList.forEach((item,index)=>{
              if(item.recipeDetailList.length==0){
                for(let i=0;i<20;i++){
                  item.recipeDetailList.push({
                    dose:"",
                    medicine:"",
                    recipeId:item.recipeId
                  })
                }
              }
              else{
                let len=20-item.recipeDetailList.length
                item.recipeDetailList.forEach((item2,index2)=>{
                  item2.recipeId=item.recipeId
                })

                for(let i=0;i<len;i++){
                  item.recipeDetailList.push({
                    dose:"",
                    medicine:"",
                    recipeId:item.recipeId
                  })
                }

              }
            })

            this.recipe=recipe
            console.log("this.recipe",this.recipe)          
        }
        else{
            let recipe=res.data.returnData.recipleList[0]
            let len=res.data.returnData.recipleList.length

            recipe.recipeList.forEach((item,index)=>{
              // item.recipeDetailList=new Array(20)
              if(item.recipeDetailList.length==0){
                for(let i=0;i<20;i++){
                  item.recipeDetailList.push({
                    dose:"",
                    medicine:"",
                    recipeId:item.recipeId
                  })
                }
              }
              else{
                let len=20-item.recipeDetailList.length
                item.recipeDetailList.forEach((item2,index2)=>{
                  item2.recipeId=item.recipeId
                })

                for(let i=0;i<len;i++){
                  item.recipeDetailList.push({
                    dose:"",
                    medicine:"",
                    recipeId:item.recipeId
                  })
                }

              }
            })
            this.recipe=res.data.returnData.recipleList[0]
          }


      	// axios.get('/api/recipe/getLatestRecipe',{
      	// 	params:{
      	// 		patientId:this.patientId
      	// 	}
      	// }).then((res2)=>{
      	// 	console.log("最新",res2.data.returnData.recipleList)
      	// 	let len=res2.data.returnData.recipleList.length
      	// 	if(len==0){
      	// 		console.log("recipe",recipe)
      	// 		recipe.recipeList.forEach((item,index)=>{
      	// 			if(item.recipeDetailList.length==0){
	      // 				for(let i=0;i<20;i++){
	      // 					item.recipeDetailList.push({
	      // 						dose:"",
	      // 						medicine:"",
	      // 						recipeId:item.recipeId
	      // 					})
	      // 				}
      	// 			}
      	// 			else{
      	// 				let len=20-item.recipeDetailList.length
      	// 				item.recipeDetailList.forEach((item2,index2)=>{
      	// 					item2.recipeId=item.recipeId
      	// 				})

	      // 				for(let i=0;i<len;i++){
	      // 					item.recipeDetailList.push({
	      // 						dose:"",
	      // 						medicine:"",
	      // 						recipeId:item.recipeId
	      // 					})
	      // 				}

      	// 			}
      	// 		})

      	// 		this.recipe=recipe
      	// 		console.log("this.recipe",this.recipe)
      	// 	}
      	// 	else{
      	// 		let recipe2=res2.data.returnData.recipleList[0]
				   //  let len=res2.data.returnData.recipleList.length

      	// 		recipe2.recipeList.forEach((item,index)=>{
      	// 			// item.recipeDetailList=new Array(20)
      	// 			if(item.recipeDetailList.length==0){
	      // 				for(let i=0;i<20;i++){
	      // 					item.recipeDetailList.push({
	      // 						dose:"",
	      // 						medicine:"",
	      // 						recipeId:item.recipeId
	      // 					})
	      // 				}
      	// 			}
      	// 			else{
      	// 				let len=20-item.recipeDetailList.length
      	// 				item.recipeDetailList.forEach((item2,index2)=>{
      	// 					item2.recipeId=item.recipeId
      	// 				})

	      // 				for(let i=0;i<len;i++){
	      // 					item.recipeDetailList.push({
	      // 						dose:"",
	      // 						medicine:"",
	      // 						recipeId:item.recipeId
	      // 					})
	      // 				}

      	// 			}
      	// 		})
      	// 		this.recipe=res2.data.returnData.recipleList[0]
      	// 	}

      	// })



      })
    },
  	changeList(){
  	},
  	ConvertObj(name,quantity){
  		this.name=name
  		this.quantity=quantity
  		let obj=[]
  		this.name.forEach((item,index)=>{
  			obj.push({
  				name:item,
  				quantity:this.quantity[index]
  			})  			
  		})
  		return obj
  	},
  	addPrescription(){
  		let params={
  			recieDetailList:[]
  		}
  		let medicine=this.recipe.recipeList
  		let recieDetailList=[]
  		medicine.forEach((item,index)=>{
  			recieDetailList=recieDetailList.concat(item.recipeDetailList)
  		})
  		console.log(recieDetailList)
  		let newArr=[]
  		recieDetailList.forEach((item,index)=>{
  			if(item.medicine){
  				newArr.push(item)
  			}
  		})
  		params.recieDetailList=newArr
  		axios.post('api/recipe/addRecipeDetail',params).then((res)=>{
  			// console.log(res)
  			if(res.data.returnMsg=="请求成功"){
  				axios.post("/api/recipe/addRecipe",{
  					recipeList:this.recipeAmount
  				}).then((res3)=>{

  					axios.get("/api/dailyPatient/updateStatus",{
  						params:{
  							inquiryId:this.inquiryId
  						}
  					}).then((res4)=>{
  						axios.get("/api/inquiryResult/putInquiryResult",{
  							params:{
  								inquiryId:this.inquiryId
  							}
  						}).then((res5)=>{
  							console.log("res5",res5)
  							// this.$router.push({name:"record"})
                this.btnDisable=false
  						})
  					})

  				})
  			}

  			else{
  				alert("网络原因，请求失败")
  			}
  		})
  	},
    completePrescription(){
      this.$router.push({name:"record"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
	.pre-container{
		padding:50px;
		display: flex;
		.pre-left{
			flex:0 1 580px;
			border:1px solid #C0CCDA;
			padding:10px;
		}
		.pre-right{
			flex:1;
			padding-left:20px;

			.pre-btn-wrapper{
				margin-top:20px;
			}


			.pre-right-main{
				.pre-item{
					display: inline-block;
					width:540px;
				}
				.pre-item:nth-child(1){
					display: block;
					width:1200px;
					.pre-title{
						width:1011px;
					}
				}
				.pre-sub-fufang{
					margin:10px;
				}

				// display: inline-block;
				.pre-title{
					background: #E5E9F2;
					padding:2px;
					// width:1011px;
					width:504px;
				}

				.sub-width{
					width:45%;
					display: inline-block;
					margin-top:20px;
					.pre-title{
						width:504px;
					}


					.pre-input-medicine{
						width:100px;
					}
				}
				.pre-btn-wrapper{
					text-align: center;
				}
			}
			.pre-input{
				display: inline-block;
				margin-right:-1px;
				margin-top:-1px;

				input.el-input__inner{
					border-radius: 0!important;

				}
			}
			.pre-input-name{
				width:180px;
				padding-right:0;
				border-right:none;
				margin-right: -10px;

			}
			.pre-input-quantity{
				width:80px;
				background: #F9FAFC;
				input.el-input__inner{
					background: #F9FAFC;
				}
			}

		}
		.pre-sub-fufang .el-input{
			max-width:100px;
			margin:0 20px;
		}

		.pre-left-p{
			padding:20px 10px;
		}

		.one-des{
			display: inline-block;
			padding:2px 4px;
		}
	}
</style>
