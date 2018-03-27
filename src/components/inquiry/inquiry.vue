<template>
   	<div class='inquiry-container'>
   		<el-form label-width="180px" :model="answer" ref="form" label-position='left'>
			<div class="illness-wrapper">
				<p>病情描述</p>
				<el-form-item label=''  class='inquiry-des-input'>
	  				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 20}" placeholder="请输入内容"  v-model='answer.zyzz'></el-input>
	  			</el-form-item>
				<p>诊断与主诉</p>
				<el-form-item label=''  class='inquiry-des-input'>
	  				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 20}" placeholder="请输入内容"  v-model='answer.zyzd'></el-input>
	  			</el-form-item>
			</div>

			<div class="eat-wrapper  question-list-wrapper" >
				<div class="question-wapper" v-for='item in eatQuestion.choiceQuestionList'>
					<el-form-item :label='item.stem'>
						<el-select   v-model='item.historyChoiceList.choseId'>
					        <el-option v-for='choice in item.historyOptionList' :key='choice.choiceId' :label='choice.description' :value='choice.choiceId'></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder='备注' v-model='item.historyChoiceList.remark'></el-input>
					</el-form-item>					
				</div>
			</div>

			<div class="sleep-wrapper question-list-wrapper" >
				<div class="question-wapper" v-for='item in sleepQuestion.choiceQuestionList'>
					<el-form-item :label='item.stem'>
						<el-select   v-model='item.historyChoiceList.choseId'>
					        <el-option v-for='choice in item.historyOptionList' :key='choice.choiceId' :label='choice.description' :value='choice.choiceId'></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder='备注' v-model='item.historyChoiceList.remark'></el-input>
					</el-form-item>					
				</div>

			  	<el-form-item label='起夜次数' class='dabian-completion'>
				    <el-input v-model='sleepQycs' class='completion-input small-input'></el-input>
				    <span>--</span>
				    <el-input v-model='sleepmax' class='completion-input small-input'></el-input>
				</el-form-item>
			</div>

			<div class="dabian-wrapper question-list-wrapper" >
				<div class="dabian-completion  completion-wrapper">
					<el-form-item label='大便频率'  class='dabian-completion-wrapper'>
				    	<el-input v-model='dabianPl'  class='completion-input small-input'></el-input>
				    	<span>日</span>
						<el-input v-model='dabiancx'  class='completion-input small-input'></el-input>
						<span>次</span>
					</el-form-item>
					<el-form-item label='大便气味'  class='dabian-completion-wrapper'>
				    	<el-input v-model='dabianQw'   class='completion-input'></el-input>
					</el-form-item>
				</div>
				<div class="question-wapper" v-for='item in dabianQuestion.choiceQuestionList'>
					<el-form-item :label='item.stem'>
						<el-select   v-model='item.historyChoiceList.choseId'>
					        <el-option v-for='choice in item.historyOptionList' :key='choice.choiceId' :label='choice.description' :value='choice.choiceId'></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder='备注' v-model='item.historyChoiceList.remark'></el-input>
					</el-form-item>					
				</div>
			</div>

			<div class="xiaobian-wrapper question-list-wrapper" >
				<div class="question-wapper" v-for='item in xiaobianQuestion.choiceQuestionList'>
					<el-form-item :label='item.stem'>
						<el-select   v-model='item.historyChoiceList.choseId'>
					        <el-option v-for='choice in item.historyOptionList' :key='choice.choiceId' :label='choice.description' :value='choice.choiceId'></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder='备注' v-model='item.historyChoiceList.remark'></el-input>
					</el-form-item>					
				</div>
			</div>

			<div class="yuejing-wrapper question-list-wrapper" >
				<div class="question-wapper" v-for='item in yuejingQuestion.choiceQuestionList'>
					<el-form-item :label='item.stem'>
						<el-select   v-model='item.historyChoiceList.choseId'>
					        <el-option v-for='choice in item.historyOptionList' :key='choice.choiceId' :label='choice.description' :value='choice.choiceId'></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder='备注' v-model='item.historyChoiceList.remark'></el-input>
					</el-form-item>					
				</div>
			</div>
		</el-form>
		<div class="diagnosis-bottom-btn" ><el-button type='primary' @click='saveAnswer'>提交</el-button></div>
	</div>
</template>

