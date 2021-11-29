//this is the configurator
//access_token: pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA
// APIKey: e2385a70454648afea5442d6b04eea8a

const autoCompleteConfig = ({
  async getApiData (eventData) {
    const results = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${eventData}.json?`, {
      params: {
        access_token: "pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA"
      }
    })
    return results.data.features;
  },

  renderOption(item){
    if(item.place_type.includes("place")||item.place_type.includes("locality")) {
      return `
        <h2>${ item.place_name }</h2>
        `;
    }
    else{
      return ``;
    }
  },
})


autoComplete ({
  ...autoCompleteConfig,
  root: document.querySelector("#leftAutocomplete"),
  inputValue(item){
    document.querySelector(".tutorial").classList.add("is-hidden");
    const summaryElement = document.querySelector("#leftSummary")
    onPlaceSelect(item, summaryElement)
  }
});

autoComplete ({
  ...autoCompleteConfig,
  root: document.querySelector("#rightAutocomplete"),
  inputValue(item){
    document.querySelector(".tutorial").classList.add("is-hidden");
    const summaryElement = document.querySelector("#rightSummary")
    onPlaceSelect(item, summaryElement)
  }
});

 const onPlaceSelect = async (item, summaryElement) => {
   const results = {};
   results.name = item.place_name;
   results.boundingBox = item.bbox;
   const long = item.center[0];
   const lat = item.center[1];
   results.long = long;
   results.lat = lat;
   
  const tempo = await axios.get("https://api.openweathermap.org/data/2.5/weather?", {
     params:{
          lon:long,
          lat: lat,
          appid: "e2385a70454648afea5442d6b04eea8a",
          units: "metric",
     }
    })
    console.log(tempo.data)
    results.wethDescription = tempo.data.weather[0].description.toUpperCase();
    results.temp = tempo.data.main.temp;
    results.feelsLike = tempo.data.main.feels_like
    results.humidity = tempo.data.main.humidity;
    results.visibility = tempo.data.visibility;
    // results.timeZone = tempo.data.timeZone;
    
    console.log(results)
    summaryElement.innerHTML = costomPlaceTemplate(results) //can extract if passed on as an argument
}
  

costomPlaceTemplate = (results) => {
  const {name, long, lat, boundingBox, wethDescription, temp, feelsLike, humidity, visibility } = results
  
  console.log(name, long, lat, boundingBox, wethDescription, temp, feelsLike, humidity, visibility)  
  
  return `
    <div class="mapBox"
      <h1>${name}</h1>
      <h1>Long: ${long}; Lat: ${lat} </h1>
      <br>
      <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${boundingBox[0]}, ${boundingBox[1]}, ${boundingBox[2]}, ${boundingBox[3]}]/400x400?access_token=pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA"/>
    </div>

    <div class="weather"
      <h1>${wethDescription}</h1>
      <h1>Current temperature ${temp} deg. C</h1>
      <h1>Feels like ${feelsLike} deg. C</h1>
      <h1>Humidity ${humidity}%</h1>
      <h1>Visibility ${visibility}m</h1>
    </div>
    `;
}