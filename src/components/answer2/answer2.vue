<template>
  <div class='answer-container'>
  	<p class='answer-time'><span>日期:&nbsp;</span><span>2017/06/47</span><span>19:30</span></p>
  	<el-form label-width="100px" :model="answer" ref="form">
  		<el-form-item label='病情描述'>
  			<el-input type="textarea" :autosize="{ minRows: 6, maxRows: 20}" placeholder="请输入内容"  v-model='completion[5].completionList[0].historyCompletion.answer'></el-input>
  		</el-form-item>
  		<el-form-item label='关键知识' v-model='completion[5].completionList[2].historyCompletion.answer'>
  			<el-input  placeholder="请输入内容" ></el-input>
  		</el-form-item>

  		<el-form-item label='精神状况'>
  			<el-input  placeholder="请输入内容" v-model='completion[5].completionList[1].historyCompletion.answer' ></el-input>
  		</el-form-item>

  		<el-form-item label='居住地点'>
  			<el-input  placeholder="请输入内容" v-model='completion[5].completionList[3].historyCompletion.answer' ></el-input>
  		</el-form-item>

  		<el-form-item label='天气状况'>
  			<el-input  placeholder="请输入内容" v-model='completion[5].completionList[4].historyCompletion.answer' ></el-input>
  		</el-form-item>


  		<div class="answer-content">
  			<p class='answer-content-word'>一、纳</p>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='饭量'>
              <!-- list[0].choiceQuestionList[0].historyChoiceList.choseId -->
		  				<el-select  placeholder="请选择饭量" v-model='list[0].choiceQuestionList[0].historyChoiceList.choseId'>
					        <el-option v-for='item in list[0].choiceQuestionList[0].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='纳后腹痛情况'>
		  				<el-select  placeholder="请选择" v-model='list[0].choiceQuestionList[4].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[0].choiceQuestionList[4].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[0].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[4].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='食欲'>
		  				<el-select  placeholder="请选择" v-model='list[0].choiceQuestionList[1].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[0].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
