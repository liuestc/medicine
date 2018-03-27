<template>
    <div class='patient-container'>
      <div class="patient-search-wrapper">
        <el-input placeholder='请输入病人名字' class='patient-search' v-model='searchWord'>
          <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
        </el-input>        
      </div>

		<el-table :data='patientList' stripe  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='patient-table' row-class-name='add-line-height'>
	  		<el-table-column prop='patientName' label='姓名'></el-table-column>
	  		<el-table-column prop='patientId' label='病人唯一标识'></el-table-column>
		  	<el-table-column label='操作'>		  		
				<template slot-scope="scope">
					<span class='medicine-modify blue' @click='modifyPatient(scope.row)'>修改</span>
					<!-- <span class='medicine-delete red' @click='deletePatient(scope.row)'>删除</span> -->
				</template>
	  		</el-table-column>
	  	</el-table>	

  		<div class="pagination-style">
  		  <el-pagination background  layout="prev, pager, next,jumper" :total="totalpage*1" :page-size="16"  @current-change="pageDesc"></el-pagination>
  		</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      	msg: '',
      	tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
         totalpage:"" ,
         patientList:[],
         searchWord:''

    }
  },
  created(){
  	this.getPatientList(1)
  },
  methods:{
  	modifyPatient(row){
  		// this.$router.push({
  		// 	name:answer
  		// })
  		this.$router.push({
  			name:'addPatient',
  			params:{
  				patientId:row.patientId
  			}
  		})
  	},
  	deletePatient(row){
      
  	},
  	getPatientList(index,search){
  		axios.get("/api/patient/getPatientList",{
  			params:{
			  "pageNum": index,
			  "pageRow": 16,
			  "patientName": search
  			}
  		}).then((res)=>{
  			
  			this.patientList=res.data.returnData.list
  			this.totalpage=res.data.returnData.totalCount
  			console.log("res 病人",this.patientList)
  		})
  	},
  	search(){
  		this.getPatientList(1,this.searchWord)
  	},
  	pageDesc(val){
  		this.getPatientList(val)
  	}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>

.patient-container{
  margin:0 auto;
  .el-table{
    font-size:30px;
    font-weight:600;
    margin:0 auto;
    max-width:840px!important;

    .el-table-column{
      line-height: 30px;
    }
  }


  .el-table .cell{
    line-height: 30px;
  }

  .patient-search-wrapper{
    text-align: center;
  }
  .medicine-modify,.medicine-delete{
    font-size: 30px;
  }

  .patient-search{
    margin:0 auto;
    margin-bottom:20px;
    margin-left:-350px;
  }

  .el-pagination{
    text-align: center;
  }

}
.patient-table{
  max-width:840px!important;
}

</style>
