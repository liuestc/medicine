<template>
  <div class='today-container'>
  	<el-button type='primary' @click='addPatient' class='today-add-btn'>添加当日病人</el-button>
  	<el-table :data='patientList' stripe border  :header-row-style='{background:"rgba(224,230,237,1)",color:"#475669"}' class='today-table'>
      
      <el-table-column prop='todayNum' label='序号' :width='200'></el-table-column>
  		<el-table-column prop='pname' label='姓名'></el-table-column>
  		<el-table-column prop='inquiryType' label='诊号类别'></el-table-column>
  		<el-table-column prop='patientId' label='病人唯一标识符'></el-table-column>
  		<el-table-column prop='inquiryDate' label='报到时间'></el-table-column>
  		<!-- <el-table-column prop='inquiryStatus' label='状态'></el-table-column> -->
  		<el-table-column label="操作">
			<template slot-scope="scope">
				  <span class='today-opt-btn' @click='diagnosis(scope.row)'>诊断</span>
			</template>
  		</el-table-column>
  	</el-table>

	<div class="pagination-style">
	  <el-pagination	 background  layout="prev, pager, next,jumper" :total="totalPage" @current-change="handleCurrentChange" :page-size="8"></el-pagination>
	</div>

  </div>
</template>

<script>
import '../../../static/css/common.css'
import axios from 'axios'
// import {todayPatient} from '../../assets/js/get.js'
export default {
  name: '',
  data () {
    return {
      msg: '',
      patientList:[],
      totalPage:1,
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  created(){
    this.getDailyPatient()
  },
  methods:{
  	addPatient(){
  		this.$router.push({
  			name:'addPatient'
  		})
  	},
  	diagnosis(row){
      window.localStorage.setItem("flag","新增")
      console.log(row)
      if(row.inquiryStatus){
        alert("诊断已完成，请到病历管理中修改")
      }
      else{
        this.$router.push({
          name:'diagnosis',
          params:{
            patientId:row.patientId,
            inquiryId:row.inquiryId
          }
        })          
      }


		
  	},
    medicineDoc(row){
      this.$router.push({
        name:'medicineDoc',
        params:{
            patientId:row.patientId,
            inquiryId:row.inquiryId          
        }
      })       
    },


    getDailyPatient(){
      axios.get("/api/dailyPatient/getDailyPatient",{
        params:{
          pageNum:1,
          pageRow:8
        }
      }).then((res)=>{
        //  vue 中引入外部函数
        console.log(res)
        this.patientList=res.data.returnData.list
        this.totalPage=res.data.returnData.totalCount

        console.log(this.patientList)
      })
    },
    handleCurrentChange(val){
      axios.get("/api/dailyPatient/getDailyPatient",{
        params:{
          pageNum:val,
          pageRow:8
        }
      }).then((res)=>{
        console.log(this)
        //  vue 中引入外部函数
        this.patientList=res.data.returnData.list
        this.totalPage=res.data.returnData.totalCount

        console.log(this.patientList)
      })      
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
// @import '/static/css/common.css'
	.today-container{
		padding:40px 120px;
		.el-table{
			margin-top: 20px;
      font-size:30px!important;

     .cell{
       line-height: 38px;
     }
			.today-opt-btn{
				cursor: pointer;
				color:#20A0FF;
				font-size:13px;
				display: inline-block;
				padding-left:4px;
        font-size:22px;
			}
		}
	}

  .today-table{
    max-width:1400px;
    font-size:30px!important;
    font-weight:600;
  }


</style>
