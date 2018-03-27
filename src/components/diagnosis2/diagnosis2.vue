<template>
  <div class='diagnosis-container'>
    <div class='diagnosis-basic-info'>
      <ul class='diagnosis-info-wrapper'>
        <li>{{otherInfo.inquiry_type}}</li>
        <li>第{{otherInfo.times}}次</li>
        <li>{{patientInfo.姓名}}</li>
        <li>{{patientInfo.性别}}</li>
        <li>{{patientInfo.年龄}}</li>
        <li>{{patientInfo.居住地}}</li>
        <li>{{patientInfo.民族}}</li>
        <li>{{patientInfo.职业}}</li>
        <li>{{patientInfo.婚姻}}</li>
        <li>{{patientInfo.身高体重}}</li>
      </ul>
    </div>
    <p class='diagnosis-basic-word'>基本信息  <el-button @click="showContent = !showContent">折叠</el-button></p>
    <el-collapse-transition>
      <div class="diagnosis-info-content" v-show='showContent'>
        <p>吸烟史：{{patientInfo.吸烟史}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;饮酒史：{{patientInfo.饮酒史}}</p>
        <p>输血史：{{patientInfo.输血史}}</p>
        <p>手术史：{{patientInfo.手术史}}</p>
        <p>接触史：{{patientInfo.接触史}}</p>
        <p>生育史：{{patientInfo.生育史}}</p>
        <p>月经史：{{patientInfo.月经史}}</p>
        <p>传染病史：{{patientInfo.传染病史}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;遗传病史：{{patientInfo.遗传病史}}</p>
        <p>过敏物：{{patientInfo.过敏物}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特殊饮食习惯：{{patientInfo.特殊饮食习惯}}</p>
      </div>
    </el-collapse-transition>

  <el-table :data='inquiryList' stripe border  :header-row-style='{background:"rgb(229,233,242)",color:"#475669"}' class='diagnosis-table-index1'>
      <el-table-column prop='inquiryDate' label='问诊时间'></el-table-column>
      <el-table-column prop='times' label='问诊次数'></el-table-column>
    </el-table>

  <div class="pagination-style add-patient-page1">
    <el-pagination
        @current-change="pageDesc"
        :page-size="2"
      layout="prev, pager, next,jumper"
      :total="inquiryPage*1">
    </el-pagination>
  </div>

  <p class='diagnosis-basic-word'>检查指标</p>
  <el-button @click='addInspect' type='primary' class='add-exam-btn'>新增</el-button>
  <div class="diag-inspect-wrapper">
    <div class="inspect-content" v-for='(item,index) in inspectionList'>
      <p class='inspect-content-title'>
        <span>检查时间：</span><span class='blue'>{{item.idexDescription.time}}</span> <span>检查医院：</span><span class='blue'>{{item.idexDescription.hospital}}</span>
      </p>
      <ul class='check-item'>
        <li v-for='check  in item.idexDescription.checkIndex'>         
          <p>{{check.normal}}</p>
          <p class='blue'>{{check.check}}</p>
        </li>
      </ul>
      <p class='inspect-btn'><el-button  type='primary' @click='editInspect(item,index)'>编辑</el-button></p>
      <p class='inspect-btn'><el-button  type='primary' @click='deleteExam(item,index)'>删除</el-button></p>
    </div>
  </div>
  


  <p class='diagnosis-basic-word'>此次问诊</p>
  <!-- <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 30}" placeholder="请输入内容" ></el-input> -->
  <el-button type='primary' class='diagnosis-edit-btn' @click='goAnswer'>编辑</el-button>

  <p class='diagnosis-add-img'>
    <el-upload
      action="/api/picture/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :data='upParams'
      :file-list="fileList"
      name='picture'>
      <i class="el-icon-plus"></i>
    </el-upload>
  </p>

    <el-dialog title="就医记录" :visible.sync="dialogFormVisible">
      <el-form :model="inspectionIndexList">
        <el-form-item label="检查时间" :label-width="formLabelWidth">
            <el-date-picker  v-model="inspectionIndexList.time"  type="date"  placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
        </el-form-item>
        <el-form-item label="检查医院" :label-width="formLabelWidth">
            <el-input v-model="inspectionIndexList.hospital" auto-complete="off"></el-input>
        </el-form-item>
        <div class="diag-input-wrapper" v-for='item in 7'>
          <el-form-item :label='"指标"+item' :label-width="formLabelWidth"  >
              <el-input  auto-complete="off"  v-model="inspectionIndexList.normal[item-1]" placeholder='项目名/正常指标'></el-input>
          </el-form-item>
          <el-form-item  :label-width="formLabelWidth"  >
              <el-input  auto-complete="off" placeholder='检查指标' v-model="inspectionIndexList.check[item-1]"></el-input>
          </el-form-item>          
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInspect">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible6">
      <img width="100%" :src="dialogImageUrl" alt="">
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
      inspectPage:'',
      fileList:[],
      showContent:false,
      historyList:[],
      dialogImageUrl: '',
      imageUrl:'',
      msg: '',
      patientId:"",
      inspectPages:'',
      form:{},
      patientBasicDesc:"",
      inspectionList:[],
      dialogFormVisible:false,
      dialogVisible6:false,
      inspectionIndexList:{
        hospital:"",
        time:"",
        normal:[],
        check:[]

      },
      formLabelWidth:"180px",
      inquiryList:[],
      inquiryPage:"",
      patientInfo:{},
      otherInfo:{},
      // checkIndexList:[],
      checkIndexList:[{
        hospital:"xx医院",
        time:"2014-01-14",
        checkIndex:[{
          normal:"黑细胞/340",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        }]
      },
      {
        hospital:"xx医院",
        time:"2014-01-14",
        checkIndex:[{
          normal:"黑细胞/340",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        },{
          normal:"黑细胞/34",
          check:"23"
        }]
      }]
    }
  },
  computed:{

  },
  methods:{

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible6 = true;
    },

    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      console.log(this.upParams)
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
    },

    getImgList(n){
      axios.get('/api/picture/getPictureList',{
        params:{
          inquiryId:this.inquiryId,
          pageNum:n,
          pageRow:5
        }
      }).then((res)=>{
        console.log("图片res",res.data)
        let imgList=[]
        res.data.returnData.list.forEach((item,index)=>{
          imgList.push({
            name:item.inquiryId,
            url:item.pictureUrl
          })
        })

        console.log("imgList",imgList)
        this.fileList=imgList
      })
    },

    getInquiryList(page){
      axios.get('/api/inquiryResult/getInquiryResultList',{
        params:{
          patientId:this.patientId,
          pageRow:2,
          pageNum:page          
        }
      }).then((res)=>{
        
        this.inquiryList=res.data.returnData.list
        this.inquiryPage=res.data.returnData.totalCount
        console.log("this.inquiryList",this.inquiryList)
      })
    },

    getOtherInfo(){
      axios.get('/api/dailyPatient/getInquiryInfo',{
        params:{
          inquiryId:this.inquiryId
        }
      }).then((res)=>{
        this.otherInfo=res.data.returnData
        console.log("otherInfo",this.otherInfo)
      })
    },

    getPatientBasicDes(){
      axios.get("/api/patient/getDescription",{
        params:{
          patientId:this.patientId
        }
      }).then((res)=>{
        console.log(res.data.returnData)
        let patientInfo=res.data.returnData.patientInfo
        this.patientInfo=patientInfo
        this.upParams.patientName=patientInfo.姓名
        console.log("patientInfo",patientInfo)
        console.log("patientName",this.patientName)
        // let strDesc=res.data.returnData.description.split("，").join("\n")
        // this.patientBasicDesc=strDesc
      })
    },
    getInspectionIndex(){
      axios.get('/api/inspectionIndex/getInspectionIndex',{
        params:{
          patientId:this.patientId,
          pageNum:1,
          pageRow:3
        }
      }).then((res)=>{
        this.inspectionList=res.data.returnData.list
        this.inspectionTotalPage=res.data.returnData.totalPage
      })
    },
    addInspect(){
      console.log("inspectionIndexList",this.inspectionIndexList)
      this.inspectionIndexList={
        hospital:"",
        time:"",
        normal:[],
        check:[]

      }
      this.dialogFormVisible=true
    },
    saveInspect(id){
      console.log("inspectionIndexList",this.inspectionIndexList)

      //封装数据格式
      let normal=this.inspectionIndexList.normal
      let check=this.inspectionIndexList.check
      let checkIndex=[]
      normal.forEach((item,index)=>{
        checkIndex.push({
          normal:item,
          check:check[index]
        })
      })

      console.log("checkIndex",checkIndex)
      // let checkIndexList=[]
      let sendInspect={
        hospital:this.inspectionIndexList.hospital,
        time:this.inspectionIndexList.time,
        checkIndex:checkIndex        
      }

      console.log("this.checkIndexList",sendInspect)
      axios.post("/api/inspectionIndex/addInspectionIndex",{
          patientId:this.patientId*1,
          idexDescription:JSON.stringify(sendInspect),
          idxId:this.idexId
        }
      ).then((res)=>{
        console.log(res)
        if(res.data.returnCode==200){
          this.dialogFormVisible=false
          this.getInspectionIndex()
        }
        else{
          alert(res.data.returnMsg)
        }
      })
    },
    getInspectionIndex(){
      axios.get("/api/inspectionIndex/getInspectionIndex",{
        params:{
          patientId:this.patientId,

        }
      }).then((res)=>{
        // 赋值给表格
        console.log("resReturnData",res)
        this.inspectionList=res.data.returnData.indexList
        this.inspectionList.forEach((item,index)=>{
          item.idexDescription=JSON.parse(item.idexDescription)
        })
        console.log("inspectionList",this.inspectionList)
      })
    },
    handleCurrentChange(val){
      console.log(val)
    },
    pageDesc(val){
      console.log(val)
      this.getHistoryIndex(val)
    },
    pageList(val){
      console.log(val)
      this.getHistoryIndex(val)
    },
    deleteExam(row){
      axios.delete('/api/inspectionIndex/deleteInspection',{
        params:{
          indexId:row.idexId
        }
      }).then((res)=>{
        if(res.data.returnCode==200){
          console.log("删除成功")
          this.getInspectionIndex()
        }
      })
    },
    goAnswer(){     
      this.$router.push({
        name:"inquiry2",
        params:{
          patientId:this.patientId,
          inquiryId:this.inquiryId
        }
      })
    },
    editInspect(item,index){
      console.log(item,index)
      this.dialogFormVisible=true
      let idexId=item.idexId
      this.idexId=idexId
      console.log("idexId",this.idexId)
      let normal=[]
      item.idexDescription.checkIndex.forEach((item,index)=>{
        normal.push(item.normal)
      })
      let check=[]
      item.idexDescription.checkIndex.forEach((item,index)=>{
        check.push(item.check)
      })

      this.inspectionIndexList={
        hospital:item.idexDescription.hospital,
        time:item.idexDescription.time,
        normal:normal,
        check:check
      }
    },
    getHistoryIndex(num){
      axios.get("api/inquiryResult/getInquiryResultList",{
        params:{
          patientId:this.patientId,
          pageRow:2,
          pageNum:num
        }
      }).then((res)=>{
        this.historyList=res.data.returnData.list
        this.totalCount=res.data.returnData.totalCount
        console.log("this.historyList",this.historyList)
      })
    }


  },
  created(){
    let patientId=this.$route.params.patientId
    let inquiryId=this.$route.params.inquiryId
    this.patientId=patientId
    this.inquiryId=inquiryId
    this.getInspectionIndex()
    this.getPatientBasicDes()
    this.upParams={
      inquiryId:this.inquiryId,
      patientId:this.patientId,
      patientName:this.patientName
    }
    console.log("upParams",this.upParams)
    this.getInquiryList(1)
    this.getOtherInfo()
    this.getHistoryIndex(1)

    this.getImgList(1)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .diagnosis-container{
    padding:40px 120px;
    .el-textarea{
      font-size:20px;
      // max-width: 500px;
    }
    .diagnosis-basic-word{
      margin-bottom:10px;
      margin-top:40px;
      font-size: 30px;
    }
    .diagnosis-table-index1{
      margin-top: 20px;
    }

    .diagnosis-info-content{
      border:1px solid #C0CCDA ;
      height:400px;
      overflow-y: scroll;
      padding:40px;
      font-size: 30px;
      font-weight: 400;
    }

    .diag-inspect-wrapper{
      .inspect-content{
        padding:20px;
        border:1px solid #C0CCDA;
        margin-top:20px;
        .inspect-content-title{
          font-size:28px;
          padding:20px;
          border-bottom:2px solid #C0CCDA;
          .blue{
            font-size: inherit;
          }
        }

        .check-item{
          list-style: none;
          width:100%;
          font-size: 20px;
          li{
            display: inline-block;
            width:30%;
            padding:10px 30px;
            box-sizing: border-box;
            font-weight: 600;
            p{
              line-height: 1.5;
              cursor: default;
            }
          }
        }
        .inspect-btn{
          text-align: right;
          display: inline-block;
          margin: 10px;
          .el-buttom{
            color:blue;
          }
        }

      }
    }


  }

  .diagnosis-edit-btn{
    margin-top:20px;
  }
  .diagnosis-margin-top{
    margin-top:20px;
  }
  .add-png{
    width:66px;
    height:66px;
    vertical-align: middle;
    cursor: pointer;
  }

  .dianosis-blue{
    color:#20A0FF ;
    font-size: 14px;
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
    margin-left:20px;
  }

  .diagnosis-bottom-btn{
    margin:0 auto;
    margin-top:50px;
    text-align: center;
  }
  .add-exam-btn{
    margin-top:20px;
  }

  .diagnosis-add-img{
    margin-top:30px;
  }

  .diagnosis-info-wrapper{
    font-size: 0;
    li{
      font-size: 30px;
      display: inline-block;
      padding:0 30px;
      border:1px solid #E0E6ED;
      border-right:none;
      height:78px;
      box-sizing: border-box;
      line-height: 78px;
    }

    li:last-child{
      border-right:1px solid #E0E6ED;
    }

  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }


  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409EFF;
  // }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  //   text-align: center;
  // }
  // .avatar {
  //   width: 178px;
  //   height: 178px;
  //   display: inline-block;
  // }

</style>
