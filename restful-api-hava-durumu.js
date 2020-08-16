// BİSSMİLLAHİRRAHMANİRRAHİM

let searchBox = document.getElementById("city");
let searcIcon = document.getElementById("search");
let errorsec = document.getElementById("errorsec")
// API işlemleri

class api {
    constructor() {
        this.clientid = "";
        this.clientSecret = "";
    }
    async getCity(cityName) {   // Buradaki parametreyi arama butonuna yazdıgımız yazıyla ilişkilendireceğiz
        let data = await fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=0d07201324134f19a0b130218202807&q=${cityName}&format=json&num_of_days=5`).catch(err=>console.log(err));
        data = await data.json();       // Bu data.json() 'u kullanabilmek içinde bir tane daha then yada await kullanmak gerekiyor, sadece then yaptınmı yetiyor
        return data
    }
}


// UI işlemleri

class UI {
    constructor() {
        this.celcius = document.querySelector(".celcius-info");
        this.durum = document.querySelector(".durum-info");
        this.saat = document.querySelector(".saat-info")
    }
    displaytoUI(inf) {      // BURAYI HALLET
        if(inf.error){
            this.clear();
            errorsec.innerHTML = `${inf.error[0].msg}`
            console.log(inf.error[0].msg);
        }
        else {
            this.clear()
            this.saat.textContent = inf.current_condition[0].observation_time;
            this.celcius.textContent = inf.current_condition[0].temp_C;
            this.durum.textContent = inf.current_condition[0].weatherDesc[0].value;
        }
    }
    clear() {
        this.saat.textContent = "";
        this.celcius.textContent = "";
        this.durum.textContent = "";
        errorsec.innerHTML = ""
    }
}



searcIcon.addEventListener("click",()=>{
    let text = searchBox.value;
    let data = new api();
    data.getCity(text).then(res=>{
        console.log(res.data)
        let ui = new UI();
        ui.displaytoUI(res.data)
    });
})