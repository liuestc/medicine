import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/login/login'
import Main from '@/main/main'
import AllIn from '@/allIn/allIn'
import Today from '@/today/today'
import Patient from '@/patient/patient'
import Record from '@/record/record'
import Data from '@/data/data'
import AddPatient from '@/addPatient/addPatient'
import Diagnosis from "@/diagnosis/diagnosis"
import Diagnosis2 from "@/diagnosis2/diagnosis2"
import Answer from '@/answer/answer'
import Answer2 from '@/answer2/answer2'
import MedicineDoc from '@/medicineDoc/medicineDoc'
import Inquiry from '@/inquiry/inquiry'
import Inquiry2 from '@/inquiry2/inquiry2'
import Prescripton from '@/prescription/prescription'
import Prescripton2 from '@/prescription2/prescription2'
import Print from '@/print/print'
import Home from '@/home/home'

Vue.use(Router)

let vewRouter =new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      name:'main',
      path:"/main/",
      component:Main,
      children:[
      	// {
	      // 	path:'',
	      // 	name:'allIn',
	      // 	component:AllIn      		
      	// },
      	{
      		path:'today',
      		name:'today',
      		component:Today
      	},
      	{
      		path:'patient',
      		name:'patient',
      		component:Patient
      	},
      	{
      		path:'record',
      		name:'record',
      		component:Record
      	},
      	{
      		path:'data',
      		name:'data',
      		component:Data
      	},
      	{
      		path:'addPatient',
      		name:'addPatient',
      		component:AddPatient
      	},
      	{
      		path:'diagnosis/:patientId/:inquiryId',
      		name:'diagnosis',
      		component:Diagnosis
      	},
      	{
      		path:'answer/:patientId/:inquiryId',
      		name:'answer',
      		component:Answer
      	},
        {
          path:'answer2/:patientId/:inquiryId',
          name:'answer2',
          component:Answer2
        },
        {
          path:'inquiry/:patientId/:inquiryId',
          name:'inquiry',
          component:Inquiry,
          beforeUpdate:(to,from,next)=>{
            console.log("to",to)
            console.log("from",from)
            next()
            // if(to.name!=="prescription"&&from.name=='inquiry'){
            //   // confirm("信息未保存，确认离开?")
            //   console.log("to",to)
            //   console.log("from",from)
            //   next()
            // }
            // else{
            //   next()
            // }
          }
        },
        {
          path:'inquiry2/:patientId/:inquiryId',
          name:'inquiry2',
          component:Inquiry2
        },
        {
          path:'medicineDoc/:patientId/:inquiryId',
          name:'medicineDoc',
          component:MedicineDoc
        },
        {
          path:'diagnosis2/:patientId/:inquiryId',
          name:'diagnosis2',
          component:Diagnosis2
        },
        {
          path:'prescription/:patientId/:inquiryId',
          name:'prescription',
          component:Prescripton
        },
        {
          path:'prescription2/:patientId/:inquiryId',
          name:'prescription2',
          component:Prescripton2
        },
        {
          path:'home',
          name:'home',
          component:Home
        } 

      ]
    },
    {
      name:"print",
      path:'/print/:inquiryId/:patientId',
      component:Print
    }
  ]
})

vewRouter.beforeEach((to,from,next)=>{
  let nextRoute=['home','patient']
  // add 时 from.name=addPatiemt to.name!==today
  // if(to.name=="home"){
  //   alert("首页")
  // }
  next()
})

export default vewRouter