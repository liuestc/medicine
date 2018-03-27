import axios from 'axios'

function getDailyPatient(){
	axios.get("/api/dailyPatient/getDailyPatient",{
		params:{
			pageNum:0,
			pageRow:16
		}
	}).then((res)=>{
		console.log(this)
		//  vue 中引入外部函数
		this.patientList=res.data.returnData.list
	})
}

export {
	getDailyPatient as todayPatient
}