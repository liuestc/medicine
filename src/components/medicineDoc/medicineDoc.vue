<template>
	<div class='medicine-container'>
	  	<div class='medicine-left'>
	  		<p class='medicine-title-word'>此次病情症状单</p>
	  		<el-input type="textarea" :autosize="{ minRows: 30, maxRows: 20}" placeholder="请输入内容" v-model='inquiryResult' ></el-input>
	  	</div>
	  	<div class='medicine-right'>
	  		<p class="medicine-title-word">上次药方</p>
<!-- 
			<el-table :data='demo'>
				
			</el-table> -->

	  		<!-- <el-input></el-input> -->
			<div class='medicine-add-btn'>
			  	<el-button size="small"  @click="addTab" type='primary'>添加主方</el-button>
			</div>
			<el-tabs v-model="activePanel" type="card" val='处方1' closable @tab-remove="removeTab"  @tab-click='togTab'>
			  <el-tab-pane
			    v-for="(item, index) in list"
			    :label="trans(index)"
			    :name="transStr(item.mainRecipeId)"
			    :key='index'
			  >
			    <!-- {{item.title}} -->
				<el-row class="medicine-table-list">
					<el-col :span='5'  class='medicine-table-left' v-for='(medicineList,index2) in item.recipeList' :key='index2'>
		  				<el-table :data='medicineList.recipeDetailList' stripe  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='add-table-index1'>
					  		<el-table-column prop='medicine' label='药名' width='50px'></el-table-column>
					  		<el-table-column prop='dose' label='剂量' ></el-table-column>
						  	<el-table-column label='编辑'>		  		
								<template slot-scope="scope">
									<span class='medicine-delete' @click='deleteMedicineDetail(scope.row)'>删除</span>
								</template>
					  		</el-table-column>
					  	</el-table>	
					  	<div class="medicine-btn-group">
							<el-button type='primary' @click='addMedicineDetail(medicineList)'>添加</el-button>
							<!-- <el-button >删除</el-button>				  		 -->
					  	</div>
					  	<el-input placeholder='数量'  class='medicine-num' v-model='medicineList.amount' @change='changeAmount' @blur='changeAmount'></el-input><span class='medicine-num-after'>付</span>

					  	<el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" v-model='medicineList.remarks' placeholder="请输入内容" class='medicine-text' ></el-input>	
					</el-col>
				</el-row>

			  </el-tab-pane>
			</el-tabs>


			<div class="medicine-bottom-btn">
				<el-button type='primary'  @click='saveRemark'>完成诊断</el-button>
				<el-button >打印</el-button>				
			</div>

	  	</div>

	    <el-dialog title="添加中药" :visible.sync="dialogMedicineVisible">
	      <el-form :model="medicineDetail">

	        <el-form-item label="药名" :label-width="formLabelWidth">
	            <el-input v-model="medicineDetail.medicine" auto-complete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="剂量" :label-width="formLabelWidth">
	            <el-input v-model="medicineDetail.dose" auto-complete="off"></el-input>
	        </el-form-item>


	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="dialogMedicineVisible = false">取 消</el-button>
	        <el-button type="primary" @click="saveMedicine">确 定</el-button>
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
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
      	tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],

      	tableData2: [{
            date: '2016-05-02',
            name: '001',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '001',
            address: '上海市普陀区金沙江路 1518 弄'
          }],


		editableTabsValue2: '2',
        tabIndex: 2,
        list2:{
			"returnCode": "200",
			"returnMsg": "请求成功",
			"returnData": {
		    "recipleList": [
		      	{
			        "mainRecipeId": 2,
			        "inquiryId": 17,
			        "title":"处方一",
			        "recipeList": [
		          		{
				            "amount": 666,
				            "recipeDetailList": [
					            {
					                "dose": 1,
					                "detailId": 1,
					                "medicine": "当归"
					            },
					            {
					                "dose": 1,
					                "detailId": 2,
					                "medicine": "白术"
					            }
		            		],
				            "recipeId": 1,
				            "remarks": "1"
		          		},
		        		{
		            		"amount": 1,
		            		"recipeDetailList": [
					            {
					                "dose": 3,
					                "detailId": 3,
					                "medicine": "当归"
					            },
				              	{
					                "dose": 4,
					                "detailId": 4,
					                "medicine": "白术"
				              	}
		            		],
				            "recipeId": 3,
				            "remarks": "1"
		          		}
		        	]
		      	},
		      	{
			        "mainRecipeId": 3,
			        "inquiryId": 17,
			        "title":"处方2",
		        	"recipeList": [
		        		{
				            "amount": 1,
				            "recipeDetailList": [
			              		{
					                "dose": 1,
					                "detailId": 1,
					                "medicine": "当归"
			              		},
				              	{
					                "dose": 1,
					                "detailId": 2,
					                "medicine": "白术"
				              	}
			            	],
				            "recipeId": 1,
				            "remarks": "1"
		          		},
		          		{
		            		"amount": 1,
				            "recipeDetailList": [
				              	{
					                "dose": 3,
					                "detailId": 3,
					                "medicine": "当归"
				              	},
				              	{
					                "dose": 4,
					                "detailId": 4,
					                "medicine": "白术"
				              	}
				            ],
				            "recipeId": 3,
				            "remarks": "1"
		          		}
		        	]
		      	},
		      	{
			        "mainRecipeId": 4,
			        "inquiryId": 17,
			        "title":"处方3",
		       		"recipeList": [
		          		{
				            "amount": 1,
				            "recipeDetailList": [
					            {
					                "dose": 1,
					                "detailId": 1,
					                "medicine": "当归"
					            },
				                {
					                "dose": 1,
					                "detailId": 2,
					                "medicine": "白术"
				              	}
				            ],
				            "recipeId": 1,
				            "remarks": "1"
		          		},
		          		{
		            		"amount": 1,
				            "recipeDetailList": [
					            {
					                "dose": 3,
					                "detailId": 3,
					                "medicine": "当归"
					            },
					            {
					                "dose": 4,
					                "detailId": 4,
					                "medicine": "白术"
					            }
				            ],
				            "recipeId": 3,
				            "remarks": "1"
		          		}
		        	]
		      	}      

		    ]
		  }
		},
		list:[
			{
				'mainRecipeId':''
			}
		],
		activePanel:'',
		patientId:'',
		inquiryId:'',
		dialogMedicineVisible:false,
		formLabelWidth:'80px',
		medicineDetail:{},
		currentRecipeId:'',
		inquiryResult:''


    }
  },
  created(){
  	let patientId=this.$route.params.patientId
  	let inquiryId=this.$route.params.inquiryId
  	this.patientId=patientId
  	this.inquiryId=inquiryId
  	this.getRecipe()
  	this.getInquiryList(1)
  },
  methods:{
		// 得到药方
  	getInquiryList(page){
  		axios.get('/api/inquiryResult/getInquiryResultList',{
  			params:{
  				patientId:this.patientId,
  				pageRow:100,
  				pageNum:page  				
  			}
  		}).then((res)=>{
  			let inquiryPage=res.data.returnData.totalCount-1
  			this.inquiryResult=res.data.returnData.list[inquiryPage].inquiryResult
  			
  			console.log("this.inquiryList",this.inquiryList)
  		})
  	},


    getRecipe(){
      axios.get("/api/recipe/getRecipe",{
        params:{
          inquiryId:this.inquiryId
        }
      }).then((res)=>{
      	
      	this.list=res.data.returnData.recipleList
      	console.log("药方",res.data.returnData)
      	this.activePanel=this.list[0].mainRecipeId+""
      	

      })
    },

  	  handleClose(tag) {
  	  	console.log(tag)
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      checkMedicine(tag){
      	console.log(tag)
      },
      deleteMedicine(){

      },
      checkTab(item){
      	console.log(item)
      },
      addTab() {

      	if(this.list.length>4){
      		alert("最多只能添加4张主方")
      	}
      	else{
	      	axios.post('/api/recipe/addMainRecipe',{
	      		inquiryId:this.inquiryId
	      	}).then((res)=>{
	      		console.log("添加药方",res.data)
	      		this.getRecipe()
	      	})      		
      	}


      },
      togTab(item){
      	console.log(item.name)
      	this.activePanel=item.name
      },
      removeTab(targetName) {
      	console.log(targetName)
      },
      deleteMedicineDetail(row){
      	//
      	console.log(row)
      	axios.delete("/api/recipe/deleteRecipeDetail",{
      		recipeDetailId:row.detailId
      	}).then((res)=>{
      		if(res.data.returnCode==200){
      			console.log("删除成功")
      		}
      	})
      },
      trans(index){
      	// return "kkk"
      	if(index==0){
      		return "处方1"
      	}
      	if(index==1){
      		return "处方2"
      	}
      	if(index==2){
      		return "处方3"
      	}
      	if(index==3){
      		return "处方4"
      	}
      },
      transStr(item){
      	return item+""
      },
      addMedicineDetail(row){
      	// console.log(recipeId)
      	this.dialogMedicineVisible=true
      	this.medicineDetail={}
      	this.currentRecipeId=row.recipeId
      },
      saveMedicine(){
      	this.medicineDetail.recipeId=this.currentRecipeId
      	
      	let params={
      		recieDetailList:[]
      	}
      	params.recieDetailList.push(this.medicineDetail)
      	console.log("this.medicineDetail",this.medicineDetail)
      	axios.post('api/recipe/addRecipeDetail',params).then((res)=>{
      		if(res.data.returnCode==200){
      			console.log("新增药方成功")
      			this.dialogMedicineVisible=false
      			this.getRecipe()
      		}
      		else{
      			alert("服务器错误")
      			this.dialogMedicineVisible=false
      		}
      	})

      },
      changeAmount(val){
      	console.log(val)
      },
      saveRemark(){
      	console.log("activePanel",this.activePanel)
      	
      	let listCopy=JSON.parse(JSON.stringify(this.list))
      	
      	let sendRemark=[]
      	listCopy.forEach((item,index)=>{
      		item.recipeList.forEach((item2,index2)=>{
      			item2.recipeDetailList={}
      			sendRemark.push(item2)
      		})
      	})
      	console.log("sendRemark",sendRemark)
      	axios.put("/api/recipe/updateRecipe",{
      		recipleList:sendRemark
      	}).then((res)=>{
      		console.log(res.data)
      		if(res.data.returnMsg=="请求成功"){
      			this.$router.push({
      				name:'today'
      			})
      		}
      	})

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.medicine-container{
		display: flex;
		.medicine-left{
			flex:0 1 300px;
		}
		.medicine-right{
			flex:1;
			padding-left:40px;
		}
	}


	.medicine-title-word{
		margin-bottom:10px;
	}
  	.el-tag + .el-tag {
    	margin-left: 10px;
  	}
  	// .button-new-tag {
	  //   margin-left: 10px;
	  //   height: 32px;
	  //   line-height: 30px;
	  //   padding-top: 0;
	  //   padding-bottom: 0;
  	// }
  	.input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
  	}

  	.medicine-tag-wrapper{
  		margin-top:30px;
  	}
  	.medicine-delete{
  		color:#20A0FF;
  		font-size:13px;
  		cursor: pointer;
  	}

  	.medicine-table-list{
  		margin-top:30px;
  		margin-left:-30px;
  	}

  	.medicine-btn-group{
  		margin-bottom:10px;
  		margin-top: 10px;
  		text-align: right;
  	}

  	.el-input.medicine-num{
  		max-width:212px;
  		min-width: 100px;
  	}
  	.medicine-num-after{
  		display: inline-block;
  		margin:0 10px;
  		color:#475669;
  		font-size:13px;
  	}
  	.medicine-text{
  		margin-top:10px;
  	}

  	.button-add-small{
  		float: right;
  	}

  	.medicine-bottom-btn{
  		margin:0 auto;
  		margin-top: 30px;
  		text-align: center;

  	}
  	.medicine-table-left{
  		margin-left:30px;
  	}

  	.medicine-add-btn{
  		margin:20px 0;
  	}


</style>
