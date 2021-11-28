 // this the executor

function autoComplete ({root, getApiData, renderOption, inputValue}) {

  root.innerHTML = 
     `
    <label><b>Search</b><label>
    <input class="input"></>
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content">
          </div>
        </div>
      </div>
    
    `;

  const input = root.querySelector(".input");
  const dropdown = root.querySelector(".dropdown");
  const laCarte = root.querySelector(".dropdown-content");
  const container = document.querySelector(".container");

  const onInput =  (async (evt) => {
    const items = await getApiData(evt.target.value)
    if(!items.length){
      console.log("No Items Found")
      dropdown.classList.remove("is-active")
      return
    }
    dropdown.classList.add("is-active")
    for(let item of items){
      const option = document.createElement("a")
     
      option.classList.add("dropdown-item")
      option.innerHTML = renderOption(item)
 
      option.addEventListener("click", ()=>{
        dropdown.classList.remove("is-active")
        let results = inputValue(item)
     
        console.log("Hi this is from Autocomplete", results) 
      })
      if (option.innerHTML){
        laCarte.appendChild(option)
      }
    }
    document.addEventListener("click", (evt) => {
      if(!root.contains(evt.target)){
        dropdown.classList.remove("is-active")
        input.value="";
        laCarte.innerHTML = "";
      }
    })
  })

  input.addEventListener("input", debounce(onInput))

}