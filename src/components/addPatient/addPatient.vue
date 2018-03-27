<template>
  <div class='add-patient-container'>
  	<p class='addPatient-word'>添加当日病人  <span>/ &nbsp;&nbsp;基本信息</span></p>
  	<el-form ref="form" :model="info" label-width="180px" class='add-el-form'>
  		<el-row >
			<el-col :span="12" >
			  	<el-form-item label='患者编号'>
			  		<el-input class='patient-id' max='220px' v-model='basicInfo.patientId' ></el-input>
			  		<el-button type='primary' @click='addPid'>新增</el-button>
			  		<el-button type='primary' @click='modify'>确定</el-button>
			  	</el-form-item>
			    <el-form-item label="挂号类型">
			    	<el-radio-group v-model="basicInfo.inquiryType">
			      		<el-radio label="特殊" value='特殊'></el-radio>
			      		<el-radio label="普通" value='普通'></el-radio>
			    	</el-radio-group>
			    </el-form-item>
			  	<el-form-item label='证件类型'>
			  		<el-select v-model="basicInfo.certificatesType" placeholder="请选择证件类型">
				       	<el-option label="身份证" value="身份证"></el-option>
				       	<el-option label="护照" value="护照"></el-option>
				       	<el-option label="港澳通行证" value="港澳通行证"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item label='证件编号'>
			  		<el-input v-model='basicInfo.certificatesNumber'></el-input>
			  	</el-form-item>
			  	<el-form-item label='姓名'>
			  		<el-input v-model='basicInfo.name'></el-input>
			  	</el-form-item>

			    <el-form-item label="性别">
			    	<el-radio-group v-model="basicInfo.gender">
			      		<el-radio label="男" value='男'></el-radio>
			      		<el-radio label="女" value='女'></el-radio>
			    	</el-radio-group>
			    </el-form-item>
			    <el-form-item label='生日'>
			    	<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="basicInfo.birthday" style="width: 100%;"></el-date-picker>
			    </el-form-item>
			  	<el-form-item label='国籍'>
			  		<el-select v-model="basicInfo.nationality" placeholder="请选择国籍">
				      <el-option label="中国" value="中国"></el-option>
				      <el-option label="美国" value="美国"></el-option>
				      <el-option label="日本" value="日本"></el-option>
				      <el-option label="英国" value="英国"></el-option>
				      <el-option label="法国" value="法国"></el-option>
				      <el-option label="德国" value="德国"></el-option>
				      <el-option label="加拿大" value="加拿大"></el-option>
				      <el-option label="澳大利亚" value="澳大利亚"></el-option>
				      <el-option label="俄罗斯" value="俄罗斯"></el-option>
				      <el-option label="新西兰" value="新西兰"></el-option>
				      <el-option label="意大利" value="意大利"></el-option>
				      <el-option label="韩国" value="韩国"></el-option>
				      <el-option label="比利时" value="比利时"></el-option>
				      <el-option label="瑞士" value="瑞士"></el-option>
				      <el-option label="新加坡" value="新加坡"></el-option>
				      <el-option label="墨西哥" value="墨西哥"></el-option>
				      <el-option label="荷兰" value="荷兰"></el-option>
				      <el-option label="巴西" value="巴西"></el-option>
				      <el-option label="爱尔兰" value="爱尔兰"></el-option>
				      <el-option label="马来西亚" value="马拉西亚"></el-option>
				      <el-option label="丹麦" value="丹麦"></el-option>
				      <el-option label="其他" value="其他"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item label='民族'>
			  		<el-select v-model="basicInfo.national" placeholder="请选择民族">
				      <el-option label="汉" value="汉"></el-option>
				      <el-option label="藏" value="藏"></el-option>
				      <el-option label="回" value="回"></el-option>
				      <el-option label="壮" value="壮"></el-option>
				      <el-option label="少数民族" value="少数民族"></el-option>
				      <el-option label="国外民族" value="国外民族"></el-option>
				    </el-select>
			  	</el-form-item>

			  	<el-form-item label='出生地'>
			  		<el-cascader
					    :options="cityList"
					    v-model="basicInfo.incunabulum"
					    @change="handleChange">
					</el-cascader>
			  	</el-form-item>
			  	<el-form-item label='居住地'>
			  		<el-cascader
					    :options="cityList"
					    v-model="basicInfo.residence"
					    @change="handleChange">
					</el-cascader>
			  	</el-form-item>
		</el-col>

		  	<el-col :span="12" class='add-left'>
			  	<el-row class='add-h-w'>
			  		<el-col :span='12'>
			  			<el-form-item label='身高'  class='label-left'>
			  				<el-input v-model='basicInfo.height'>
			  					<template slot="append">CM</template>
			  				</el-input>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span='12'>
			  			<el-form-item label='体重'  class='label-left'>
			  				<el-input v-model='basicInfo.weight'>
			  					<template slot="append">KG</template>
			  				</el-input>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>
				<el-form-item label='职业'>
			  		<el-input v-model='basicInfo.occupation'></el-input>
			  	</el-form-item>
	  			<el-form-item label='婚姻史'>
			    	<el-radio-group v-model="basicInfo.marriage">
			      		<el-radio label="已婚" value='已婚'></el-radio>
			      		<el-radio label="未婚" value='未婚'></el-radio>
			      		<el-radio label="离异" value='离异'></el-radio>
			    	</el-radio-group>
	  			</el-form-item>

			  	<el-form-item label='宗教信仰'>
			  		<el-select v-model="basicInfo.belief" placeholder="请选择宗教">
			  		  <el-option label="无" value="无"></el-option>
				      <el-option label="佛教" value="佛教"></el-option>
				      <el-option label="道教" value="道教"></el-option>
				      <el-option label="基督教" value="基督教"></el-option>
				      <el-option label="其他宗教" value="其他宗教"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item label="饮食习惯">
				    <el-checkbox-group v-model="basicInfo.eatingHabits">
						<!-- <el-checkbox label="其他" name="type"></el-checkbox> -->

					    <el-checkbox label="完全素食者" name="type"></el-checkbox>
					    <el-checkbox label="蛋奶素食" name="type"></el-checkbox>
					    <el-checkbox label="半素食" name="type"></el-checkbox>
					    <el-checkbox label="鱼素食" name="type"></el-checkbox>
					    <el-checkbox label="果素食" name="type"></el-checkbox>
					    <!-- <el-checkbox label="怕辣" name="type"></el-checkbox> -->
					    <el-checkbox label="其他" name="type"></el-checkbox>
				    </el-checkbox-group>
			  	</el-form-item>

				<el-form-item>
				 	<el-input placeholder='备注' v-model="basicInfo.eatingHabitsRemark" ></el-input>
				</el-form-item>

			  	<el-form-item label="遗传病史">
				    <el-checkbox-group v-model="basicInfo.heredityHistory">
					    <el-checkbox label="无" name="type"></el-checkbox>
					    <el-checkbox label="高血压" name="type"></el-checkbox>
					    <el-checkbox label="糖尿病" name="type"></el-checkbox>
					    <el-checkbox label="心脑血管疾病" name="type是"></el-checkbox>
					    <el-checkbox label="肿瘤病" name="type"></el-checkbox>
					    <el-checkbox label="心脏病" name="type"></el-checkbox>
				    </el-checkbox-group>
			  	</el-form-item>

				<el-form-item>
				 	<el-input placeholder='备注' v-model='basicInfo.heredityHistoryRemark'></el-input>
				</el-form-item>

			  	<el-form-item label="传染病史">
				    <el-checkbox-group v-model="basicInfo.infectiousHistory">
					    <el-checkbox label="无" name="type"></el-checkbox>
					    <el-checkbox label="肝炎" name="type"></el-checkbox>
					    <el-checkbox label="结核" name="type"></el-checkbox>
					    <el-checkbox label="痢疾" name="type"></el-checkbox>
				    </el-checkbox-group>
			  	</el-form-item>

				<el-form-item>
				 	<el-input placeholder='备注' v-model="basicInfo.infectiousHistoryRemark"></el-input>
				</el-form-item>
		  </el-col>
		</el-row>

	    <el-form-item label='外伤史'>
	    	<el-input  type="textarea" :rows='2' v-model='basicInfo.traumaHistory'></el-input>
	    </el-form-item>
	    <el-form-item label='手术史' >
	    	<el-input  type="textarea" :rows='2' v-model='basicInfo.operationHistory'></el-input>
	    </el-form-item>

	   	<el-form-item label='亲属病史' >
	    	<el-input  type="textarea" :rows='2' v-model='basicInfo.familyHistory'></el-input>
	    </el-form-item>

	    <el-form-item label='药物过敏' >
	    	<el-radio-group v-model='basicInfo.drugAllergy'>
	      		<el-radio label="是" value='是'></el-radio>
	      		<el-radio label="否" value='否'></el-radio>
	    	</el-radio-group> 	
	    </el-form-item>
	    <el-form-item  >
			<el-input v-model='basicInfo.drugAllergyRemark'></el-input>  	
	    </el-form-item>


		<el-form-item label="接触史" class='add-history-checkbox'>
		    <el-checkbox-group v-model="basicInfo.contactHistory"  class='addPatient-block'>
		      <el-checkbox label="无" name="type"></el-checkbox>
		      <el-checkbox label="疫区" name="type"></el-checkbox>
		      <el-checkbox label="疫情" name="type"></el-checkbox>
		      <el-checkbox label="牧区" name="type"></el-checkbox>
		      <el-checkbox label="矿山" name="type"></el-checkbox>
		      <el-checkbox label="高氯区" name="type"></el-checkbox>
		      <el-checkbox label="低碘区" name="type"></el-checkbox>
		      <el-checkbox label="化学物质" name="type"></el-checkbox>
		      <el-checkbox label="放射物质" name="type"></el-checkbox>
		      <el-checkbox label="吸毒史" name="type"></el-checkbox>
		      <el-checkbox label="冶游史" name="type"></el-checkbox>
		    </el-checkbox-group>
		</el-form-item>

	  	<el-form-item class='add-input-remark'>
		  	<el-input placeholder='备注'  class='input_block' v-model="basicInfo.contactHistoryRemark"></el-input>
		</el-form-item>

		<el-form-item label="过敏物" class='add-history-checkbox'>
		    <el-checkbox-group v-model="basicInfo.allergy"  class='addPatient-block'>
		      <el-checkbox label="无" name="type"></el-checkbox>
		      <el-checkbox label="海鲜" name="type"></el-checkbox>
		      <el-checkbox label="粉尘" name="type"></el-checkbox>
		      <el-checkbox label="牛奶" name="type"></el-checkbox>
		      <el-checkbox label="鸡蛋" name="type"></el-checkbox>
		      <el-checkbox label="酒精" name="type"></el-checkbox>
		      <el-checkbox label="葱" name="type"></el-checkbox>
		      <el-checkbox label="姜" name="type"></el-checkbox>
		      <el-checkbox label="蒜" name="type"></el-checkbox>
		      <el-checkbox label="花生" name="type"></el-checkbox>
		      <el-checkbox label="霉菌" name="type"></el-checkbox>
		      <el-checkbox label="大豆" name="type"></el-checkbox>
		      <el-checkbox label="柳絮" name="type"></el-checkbox>
		      <el-checkbox label="橡胶" name="type"></el-checkbox>
		      <el-checkbox label="芒果" name="type"></el-checkbox>
		    </el-checkbox-group>
		</el-form-item>

	  	<el-form-item class='add-input-remark'>
		  	<el-input placeholder='备注' class='input_block' v-model='basicInfo.allergyRemark'></el-input>
		</el-form-item>

		  	<el-row class='add-check-group' justify="space-between" type="flex">
		  		<el-col :span='12'>
		  			<el-form-item label='输血史'>
	  					<el-select v-model="basicInfo.bloodTrans" placeholder=""  class='add-input-modify'>
					      <el-option label="否" value="否"></el-option>
					      <el-option label="是" value="是"></el-option>
					    </el-select>
		  			</el-form-item>
		  		</el-col>
		  	</el-row>

		  	<el-row class='add-check-group'>
		  		<el-col :span='6'>
		  			<el-form-item label='吸烟史'>
	  					<el-select v-model="basicInfo.smoke" placeholder=""  class='add-input-modify'>
					      <el-option label="否" value="否"></el-option>
					      <el-option label="是" value="是"></el-option>
					    </el-select>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='戒烟'>
	  					<el-select v-model="basicInfo.quitSmoke" placeholder="" class='add-input-modify'>
					      <el-option label="否" value="否"></el-option>
					      <el-option label="是" value="是"></el-option>
					    </el-select>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='戒烟时长' >
						<el-input class='add-max-input' v-model='basicInfo.quitSmokeTime'></el-input>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='每日/支' >
						<el-input class='add-max-input' v-model='basicInfo.dailySmoke'></el-input>
		  			</el-form-item>
		  		</el-col>


		  	</el-row>

		  	<el-row class='add-check-group'>
		  		<el-col :span='6'>
		  			<el-form-item label='饮酒史'>
	  					<el-select v-model="basicInfo.drink" placeholder=""  class='add-input-modify'>
					      <el-option label="否" value="否"></el-option>
					      <el-option label="是" value="是"></el-option>
					    </el-select>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='日饮酒/两' >
						<el-input class='add-max-input' v-model='basicInfo.dailyDrink'></el-input>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='戒酒'>
	  					<el-select v-model="basicInfo.quitDrink" placeholder="" class='add-input-modify'>
					      <el-option label="否" value="0"></el-option>
					      <el-option label="是" value="1"></el-option>
					    </el-select>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='戒酒时长' >
						<el-input class='add-max-input' v-model='basicInfo.quitDrinkTime'></el-input>
		  			</el-form-item>
		  		</el-col>
		  	</el-row>

		  	<el-row class='add-check-group'>
		  		<el-col :span='6'>
		  			<el-form-item label='初潮'>
		  				<el-input v-model='basicInfo.menarche'  class='add-max-input'></el-input><span class='basic-more-style'>岁</span>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='持续时间'>
		  				<el-input v-model='basicInfo.menstruationPeriod'  class='add-max-input'></el-input><span class='basic-more-style'>天</span>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='周期'>
		  				<el-input v-model='basicInfo.menstrualCycle'  class='add-max-input'></el-input><span class='basic-more-style'>天</span>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='6'>
		  			<el-form-item label='绝经年龄'>
		  				<el-input v-model='basicInfo.menopauseAge'  class='add-max-input'></el-input><span class='basic-more-style'>岁</span>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  	</el-row>

		  	<el-row class='add-check-group'>
		  		<el-col :span='4'>
		  			<el-form-item label='孕'>
		  				<el-input v-model='basicInfo.pregnant' class='add-max-input'></el-input>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='4'>
		  			<el-form-item label='产'>
		  				<el-input v-model='basicInfo.birth'></el-input>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='4'>
		  			<el-form-item label='流产'>
		  				<el-input v-model='basicInfo.abortion'></el-input>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='4'>
		  			<el-form-item label='早产'>
		  				<el-input v-model='basicInfo.prematureLabour'></el-input>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  		<el-col :span='4'>
		  			<el-form-item label='避孕'>
	  					<el-select v-model="basicInfo.contraception" placeholder=""  class='contraception-style'>
					      <el-option label="否" value="否"></el-option>
					      <el-option label="是" value="是"></el-option>
					    </el-select>
		  			</el-form-item>
		  			</el-form-item>
		  		</el-col>
		  	</el-row>
  	</el-form>

	    <div class='add-table-list'>
	    	<div class='add-family'>家属就诊情况</div>
	    	<div class="add-family-right">
		    	<el-table :data='family.familyList' stripe border  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='add-table-index1' max-height="250" >
			  		<el-table-column prop='familyName' label='病人姓名'></el-table-column>
			  		<el-table-column prop='familyId' label='病人id'></el-table-column>
			  		<el-table-column prop='relation' label='病人关系'></el-table-column>
				  	<el-table-column label='操作'>		  		
						<template slot-scope="scope">
							<span class='medicine-delete red' @click='deletePatientFamily(scope.$index,family.familyList)'>删除</span>
						</template>
			  		</el-table-column>				  		
			  	</el-table>
				<el-button @click='showFamily'  class='add-btn'>新增家属</el-button>
				<div class="pagination-style add-patient-page1">
				  <el-pagination
				  	@current-change="familyPage"
				  	:page-size="2"
				    layout="prev, pager, next,jumper"
				    :total="patientFamilyPage*1">
				  </el-pagination>
				</div>
	    	</div>
	    </div>

	    <div class="addPatient-btn-add">
	    	<el-button type='primary'  class='add-patinet-btn' @click='addPatient'>确认添加</el-button>
	    </div>

		

    <el-dialog title="添加家属" :visible.sync="dialogFamilyVisible">
      <el-form :model="familyList">

        <el-form-item label="病人姓名" :label-width="formLabelWidth">
            <el-input v-model="familyList.familyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="家人Id" :label-width="formLabelWidth">
            <el-input v-model="familyList.familyId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="病人关系" :label-width="formLabelWidth"  >
            <el-input v-model="familyList.relation" auto-complete="off"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFamilyVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFamily">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增病史" :visible.sync="dialogHistoryVisible">
      <el-form :model="historyList">

        <el-form-item label="病史Id" :label-width="formLabelWidth" v-show='false'>
            <el-input v-model="historyList.basicCompletionId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="病人Id" :label-width="formLabelWidth" v-show='false'>
            <el-input v-model="historyList.patientId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="传染病史" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.infectionHistory" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="遗传病史" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.familyHistory" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="外伤史" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.traumaHistory" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手术史" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.surgeryHistory" auto-complete="off"></el-input>
        </el-form-item>        
        <el-form-item label="主要症状" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.mainSymptoms" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重要诊断" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.importantDiagno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过敏史" :label-width="formLabelWidth"  >
            <el-input v-model="historyList.anaphylaxisHistory" auto-complete="off"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogHistoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveHistory">确 定</el-button>
      </div>
    </el-dialog>

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
      	info:{},
      	inquiryType:"",
      	tableData: [{
            familyId: '2',
            familyName: '王小虎',
            relation: '儿子'
          }],
      	tableData2: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],    	
        patientId:"",
        basicInfo:{
        	inquiryType:"普通",
        	patientId:"",
        	certificatesType:"",
        	certificatesNumber:"",
        	birthday:"",
        	prematureLabour:0,
        	abortion:0,
        	belief:"无",
        	bloodTrans:"否",
        	smoke:"否",
        	drink:"否",
        	dailyDrink:"",
        	dailySmoke:0,
        	contraception:"否",
        	contactHistory:["无"],
        	eatingHabits:[],
        	pastHistory:[],
        	marriage:"未婚",
        	quitSmoke:"否",
        	quitDrink:"否",
        	eatingHabitsRemark:"无",
        	pastHistoryRemark:"无",
        	contactHistoryRemark:"无",
        	traumaHistory:"",
        	operationHistory:"",
        	drugAllergy:"否",
        	drugAllergyRemark:"无",
        	allergy:["无"],
        	allergyRemark:"无",
        	heredityHistory:["无"],
        	infectiousHistory:["无"],
        	infectiousHistoryRemark:"无",
        	heredityHistoryRemark:"无",
        	quitSmokeTime:"",
        	menarche:"",
        	menopauseAge:"",
        	menstrualCycle:"",
        	menstruationPeriod:"",
        	occupation:"自由职业",
        	pregnant:0,
        	birth:0,
        	certificatesType:"身份证",
        	nationality:"中国",
        	national:"汉"

        },
        cityList:[],
        formLabelWidth:"160px",
        dialogFamilyVisible:false,
        familyList:{},
        family:{
        	familyList:[

        	]
        },
        historyList:{},
        dialogHistoryVisible:false,
        basicHistory:{
        	basicHistoryList:[]
        },
        patientFamilyPage:'',
        historyPageCount:""

    }
  },
  created(){
  	this.getCity()

  	// if patientId  填充
  	//  else 新增
  	let patientEditId=this.$route.params.patientId
  	this.patientEditId=patientEditId
  	// this.patientEditId=patientId
  	if(patientEditId){
  		// 获取基本信息
  		axios.get("/api/patient/getPatientInfo",{
  			params:{
  				patientId:patientEditId
  			}
  		}).then((res)=>{
  			console.log("res.data.returnData.patientInfo",res.data.returnData.patientInfo)
  			this.basicInfo=res.data.returnData.patientInfo

  			this.basicInfo.incunabulum[0]=this.basicInfo.incunabulum[0]*1
  			this.basicInfo.incunabulum[1]=this.basicInfo.incunabulum[1]*1


  			this.basicInfo.residence[0]=this.basicInfo.residence[0]*1
  			this.basicInfo.residence[1]=this.basicInfo.residence[1]*1

  			// basicInfo.pastHistory
  			if(!this.basicInfo.pastHistory){
  				this.basicInfo.pastHistory=[]
  			}
  			if(!this.basicInfo.eatingHabits){
  				this.basicInfo.eatingHabits=[]
  			}
  			if(!this.basicInfo.contactHistory){
  				this.basicInfo.contactHistory=[]
  			}  			

  		})

  		//  获取病人家属
  		this.getPatientFamily(1)
  		this.getHistory(1)
  	}
  },
  methods:{
  	modify(){
  		console.log(this.basicInfo.patientId)
  		axios.get('/api/patient/getPatientInfo',{
  			params:{
  				patientId:this.basicInfo.patientId
  			}
  		}).then((res)=>{
  			console.log(res)
  			this.basicInfo=res.data.returnData.patientInfo

  			this.basicInfo.incunabulum[0]=this.basicInfo.incunabulum[0]*1
  			this.basicInfo.incunabulum[1]=this.basicInfo.incunabulum[1]*1

  			this.basicInfo.residence[0]=this.basicInfo.residence[0]*1
  			this.basicInfo.residence[1]=this.basicInfo.residence[1]*1

  		})
  	},
  	handleChange(){

  	},
  	familyPage(page){
  		this.getPatientFamily(page)
  	},
  	historyPage(page){
  		this.getHistory(page)
  	},
  	getPatientFamily(page){
  		axios.get('/api/patient/getFamily',{
  			params:{
  				patientId:this.patientEditId,
  				pageNum:page,
  				pageRow:2
  			}
  		}).then((res)=>{
  			console.log("家属情况",res.data.returnData)
  			this.family.familyList=res.data.returnData.list
  			this.patientFamilyPage=res.data.returnData.totalCount
  		})
  	},
  	getHistory(page){
  		axios.get('/api/patient/getHistoryList',{
  			params:{
	  			patientId:this.patientEditId,
	  			pageNum:page,
	  			pageRow:2
  			}
  		}).then((res)=>{
  			console.log("病人基本病史",res.data.returnData)
  			this.basicHistory.basicHistoryList=res.data.returnData.list
  			this.historyPageCount=res.data.returnData.totalCount
  		})
  	},

  	addPid(){
  		axios.get("/api/patient/getNewPid").then((res)=>{
  			this.basicInfo.patientId=res.data.returnData.patientId
  			// this.patientId=res.data.returnData.patientId

  			console.log("this.basicInfo.patientId",this.basicInfo.patientId)
  		})
  	},
  	getCity(){
  		axios.get('/api/place/getPlace').then(res=>{
  			let cityData=res.data.returnData.placeList
  			let cityList=[]
  			cityData.forEach((item,index)=>{
  				// 先拿出children
  				let children=[]
  				item.cityList.forEach((childenItem,childrenIndex)=>{
  					children.push({
  						label:childenItem.cityName,
  						value:childenItem.cityId
  					})
  				})
  				cityList.push({
  					label:item.provName,
  					value:item.Id,
  					children:children
  				})
  			})
  			this.cityList=cityList

  		})
  	},
  	showFamily(){
  		this.familyList={}
  		this.dialogFamilyVisible=true
  	},
  	showHistory(){
  		this.historyList={}
  		this.dialogHistoryVisible=true
  	},
  	saveFamily(){
  		//tableData
  		// this.basicInfo.patientId=10021
  		console.log(this.basicInfo.patientId)
  		if(this.basicInfo.patientId){
	  		this.family.familyList.push({
	  			patientId:this.basicInfo.patientId,
	  			familyId:this.familyList.familyId,
	  			relation:this.familyList.relation,
	  			familyName:this.familyList.familyName
	  		})

	  		this.dialogFamilyVisible=false  	

  		}
  		else{
  			alert("请先输入患者编号")
  		}
  	},
  	deletePatientFamily(index,table){
  		console.log(index)
  		console.log(table)
  		table.splice(index,1)
  		console.log(table)
  	},
  	deletePatientHistory(index,table){
  		table.splice(index,1)
  	},
  	saveHistory(){
  		if(this.basicInfo.patientId){
	  		this.basicHistory.basicHistoryList.push({
	  			patientId:this.basicInfo.patientId,
	  			basicCompletionId:this.historyList.basicCompletionId,
	  			infectionHistory:this.historyList.infectionHistory,
	  			familyHistory:this.historyList.familyHistory,

	  			traumaHistory:this.historyList.traumaHistory,
	  			surgeryHistory:this.historyList.surgeryHistory,
	  			mainSymptoms:this.historyList.mainSymptoms,
	  			importantDiagno:this.historyList.importantDiagno,
	  			anaphylaxisHistory:this.historyList.anaphylaxisHistory,

	  		})

	  		this.dialogHistoryVisible=false  		
	  		console.log("this.basicHistory.basicHistoryList",this.basicHistory.basicHistoryList)	
  		}
  		else{
  			alert("请先输入患者编号")
  		}
  	},
  	addPatient(){

  		let params={
  			basicInfo:this.basicInfo,
  			basicHistory:this.basicHistory,
  			family:this.family
  		}
  		console.log("params",params)
  		axios.post("/api/patient/addBasicInfo",params).then((res)=>{
  			console.log(res)

  			if(this.patientEditId){
  				// 编辑操作
  				// this.$router.push({name:"patient"})
  				if(res.data.returnCode==200){
  					this.$router.push({name:"patient"})
  				}

  			}

  			else{
	  			axios.post("/api/dailyPatient/addDailyPatient",{
	  				patientId:this.basicInfo.patientId,
	  				pname:this.basicInfo.name,
	  				inquiryType:this.basicInfo.inquiryType
	  			}).then((res2)=>{
	  				console.log(res2)
	  				if(res2.data.returnCode==200){
	  					this.$router.push({name:"today"})
	  					// console.log(res.data)
	  				}
	  				else{
	  					alert("缺少必填参数")
	  				}
	  			})
  			}


  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

	.add-el-form{
		margin-top:40px;
	}
	.el-input.patient-id{
		width: 220px!important;
	}
	.add-patient-container{
		padding:40px 160px;
		.el-form{
			margin-top:40px
			.el-row{
				.el-form-item{

					
				}
			}

		}
	}

	.add-family{
		display: inline-block;
		color:#606266;

	}
	.el-table{
		display: inline-block;
		width:calc(~"100%-100px")!important;
	}
	.add-table-list{
		// width:100%;
		display: flex;
		.add-family{
			flex:0 1 180px;
			// font-size: 13px;
			font-size: 28px;
		}
		.add-family-right{
			flex:1;
			display: flex;
			flex-direction: column;
			height:100%;
				.add-table-index1{
					flex:1;
					max-width: 980px;
				}

		}
	}
	.add-left{
		padding-left:20px;
	}

	.headerlight{
		background: red;
	}
	.add-patient-page1{
		// padding-left:100px;
		margin-top:16px;
	}
	.el-table.add-table-index2{
		// margin-left:100px;
		margin-top:20px;
		// margin-right:10px;
	}
	.add-h-w {
		max-width: 660px;
	}
	.el-checkbox-group{
		max-width: 480px;
	}
	.add-history-checkbox{
		margin-top:40px;
	}
	.add-input-remark{
		margin-left:30px;
	}
	.add-input-modify{
		margin-left:30px;
		max-width: 80px;
	}
	.add-max-input{
		max-width: 80px;
		margin-left:30px;
	}
	.add-patinet-btn{
		margin-left:180px;
	}
	.add-btn{
		width:200px;
		margin-top:20px;
		float: right;;
	}

	.dialog-footer{
		text-align: center;
	}

	.after-info{
		display: inline-block;
	}

	.el-form-item__label{
		font-size: 30px;
	}

	.el-input .el-input__inner{
		color:#20A0FF!important;
		font-weight: 600!important;
	}

	.el-checkbox-group.addPatient-block{
		max-width: 1600px;
	}

	.el-checkbox span.el-checkbox__label{
		font-size:26px!important;
	}

	.addPatient-btn-add{
		text-align: center;
	}

	.addPatient-word{
		font-size: 30px;
		padding-left:50px;
	}

	.contraception-style{
		width:80px!important;
	}

	.basic-more-style{
		font-size:30px;
		font-weight:400;
		color: #606266;
	}


</style>
