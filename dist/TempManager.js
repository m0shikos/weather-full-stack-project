class TempManager{
    constructor(renderer){
        this.cityData = []
        this.renderer = renderer
    }
    
    getDataFromDB(){
       
        $.get(`/cities`, (data) => {
            let tempArr = this.cityData.filter(c => c.displaySave == "inline-block" && c.name != cityName)
            this.cityData = []
            this.cityData = tempArr
            data[0] != undefined ? this.cityData.unshift(...data) : null
            this.renderer.renderData(this.cityData)
        })
    }

async getCityData(cityName){
       let result = await $.get(`/city/${cityName}`)
       let city = {
        name : result.location.name,
        updatedAt : result.current.last_updated,
        temperature : result.current.temp_c,
        condition : result.current.condition.text,
        conditionPic : result.current.condition.icon,
        displaySave : "inline-block",
        displayDelete : "none"
       }
       this.cityData.push(city)
       this.renderer.renderData(this.cityData)
    }

    saveCity(cityName){
       let cityObj = this.cityData.find(c => c.name == cityName)
        $.post(`/city` ,cityObj , (data) => {
            let tempArr = this.cityData.filter(c => c.displaySave == "inline-block" && c.name != cityName)
            this.cityData = []
            this.cityData = tempArr
            this.getDataFromDB() 
        })

    }
    removeCity(cityName){
            $.ajax({
                url: `city/${cityName}`,
                method: "DELETE",
                success:response => {
                  
                }
            })
            let tempArr = this.cityData.filter(c => c.displaySave == "inline-block" && c.name != cityName)
            this.cityData = []
            this.cityData = tempArr
            this.getDataFromDB() 
        }

    updateCity(cityName){
        $.ajax({
            url: `city/${cityName}`,
            method: "PUT",
            success:response => {
                this.getDataFromDB() 
            }
        })
    }
        
}