<script>
import '../../../static/css/common.css'
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      answer:{
      	zyzz:"",
      	zyzd:""
      },
      eatQuestion:{},
      sleepQuestion:{},
      choiceAll:{},
      dabianQuestion:{},
      xiaobianQuestion:{},
      yuejingQuestion:{},
      completion:{},
      sleepQycs:"1", 
      dabianPl:"1",
      dabianQw:"无",
      dabiancx:"1",
      chuchao:"1",
      zhouqi:"1",
      shichang:"1",
      mocijs:"1",
      mociks:"1",
      sleepmax:"2",
      defaultAnswer:{
	    "1":170,
	    "2":172,
	    "3":173,
	    "4":196,
	    "5":174,
	    "6":175,
	    "7":176,
	    "8":177,
	    "9":178,
	    "10":214,
	    "11":180,
	    "13":182,
	    "14":183,
	    "15":197,
	    "16":184,
	    "17":185,
	    "18":186,
	    "19":97,
	    "20":99,
	    "21":101,
	    "22":103,
	    "23":187,
	    "24":188,
	    "25":189,
	    "26":190,
	    "27":191,
	    "28":192,
	    "29":137,
	    "30":193,
	    "31":194,
	    "32":147,
	    "33":195,
	    "34":155,
	    "35":159,
	    "36":161,
	    "37":163
		}

    }
  },
  created(){
  	let patientId=this.$route.params.patientId
  	let inquiryId=this.$route.params.inquiryId
  	this.patientId=patientId
  	this.inquiryId=inquiryId
  	this.getChioceQuestion()
  	this.getCompletion()
  	this.getDefaultAnswer()
  },

  beforeRouteLeave(to,from,next){
  		console.log("to",to)
  		console.log("from",from)
  		if(to.name=='prescription'&&from.name=='inquiry'){
  			console.log("跳转prescription页面")
  			next()
  		}
  		else{
  			if(window.confirm("页面信息未保存，确认离开？")){
  				next()
  			}
  			
  		}
  },
  methods:{
  	getDefaultAnswer(){

  	},
  	timeChange(val){
		console.log(val)
	},
  	getChioceQuestion(){
  		axios.get('/api/question/getChoiceHistory',{
  			params:{
  				 patientId:this.patientId
  			}
  		}).then((res)=>{
  			console.log("选择题结果",res)
  			let choice=res.data.returnData.choiceHistory

  			choice.forEach((item,index)=>{
	      		item.choiceQuestionList.forEach((item2,index2)=>{
	      			// item2.historyChoiceList={}
		      			let id=item2.questionId+""
		      			if(this.defaultAnswer[id]){
		      				item2.historyChoiceList={
		      					choseId:this.defaultAnswer[id]
		      				}
		      			}
		      			else{
		      				item2.historyChoiceList={}
		      			}

	      			

	      			console.log('historyChoiceList',item2.historyChoiceList.length)
	      			// if item2.historyChoiceList.choseId
	      			// if(item2.historyChoiceList.length>0){
	      			// 	console.log("不变")
	      			// 	let xxx=item2.historyChoiceList[0].choseId
	      			// 	item2.historyChoiceList={
	      			// 		choseId:xxx
	      			// 	}
	      			// }
	      			// else{
		      		// 	let id=item2.questionId+""
		      		// 	if(this.defaultAnswer[id]){
		      		// 		item2.historyChoiceList={
		      		// 			choseId:this.defaultAnswer[id]
		      		// 		}
		      		// 	}
		      		// 	else{
		      		// 		item2.historyChoiceList={}
		      		// 	}	      				
	      			// }



	      		})
	      	})

  			console.log("choice",choice)

  			this.eatQuestion=choice[0]
  			this.sleepQuestion=choice[1]
  			this.dabianQuestion=choice[2]
  			this.xiaobianQuestion=choice[3]
  			this.yuejingQuestion=choice[4]

  		})
  	},

  	getCompletion(){
  		axios.get("/api/question/getCompletionHistory",{
  			params:{
  				patientId:this.patientId
  			}
  		}).then((res)=>{
  			console.log("填空题",res.data.returnData)
  			this.completion=res.data.returnData.completionHistory
			
  			this.completion.forEach((item,index)=>{
  				item.completionList.forEach((item2,index2)=>{
  					if(item2.hasOwnProperty('historyCompletion')){
  						console.log("have")
  						// item2.historyCompletion=new Object()
  						// item2.historyCompletion.answer=""
  					}
  					else{
  						item2.historyCompletion=new Object()
  						item2.historyCompletion.answer=""  						
  					}
  				})
  			})
  			console.log("completion",this.completion)
			let completionAnswer=this.completion
			this.answer.zyzz=completionAnswer[5].completionList[0].historyCompletion.answer
			this.answer.zyzd=completionAnswer[5].completionList[1].historyCompletion.answer
			this.dabianPl=completionAnswer[2].completionList[0].historyCompletion.answer||1
			this.dabianQw=completionAnswer[2].completionList[1].historyCompletion.answer||"无"
			this.sleepQycs=completionAnswer[1].completionList[0].historyCompletion.answer||1
			this.sleepmax=completionAnswer[1].completionList[1].historyCompletion.answer||2
			this.dabiancx=completionAnswer[2].completionList[2].historyCompletion.answer||1

  		})  		
  	},
  	saveAnswer(){
  		// 
  		let choiceAnswer=[]
  		choiceAnswer.push(this.eatQuestion,this.sleepQuestion,this.dabianQuestion,this.xiaobianQuestion,this.yuejingQuestion)
  		let completionAnswer=this.completion
  		completionAnswer[1].completionList[0].historyCompletion.answer=this.sleepQycs
  		completionAnswer[1].completionList[1].historyCompletion.answer=this.sleepmax
  		completionAnswer[2].completionList[0].historyCompletion.answer=this.dabianPl
  		completionAnswer[2].completionList[2].historyCompletion.answer=this.dabiancx
		completionAnswer[2].completionList[1].historyCompletion.answer=this.dabianQw
		// completionAnswer[4].completionList[0].historyCompletion.answer=this.chuchao
		// completionAnswer[4].completionList[1].historyCompletion.answer=this.zhouqi
		// completionAnswer[4].completionList[2].historyCompletion.answer=this.shichang
		// completionAnswer[4].completionList[3].historyCompletion.answer=this.mociks
		// completionAnswer[4].completionList[4].historyCompletion.answer=this.mocijs

		// completionAnswer[5].completionList[0].historyCompletion.answer=this.answer.illnessDes
		// completionAnswer[5].completionList[1].historyCompletion.answer=this.answer.jszt
		// completionAnswer[5].completionList[2].historyCompletion.answer=this.answer.gjzs
		// completionAnswer[5].completionList[3].historyCompletion.answer=this.answer.jzdd
		// completionAnswer[5].completionList[4].historyCompletion.answer=this.answer.tqzk
		completionAnswer[5].completionList[0].historyCompletion.answer=this.answer.zyzz
		completionAnswer[5].completionList[1].historyCompletion.answer=this.answer.zyzd

		console.log("completionAnswer",completionAnswer)

  		axios.post("/api/question/addHistory",{
  			inquiryId:this.inquiryId,
  			choiceHistory:choiceAnswer,
  			completionHistory:completionAnswer,
  			action:0
  		}).then(res=>{
  			console.log("addresResult",res.data)
  			this.$router.push({
  				name:"prescription",
	  			params:{
	  				patientId:this.patientId,
	  				inquiryId:this.inquiryId
	  			}
  			})
  		})
  	}
  }
}
</script>

<style  lang='less'>
	.inquiry-container{
		padding:50px 40px;
		.illness-wrapper{
			border-bottom:1px solid #E0E6ED ;
			p{
				font-size: 30px;
			}
			.inquiry-des-input{
				margin-left:-180px;
				margin-top:30px;
			}
		}

		.question-wapper{
			display: inline-block;
			// padding-right:40px;
			padding-top:10px;
			.el-select{
				min-width: 280px;

			}
		}

		.question-list-wrapper{
			border-bottom: 1px solid #E0E6ED ;
		}


		.question-wapper{
			margin-left:20px;
			.el-input{
				input{
					color:#20A0FF ;
					font-weight: 600;
				}
			}
		}

		.completion-input{
			width:280px;
			// margin-left: 20px;
		}
		.dabian-completion-wrapper{
			padding-top:40px;
			padding-right:40px;
		}
		.dabian-completion-wrapper{
			display: inline-block;
		}

		.dabian-completion{
			margin-left:20px;
		}
		.diagnosis-bottom-btn{
			text-align: center;
			margin-top:40px;
		}


	}

.completion-input.small-input{
	width:110px!important;
}

</style>
