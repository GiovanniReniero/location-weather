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

  inputValue(item){
    document.querySelector(".tutorial").classList.add("is-hidden");
    const summaryElement = document.querySelector("#autocomplete")
    onPlaceSelect(item, summaryElement)
  }

});

 function onPlaceSelect (item, summaryElement) {
  console.log(item)
  const results = {};
  results.name = item.place_name;
  results.boundingBox = item.bbox;
  const long = item.center[0];
  const lat = item.center[1];
  results.long = long;
  results.lat = lat;

  // const map = await axios.get( `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${long},${lat})/${long},${lat}/400x400?`, {
  // const map = await axios.get( `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${boundingBox}/400x400?`, {
    // params: {
      // access_token: "pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA",
      // bbox: boundingBox,
      // width: 400,
      // height: 400,
      // lon: coords[0],
      // lat: coords[1],
      // zoom: 9,
    // }
  // })
  // results.map = map.data
  
  summaryElement.innerHTML = costomPlaceTemplate(results) //can extract if passed on as an argument
  
}


costomPlaceTemplate = (results) => {
  const {name, long, lat, boundingBox} = results
  console.log(name, long, lat, boundingBox)
  return `
    <h1>${name}</h1>
    <h1>${long}</h1>
    <h1>${lat}</h1>
    <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${boundingBox[0]}, ${boundingBox[1]}, ${boundingBox[2]}, ${boundingBox[3]}]/400x400?access_token=pk.eyJ1IjoiZ2lvcmVuIiwiYSI6ImNrb3F4b2piMjB6djIyeW51MXRrNDlibnAifQ.Xrh4UH-0RwRGCRPRxl-EpA"/>
    `;
}