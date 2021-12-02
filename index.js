
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
    const summaryElement = document.querySelector("#leftSummary");
    onPlaceSelect(item, summaryElement);
  }
});

autoComplete ({
  ...autoCompleteConfig,
  root: document.querySelector("#rightAutocomplete"),
  inputValue(item){
    document.querySelector(".tutorial").classList.add("is-hidden");
    const summaryElement = document.querySelector("#rightSummary")
    onPlaceSelect(item, summaryElement);
  }
  
});

 const onPlaceSelect = async (item, summaryElement) => {
   const results = {};
   results.name = item.place_name;
   results.boundingBox = item.bbox;
   const long = item.center[0];
   const lat = item.center[1];
   results.long = Math.round(long * Math.pow(10, 4))/Math.pow(10, 4);
   results.lat = Math.round(lat * Math.pow(10, 4))/Math.pow(10, 4);
   
  const tempo = await axios.get("https://api.openweathermap.org/data/2.5/weather?", {
     params:{
          lon:long,
          lat: lat,
          appid: "e2385a70454648afea5442d6b04eea8a",
          units: "metric",
     }
    })
    // console.log(tempo.data)
    results.wethDescription = tempo.data.weather[0].description.toUpperCase();
    results.temp = tempo.data.main.temp;
    results.feelsLike = tempo.data.main.feels_like
    results.humidity = tempo.data.main.humidity;
    results.visibility = tempo.data.visibility;
    // results.timeZone = tempo.data.timeZone;
    
    // console.log(results)
    summaryElement.innerHTML = costomPlaceTemplate(results) //can extract if passed on as an argument
    reset();
  }

costomPlaceTemplate = (results) => {
  const {name, long, lat, boundingBox, wethDescription, temp, feelsLike, humidity, visibility } = results

  // console.log(name, long, lat, boundingBox, wethDescription, temp, feelsLike, humidity, visibility)  
  
  return `
    <div class="mapBox"
      <h1 id="name"><strong>${name}</strong></h1>
      <h1 id="long-lat"><strong>Long:</strong> ${long} deg.; <strong>Lat:</strong> ${lat} deg.</h1>
      <br>
      <img id="mappa" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${boundingBox[0]}, ${boundingBox[1]}, ${boundingBox[2]}, ${boundingBox[3]}]/400x400?access_token=pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA"/>
    </div>
    <br>

    <div class="weather"
      <h1 id="weather-description">${wethDescription}</h1>
      <h1 id="current-temp">Current temperature ${temp} deg. C</h1>
      <h1 id="feels-like">Feels like ${feelsLike} deg. C</h1>
      <h1 id="humidity">Humidity ${humidity}%</h1>
      <h1 id="visibility">Visibility ${visibility}m</h1>
      <button class="button is-primary title is-3 is-hidden"> Reset </button>
    </div>

    `;
}

const reset = () => {
  const leftSummary=document.querySelector("#leftSummary");
  const rightSummary= document.querySelector("#rightSummary");
  const button= document.querySelector("#button");
  const input = document.querySelector(".input");
  const laCarte = document.querySelector(".dropdown-content");


  if ( (leftSummary.innerHTML) && (rightSummary.innerHTML) ){
    button.classList.remove("is-hidden");
    button.addEventListener("click", () => {
      console.log("Smash it!")
      leftSummary.innerHTML="";
      rightSummary.innerHTML="";
      input.value="";
      laCarte.innerHTML = "";
      button.classList.add("is-hidden");
      document.querySelector(".tutorial").classList.remove("is-hidden")     
  })
 }
}