<!--   					<el-form-item label='饮食情况'>
					    <el-checkbox-group  v-model='list[0].choiceQuestionList[7].historyChoiceList.choiceId'>
						    <el-checkbox v-for='item in list[0].choiceQuestionList[7].historyOptionList' :key='item.choiceId' :label="item.description" :name="item.description"></el-checkbox>q
					    </el-checkbox-group>
  					</el-form-item> -->
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<!-- 食欲备注 -->
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[1].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
<!--   				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[7].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col> -->
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='饥饿感'>
		  				<el-select  placeholder="饥饿感" v-model='list[0].choiceQuestionList[2].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[0].choiceQuestionList[2].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='消化情况'>
		  				<el-select  placeholder="请选择" v-model='list[0].choiceQuestionList[6].historyChoiceList.choseId'>
							<el-option v-for='item in list[0].choiceQuestionList[6].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[2].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[0].choiceQuestionList[6].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
	  		<el-form-item label='纳后腹胀情况'>
				<el-select  placeholder="请选择" v-model='list[0].choiceQuestionList[3].historyChoiceList.choseId'>
					<el-option v-for='item in list[0].choiceQuestionList[3].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
		    	</el-select>
			</el-form-item>
			<el-form-item >
				<el-input placeholder='备注' v-model='list[0].choiceQuestionList[3].historyChoiceList.remark'></el-input>
			</el-form-item>
  		</div>

  		<div class="answer-content">
  			<p class='answer-content-word'>二、眠</p>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='入睡快慢'>
		  				<el-select  placeholder="请选择" v-model='list[1].choiceQuestionList[0].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[1].choiceQuestionList[0].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='起夜次数'>
						<el-input v-model='completion[1].completionList[0].historyCompletion.answer'></el-input>
						<span>次</span>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<!-- list[1].choiceQuestionList[0].historyChoiceList.remark -->
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[1].choiceQuestionList[0].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='午睡否'>
	  					<el-radio-group v-model='list[1].choiceQuestionList[5].historyChoiceList.choiceId'>
					        <el-radio label="73">是</el-radio>
					        <el-radio label="74">否</el-radio>
					    </el-radio-group>
  					</el-form-item>
  				</el-col>

  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='睡眠时长'>
		  				<el-select  placeholder="请选择" v-model='list[1].choiceQuestionList[2].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[1].choiceQuestionList[2].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='做梦频率'>
		  				<el-select  placeholder="请选择" v-model='list[1].choiceQuestionList[3].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[1].choiceQuestionList[3].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[1].choiceQuestionList[2].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[1].choiceQuestionList[3].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item   label='睡眠质量' >
		  				<el-select  placeholder="请选择" v-model='list[1].choiceQuestionList[1].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[1].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='噩梦否'>
		  				<el-select  placeholder="请选择" v-model='list[1].choiceQuestionList[4].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[1].choiceQuestionList[4].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[1].choiceQuestionList[1].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[1].choiceQuestionList[4].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  		</div>

  		<div class="answer-content">
  			<p class='answer-content-word'>三、大便</p>
  			<el-row>
  				<el-col :span='12'>
					<el-form-item label='大便频率'>
						<el-input v-model='completion[2].completionList[0].historyCompletion.answer'></el-input>
						<span class='answer-day-margin'>日</span>
						<!-- <el-input v-model='completion[2].completionList[1].historyCompletion.answer'></el-input> -->
					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='黏连否'>
		  				<el-select  placeholder="请选择" v-model='list[2].choiceQuestionList[3].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[3].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>

					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'  :offset="12">
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[3].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>

  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='大便外观'>
					    <el-checkbox-group v-model="answer">
					        <el-checkbox label="这是内容" name="type"></el-checkbox>
					        <el-checkbox label="这是内容" name="type"></el-checkbox>
					        <el-checkbox label="这是内容" name="type"></el-checkbox>
					        <!-- <el-checkbox label="这是内容" name="type"></el-checkbox> -->
					    </el-checkbox-group>
					  </el-form-item>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='便血否'>
		  				<el-select  placeholder="请选择" v-model='list[2].choiceQuestionList[4].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[4].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[0].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[4].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='颜色'>
		  				<el-select  placeholder="请选择" v-model='list[2].choiceQuestionList[2].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[2].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='是否使用开塞露'>
		  				<el-select  placeholder="请选择" v-model='list[2].choiceQuestionList[5].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[5].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[2].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[5].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>

  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label='顺畅否'>
		  				<el-select  placeholder="顺畅否" v-model='list[2].choiceQuestionList[1].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='造瘘否'>
		  				<el-select  placeholder="请选择" v-model='list[2].choiceQuestionList[6].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[2].choiceQuestionList[6].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>

  			</el-row>


  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[1].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[2].choiceQuestionList[6].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12' >
  					<el-form-item label='气味'>
						<el-input placeholder=''></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  		</div>

  		<div class="answer-content">
  			<p class='answer-content-word'>四、小便</p>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='颜色'>
		  				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[0].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[3].choiceQuestionList[0].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='尿等待'>
		  				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[4].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[3].choiceQuestionList[4].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注'  v-model='list[3].choiceQuestionList[0].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注'  v-model='list[3].choiceQuestionList[4].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='尿量'>
		  				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[1].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[3].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='尿频'>
		  				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[5].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[3].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[3].choiceQuestionList[1].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[3].choiceQuestionList[5].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='力度强度'>
		  				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[2].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[3].choiceQuestionList[2].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='使用利尿剂'>
	  					<el-radio-group v-model='list[3].choiceQuestionList[6].historyChoiceList.choseId'>
					        <el-radio label="135">现用</el-radio>
					        <el-radio label="136">曾用</el-radio>
					        <el-radio label="137">否</el-radio>
					    </el-radio-group>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[3].choiceQuestionList[2].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
	  		<el-form-item label='尿不尽'>
				<el-select  placeholder="请选择" v-model='list[3].choiceQuestionList[3].historyChoiceList.choseId'>
					<el-option v-for='item in list[3].choiceQuestionList[3].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
		    	</el-select>
			</el-form-item>
			<el-form-item >
				<el-input placeholder='备注'></el-input>
			</el-form-item>
  		</div>

  		<div class="answer-content">
  			<p class='answer-content-word'>五、月经</p>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='初潮'>
  						<!-- completion[4].completionList[0].historyCompletion.answer -->
  						<el-date-picker v-model='chuchao' @change='timeChange'  value-format="yyyy-MM-dd" type="date"   placeholder="输入日期"></el-date-picker>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='腰部不适'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[3].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[3].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row >
  				<el-col :span='12'>
  					<el-form-item  label='周期'>
						<el-input placeholder='' v-model='completion[4].completionList[1].historyCompletion.answer'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item >
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[3].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='时长'>
  						<el-input placeholder='' v-model='completion[4].completionList[2].historyCompletion.answer'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='腹部不适'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[4].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[4].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>
  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<!-- v-model='completion[4].completionList[3].historyCompletion.answer' -->
  					<el-form-item label='末次月经' >
  						<el-date-picker  v-model='moci' value-format="yyyy-MM-dd" type="date"   placeholder="输入日期"></el-date-picker>
  					</el-form-item>
  				</el-col>

  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[4].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>


  			</el-row>
  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='痛经否'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[0].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[0].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='绝经否'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[6].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[6].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  			</el-row>

  			<el-row class='answer-remark-group'>
  				<el-col :span='12'>
  					<el-form-item label=''>
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[0].historyChoiceList.remark'></el-input>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='倒经否'>
						<el-radio-group v-model="answer">
					        <el-radio label="162">是</el-radio>
					        <el-radio label="163">否</el-radio>
					    </el-radio-group>  						
  					</el-form-item>

  				</el-col>
  			</el-row>

  			<el-row>
  				<el-col :span='12'>
  					<el-form-item label='周期规律'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[1].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[1].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='绝经年龄'>
  						<el-input></el-input>
  					</el-form-item>
  				</el-col>

  			</el-row>

  			<el-row>
  				<el-col :span='12'>
					<el-form-item>
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[1].historyChoiceList.remark'></el-input>
					</el-form-item>
  				</el-col>
   				<el-col :span='12'>
  					<el-form-item label='绝经原因'>
  						<el-input></el-input>
  					</el-form-item>
  				</el-col> 					

  			</el-row>


  			<el-row>
  				<el-col :span='12'>
		 	  		<el-form-item label='乳房不适'>
						<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[2].historyChoiceList.choseId'>
							<el-option v-for='item in list[4].choiceQuestionList[2].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
				    	</el-select>
					</el-form-item>
  				</el-col>
  				<el-col :span='12'>
  					<el-form-item label='腹头部不适'>
		  				<el-select  placeholder="请选择" v-model='list[4].choiceQuestionList[5].historyChoiceList.choseId'>
		  					<el-option v-for='item in list[4].choiceQuestionList[5].historyOptionList' :key='item.choiceId' :label='item.description' :value='item.choiceId'></el-option>
					    </el-select>
  					</el-form-item>
  				</el-col>				
  			</el-row>



  			<el-row>
  				<el-col :span='12'>
					<el-form-item>
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[2].historyChoiceList.remark'></el-input>
					</el-form-item>
  				</el-col>
   				<el-col :span='12'>
					<el-form-item>
						<el-input placeholder='备注' v-model='list[4].choiceQuestionList[5].historyChoiceList.remark'></el-input>
					</el-form-item>
  				</el-col> 					

  			</el-row>
 


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
      msg: '',
      option:'',
      answer:{},
      value1:'',
      patientId:"",
      inquiryId:'',
      list:[
      	{
      		choiceQuestionList:[
      		{
      			historyChoiceList:{},
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},      		

			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{
      				// choiceId:[49,50]
      			}
      		},
			{
      			historyChoiceList:{
      				choiceId:[]
      			}
      		},      		
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		}

      		]
      	},
      	{
      		choiceQuestionList:[
      		{
      			historyChoiceList:{
      				choiceId:1
      			},
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},      		

			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{
      				// choiceId:[49,50]
      			}
      		},
			{
      			historyChoiceList:{
      				choiceId:[]
      			}
      		},      		
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		}

      		]
      	},
      	{
      		choiceQuestionList:[
      		{
      			historyChoiceList:{
      				choiceId:1
      			},
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},      		

			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{
      				// choiceId:[49,50]
      			}
      		},
			{
      			historyChoiceList:{
      				choiceId:[]
      			}
      		},      		
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		}

      		]
      	},
      	{
      		choiceQuestionList:[
      		{
      			historyChoiceList:{
      				choiceId:1
      			},
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},      		

			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{
      				// choiceId:[49,50]
      			}
      		},
			{
      			historyChoiceList:{
      				choiceId:[]
      			}
      		},      		
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		}

      		]
      	},
      	{
      		choiceQuestionList:[
      		{
      			historyChoiceList:{
      				choiceId:1
      			},
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		},      		

			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{
      				// choiceId:[49,50]
      			}
      		},
			{
      			historyChoiceList:{
      				choiceId:[]
      			}
      		},      		
			{
      			historyChoiceList:{}
      		},
			{
      			historyChoiceList:{}
      		}

      		]
      	}  	
      ],
      test:"",
      completion:[{"questionTypeId":1,"questionType":"纳","completionList":[]},{"questionTypeId":2,"questionType":"眠","completionList":[{"questionId":1,"historyCompletion":{"completionId":9,"answer":"hoasdlaksdlaksl","inquiryId":18},"stem":"起夜次数"}]},{"questionTypeId":3,"questionType":"大便","completionList":[{"questionId":2,"stem":"大便频率","historyCompletion":{"answer":""}},{"questionId":3,"stem":"大便气味","historyCompletion":{"answer":""}}]},{"questionTypeId":4,"questionType":"小便","completionList":[]},{"questionTypeId":5,"questionType":"月经","completionList":[{"questionId":4,"stem":"初潮","historyCompletion":{"answer":""}},{"questionId":5,"stem":"周期","historyCompletion":{"answer":""}},{"questionId":6,"stem":"时长","historyCompletion":{"answer":""}},{"questionId":7,"stem":"末次开始时间","historyCompletion":{"answer":""}},{"questionId":8,"stem":"末次结束时间","historyCompletion":{"answer":""}}]},{"questionTypeId":6,"questionType":"基本","completionList":[{"questionId":9,"stem":"病情描述","historyCompletion":{"answer":""}},{"questionId":10,"stem":"精神状况","historyCompletion":{"answer":""}},{"questionId":11,"stem":"关键知识","historyCompletion":{"answer":""}},{"questionId":12,"stem":"居住地点","historyCompletion":{"answer":""}},{"questionId":13,"stem":"天气状况","historyCompletion":{"answer":""}}]}],
      completion1:"",  //  起夜次数
      completion2:"",  //  大便1
      completion3:"",	// 大便2
      completion4:"",  // 初潮
      completion5:"",  //  周期
      completion6:"",  //  时长
      completion7:"" , //  末次
      completion8:"" , //  病情描述
      completion9:""  ,//  关键知识
      completion10:""  ,//  精神状况
      completion11:""  ,// 居住点
      completion12:"",//天气状况,
      chuchao:"",
      moci:""
    }
  },
  methods:{
  		timeChange(val){
  			console.log(val)
  		},
	  	getQuestion(){
	      axios.get("/api/question/getInquiryChoice",{
	        params:{
            inquiryId:this.inquiryId,
	        }
	      }).then((res)=>{
	      	console.log("药房",res.data)
	      	this.list=res.data.returnData.choiceHistory
	      	// console.log("this.list",this.list)
	      	this.list.forEach((item,index)=>{
	      		item.choiceQuestionList.forEach((item2,index2)=>{
              
              if(item2.historyChoiceList.length>=1){
                
                item2.historyChoiceList=item2.historyChoiceList[0]
                // console.log("item",item2.historyChoiceList)
              }
              if(item2.historyChoiceList.length==0){
                item2.historyChoiceList=new Object()
              }
              // else{
              //   item2.historyChoiceList=item2.historyChoiceList[0]
              // }
              // console.log("item2",item2)
	      		})
	      	})



          // this.list
	      	console.log("changeList",this.list)

	      })

	  	},
	  	saveAnswer(){
	  		console.log(this.completion)

	  		let listCopy=JSON.parse(JSON.stringify(this.list))
	  		// console.log("答案",listCopy)
	  		console.log("答案2",this.list)
	  		
	  		this.completion[4].completionList[0].historyCompletion.answer=this.chuchao
	  		this.completion[4].completionList[3].historyCompletion.answer=this.moci
	  		console.log("填空题答案",this.completion)
	  		axios.post("/api/question/addHistory",{
	  			inquiryId:this.inquiryId,
	  			choiceHistory:listCopy,
	  			completionHistory:this.completion,
          action:1
	  		}).then((res)=>{
	  			console.log(res.data)

	  			console.log("this.inquiryId",this.inquiryId)
	  			axios.get("/api/inquiryResult/putInquiryResult",{
	  				params:{
	  					inquiryId:this.inquiryId*1
	  				}
	  			}).then((res2)=>{
	  				console.log(res2)

					this.$router.push({
	  					name:'record'
	  				})

	  			})
	  		})

	  	},
	  	getCompletion(){
	  		axios.get("/api/question/getInquiryCompletion",{
	  			params:{
            inquiryId:this.inquiryId
	  			}
	  		}).then((res)=>{
	  			
	  			this.completion=JSON.parse(JSON.stringify(res.data.returnData.completionHistory))
	  			// console.log("初潮",this.completion[4].completionList[0].historyCompletion.answer)

	  			this.completion.forEach((item,index)=>{
	  				item.completionList.forEach((item2,index2)=>{
	  					if(!item2.historyCompletion){
	  						item2.historyCompletion=new Object()
	  						item2.historyCompletion.answer=""
	  					}
	  				})
	  			})

	  			console.log("填空题",this.completion)
	  			this.chuchao=this.completion[4].completionList[0].historyCompletion.answer
	  			this.moci=this.completion[4].completionList[3].historyCompletion.answer


	  		})
	  	}
  },

  created(){
  	let patientId=this.$route.params.patientId
  	let inquiryId=this.$route.params.inquiryId
  	this.patientId=patientId
  	this.inquiryId=inquiryId

  	this.getQuestion()
  	this.getCompletion()

  	//  修改 
  	//  新增

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.answer-container{
	padding:40px;
}
.answer-time{
	color:#99A9BF;
	margin-bottom:40px;
	color:14px;
}

.answer-remark-group{
	margin-bottom:30px;
}
.answer-content-word{
	padding-bottom:10px;
	border-bottom:1px solid #E0E6ED;
	margin-bottom:20px;
}
.answer-min{
	width:80px;
}
.answer-day-margin{
	display: inline-block;
	padding:0 20px;
}
.diagnosis-bottom-btn{

	margin:0 auto;
	margin-top:50px;
	text-align: center;
}
</style>
