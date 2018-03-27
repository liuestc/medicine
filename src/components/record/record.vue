<template>
    <div class='record-container'>
	  	<el-input placeholder='请输入关键字' class='patient-search' @keyup.enter.native='searchPatient' v-model='patientInfo'>
	  		<el-button slot="append" icon="el-icon-search" @click='searchPatient'></el-button>
	  	</el-input>

      <div class="data-input-wrapper">
        <el-date-picker   v-model="time"   type="daterange" range-separator="至" value-format='yyyy-MM-dd' start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type='primary' class='searchBytime' @click='searchBytime'>查询</el-button>
      </div>

		  <el-table :data='list' stripe  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='record-table'>
	  		<el-table-column prop='patientName' label='姓名'></el-table-column>
	  		<el-table-column prop='inquiryDate' label='报到时间'></el-table-column>
	  		<el-table-column prop='patientId' label='病人唯一标识'></el-table-column>
		  	<el-table-column label='操作'>		  		
				<template slot-scope="scope">
					<span class='medicine-modify blue' @click='modifyDiag(scope.row)'>修改问诊记录</span>
					<span class='medicine-modify blue' @click='modifyMedicine(scope.row)'>修改药方</span>
				</template>
	  		</el-table-column>
	  	</el-table>	

      <div class="pagination-style">
        <el-pagination background  layout="prev, pager, next,jumper" :total="count1*1" @current-change="pageDesc2" :page-size='16'></el-pagination>
      </div>

      <p class='record-btns'>
        <el-button @click='exportMedicine'>导出药方</el-button>
        <el-button @click='exportWord'>导出Excel药方</el-button>
        <el-button @click='exportExcel'>导出Word药方</el-button>
      </p>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      	msg: '',
      	list:[],
      	tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        patientInfo:'' ,
        time:"",
        count1:""
    }
  },
  created(){
  	this.getList(1,this.patientInfo,this.time[0],this.time[1])
  },
  methods:{
    exportMedicine(){
      axios.get("/api/MedicalHistory/downloadQuestion",{
        params:{
          keyString:this.patientInfo,
          startDate:this.time[0],
          endDate:this.time[1]
        }
      }).then((res)=>{

      })

    },
    exportWord(){
      axios.get("/api/MedicalHistory/downloadRecipe",{
        params:{
          keyString:this.patientInfo,
          startDate:this.time[0],
          endDate:this.time[1]
        }
      }).then((res)=>{
        
      })
    },

    exportExcel(){
      axios.get("/api/MedicalHistory/downloadWord",{
        params:{
          keyString:this.patientInfo,
          startDate:this.time[0],
          endDate:this.time[1]
        }
      }).then((res)=>{
        
      })      
    },

    pageDesc2(val){
      this.getList(val,this.patientInfo,this.time[0],this.time[1])
    },

  	getList(page,search,start,end){
  		axios.get('/api/InquiryRecord/getDailyReport',{
  			params:{
  				pageRow:16,
  				pageNum:page,
  				startDate:start,
  				endDate:end,
  				keyString:search
  			}
  		}).then((res)=>{
  			console.log(res.data)
  			this.list=res.data.returnData.list
        this.count1=res.data.returnData.totalCount
  		})
  	},
  	modifyDiag(row){
  		window.localStorage.setItem("flag","修改")
  		this.$router.push({
  			name:'diagnosis2',
  			params:{
  				patientId:row.patientId,
  				inquiryId:row.inquiryId
  			}
  		})
  	},
  	modifyMedicine(row){
  		console.log(row)
  		this.$router.push({
  			name:'prescription2',
  			params:{
  				patientId:row.patientId,
  				inquiryId:row.inquiryId
  			}
  		})
  	},
  	searchPatient(){
  		this.getList(1,this.patientInfo)
  	},

    searchBytime(){
      this.getList(1,this.patientInfo,this.time[0],this.time[1])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
.record-container{
	padding:40px;
  .record-table{
    max-width:1600px;
    font-size: 30px;
    font-weight: 600;
    .cell{
      line-height: 30px;
    }

  }
  .patient-search{
    margin-bottom:20px;
    vertical-align: middle;
  }

}

  .medicine-modify,.medicine-delete{
    font-size:20px;
    font-weight: 600;
  }

  .data-input-wrapper{
    max-width: 940px;
    display: inline-block;
    margin-top:-4px;
    vertical-align: text-bottom;
  }

  .searchBytime{
    padding: 6px 15px!important;
    vertical-align: bottom;
  }

  .record-btns{
    text-align: center;
    margin-top:40px;
  }
</style>
