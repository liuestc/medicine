<template>
  	<div class='data-container'>
		<template>
		  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
		    <el-tab-pane label="问诊情况" name="first">    			
    			<div class="data-input-wrapper">
    				<el-date-picker   v-model="time"   type="daterange" range-separator="至" value-format='yyyy-MM-dd' start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

    				<el-button type='primary' class='searchBytime' @click='searchBytime'>查询</el-button>

    				<div class="data-time-wrapper">
    					<span class='data-span-margin'>开始时间:&nbsp;</span><span class='blue'>{{this.time[0]}}</span>
    					<span class='data-span-margin'>结束时间:&nbsp;</span><span class='blue'>{{this.time[1]}}</span>
    				</div>
    			</div>

				<el-table :data='list' stripe  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='data-table1'>
					<el-table-column prop='patientInfo.patientName' label='姓名'></el-table-column>
			  		<el-table-column prop='inquiryId' label='号码'></el-table-column>
			  		<el-table-column prop='patientInfo.age' label='年龄'></el-table-column>
			  		<el-table-column prop='patientInfo.city' label='来自'></el-table-column>
			  		<el-table-column prop='main.answer' label='主述'></el-table-column>
			  		<el-table-column prop='inquiryDate' label='问诊时间'></el-table-column>
			  		<el-table-column prop='inquiryType' label='类型'></el-table-column>
			  		<el-table-column prop='amountList[0].amount' label='付数'></el-table-column>
			  	</el-table>
				<div class="pagination-style">
				  <el-pagination background  layout="prev, pager, next,jumper" :total="count1*1" :page-size="16"  @current-change="pageDesc"></el-pagination>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="用药统计" name="second">
		    	<div class="data-second-wrapper">
		    		<el-date-picker   v-model="time2"  type="daterange" range-separator="至" value-format='yyyy-MM-dd' start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					<el-input v-model='medicine' placeholder='请输入药名'></el-input>

		    		<el-button type='primary' class='searchBytime' @click='searchBytime2'>查询</el-button>
		    	</div>
				<el-table :data='list2' stripe  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='data-table2'>
			  		<el-table-column prop='medicine' label='药名'></el-table-column>
			  		<el-table-column prop='dose' label='药量(g)'></el-table-column>
			  	</el-table>
				<div class="pagination-style">
				  <el-pagination background  layout="prev, pager, next,jumper" :total="count2*1" @current-change="pageDesc2" :page-size='16'></el-pagination>
				</div>		    	
		    </el-tab-pane>
		  </el-tabs>
		</template>
  	</div>
</template>

<script>
import axios from 'axios'
export default {
  	name: '',
  	data () {
    	return {
		    msg: '',
		    value1:"",
		    medicine:"",
		    activeName2: 'first',
	      	tableData: [{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          },{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }],

	        list:[],
	        list2:[],
	        time:[],
	        time2:[],
	        count1:"",
	        count2:""


   		}
  	},
  	methods:{
  		handleClick(tab, event) {
        	console.log(tab.index);
      	},
      	pageDesc(val){
      		this.getList(val,this.time[0],this.time[1])
      	},
      	pageDesc2(val){
      		this.getAmount(val,this.time2[0],this.time2[1])
      	},
      	getList(page,start,end){
      		axios.get('/api/dailyPatient/getDailyReport',{
      			params:{
      				pageNum:page,
      				pageRow:16,
      				startDate:start,
      				endDate:end

      			}
      		}).then((res)=>{
      			console.log(res)
      			this.list=res.data.returnData.list
      			this.count1=res.data.returnData.totalCount
      			console.log("count1",this.count1)
      		})
      	},
      	getAmount(page,start,end){
      		axios.get('/api/recipe/countRecipe',{
      			params:{
      				pageNum:page,
      				pageRow:16,
      				startDate:start,
      				endDate:end,
      				medicine:this.medicine

      			}
      		}).then((res)=>{
      			console.log(res)
      			this.count2=res.data.returnData.totalCount
      			this.list2=res.data.returnData.list
      		})      		
      	},
      	searchBytime(){
      		console.log(this.time)
      		this.getList(1,this.time[0],this.time[1])
      	},
      	searchBytime2(){
      		this.getAmount(1,this.time2[0],this.time2[1])
      	}
  	},
  	created(){
  		this.getList(1)
  		this.getAmount(1)
  	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
	.data-container{
		padding:40px;

		.el-table{
			max-width:1600px;
		    font-size: 30px;
		    font-weight: 600;
		    .cell{
		      line-height: 30px;
		    }
		}
		.data-account-group{
			display: inline-block;
		}
		.data-table1{
			max-width:1600px;
		}
		.data-table2{
			max-width: 800px;
		}
		.data-input-wrapper{
			padding:20px 0;
			max-width: 940px;
		}
		.data-time-wrapper{
			display: inline-block;
			float: right;
			line-height: 48px;
			span{
				color:#8492A6;
				font-size: 12px;
				display: inline-block;
			}
		}

		.data-span-margin{
			margin-left:20px;
			display: inline-block;
			color:#8492A6;
			font-size: 12px;

		}

		.data-second-wrapper{
			padding:20px 0;
		}

		.el-tab-pane{
			font-size: 20px;
		}

		.el-tabs__nav{
			font-size:24px!important;
		}

		.el-tabs__item{
			font-size:24px!important;
		}



	}


</style>
