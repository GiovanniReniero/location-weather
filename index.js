//this is the configurator
//access_token: pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA


autoComplete ({

  root: document.querySelector("#autocomplete"),

  async getApiData (eventData) {
    const results = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${eventData}.json?`, {
      params: {
        access_token: "pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA"
      }
    })
    // console.log(results.data.features)
    return results.data.features;
  },

  inputValue(item){
    if(item.place_type.includes("place")){
      return `
        <h2>${ item.place_name }</h2>
        `;
    }
    else{
      return ``;
    }
    
  },

  optionSelect(item){
    console.log("Hellofrom :", item)
  }
  
})