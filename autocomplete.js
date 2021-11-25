// this the executor

function autoComplete ({root, getApiData, inputValue}) {

  console.log("Hello")
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

  const onInput =  (async (evt) => {
    const items = await getApiData(evt.target.value)
    dropdown.classList.add("is-active")
    for(let item of items){
      const element = document.createElement('a')
      element.innerHTML = inputValue(item)
      element.classList.add("dropdown-item")
    }
  })

  input.addEventListener("input", onInput)

}