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
      sleepmax:"1",
      chuchao:"1",
      zhouqi:"1",
      shichang:"1",
      mocijs:"1",
      mociks:"1",
      sleepmax:"2",
      resChoice:{},
      dabiancx:""

    }
  },
  created(){
  	let patientId=this.$route.params.patientId
  	let inquiryId=this.$route.params.inquiryId
  	this.patientId=patientId
  	this.inquiryId=inquiryId
  	this.getChioceQuestion()
  	this.getCompletion()
  	// this.getAnswer()
  },
  methods:{
  	timeChange(val){
		console.log(val)
	},
  	getChioceQuestion(){
  		axios.get('/api/question/getInquiryChoice',{
  			params:{
  				 inquiryId:this.inquiryId
  			}
  		}).then((res)=>{
  			console.log("res",res.data)
  			let choice=res.data.returnData.choiceHistory

  			this.resChoice=choice

  			choice.forEach((item,index)=>{
	      		item.choiceQuestionList.forEach((item2,index2)=>{
	      			
	      			if(item2.historyChoiceList.length==0){
	      				item2.historyChoiceList={}
	      			}
	      			else{
	      				item2.historyChoiceList=item2.historyChoiceList[0]
	      			}
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
  		axios.get("/api/question/getInquiryCompletion",{
  			params:{
  				inquiryId:this.inquiryId
  			}
  		}).then((res)=>{
  			console.log("填空题",res.data.returnData.completionHistory)
  			this.completion=JSON.parse(JSON.stringify(res.data.returnData.completionHistory))

  			this.completion.forEach((item,index)=>{
  				item.completionList.forEach((item2,index2)=>{
  					if(!item2.historyCompletion){
  						item2.historyCompletion=new Object()
  						item2.historyCompletion.answer=""
  					}
  				})
  			})
			let completionAnswer=this.completion
			console.log("completionAnswer",completionAnswer)
			this.answer.zyzz=completionAnswer[5].completionList[0].historyCompletion.answer
			this.answer.zyzd=completionAnswer[5].completionList[1].historyCompletion.answer
			this.dabianPl=completionAnswer[2].completionList[0].historyCompletion.answer
			this.dabianQw=completionAnswer[2].completionList[1].historyCompletion.answer
			this.sleepQycs=completionAnswer[1].completionList[0].historyCompletion.answer
			this.sleepmax=completionAnswer[1].completionList[1].historyCompletion.answer
			this.dabiancx=completionAnswer[2].completionList[2].historyCompletion.answer

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

  		axios.post("/api/question/addHistory",{
  			inquiryId:this.inquiryId,
  			choiceHistory:choiceAnswer,
  			completionHistory:completionAnswer,
  			action:1
  		}).then(res=>{
  			console.log("res",res)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
