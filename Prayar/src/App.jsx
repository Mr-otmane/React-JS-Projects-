 import { useEffect, useState } from "react"
 import Prayer from "./components/Prayer"
function App() {
  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateTime , setDateTime] = useState("")
  const [city , setCity] = useState("Cairo")
  const cities = [
    {name : "القاهرة" , value:"Cairo" },
    {name : "الإسكندرية" , value:"Alexandria" },
    {name : "الجيزة" , value:"Giza" },
    {name : "المنصورة" , value:"Mansoura" },
    {name : "أسوان" , value:"Aswan" },
    {name : "الأقصر" , value:"Luxor" },
  ]
  console.log(city);
  console.log(setCity);
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try{
        const response = await fetch ('https://api.aladhan.com/v1/timingsByCity/03-09-2025?city=Eg&country=${city}')
        const data_Prayar = await response.json()
        setPrayerTimes(data_Prayar.data.timings)
        setDateTime(data_Prayar.data.date.gregorian.date)
        console.log(data_Prayar.data.date.gregorian.date);
      }catch(error){
        console.error(error)
      }
    }
    fetchPrayerTimes()
  },[city])
  const formatTimes = (time) => {
    if(!time){
      return"00:00"
    }
    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}${perd}`
  }
  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id=""onChange={(e) => (e.target.value)}>
             {cities.map((city_Obj) => (
              <option key={city_Obj.value} value={city_Obj.value}>{city_Obj.name}</option>
             )) }
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>03-02-2025</h4>
             <h4>{dateTime}</h4> 
          </div>
        </div>
     <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
       <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
      <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}/>
      <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
      <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/> 
      </div>
    </section>
  )
}
export default App
