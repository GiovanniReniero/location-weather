 // this the executor

function autoComplete ({root, getApiData, inputValue, optionSelect}) {

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
        option.innerHTML = inputValue(item)
        option.addEventListener("click", ()=>{
          dropdown.classList.remove("is-active")
          optionSelect(item)
        })
        if (option.innerHTML){
          laCarte.appendChild(option)
        }
      }
      document.addEventListener("click", (evt) => {
        console.log(evt)
        if(!root.contains(evt.target)){
          dropdown.classList.remove("is-active")
          // console.log(input.value);
          input.value="";
          laCarte.innerHTML = "";
        }
      })
  })

  input.addEventListener("input", debounce(onInput))

}