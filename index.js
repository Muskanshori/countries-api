const countryContainer = document.querySelector(".country-container");
const filterByRegion = document.querySelector(".filter-container");
const searchInput= document.querySelector(".search-container")
const darkMode = document.querySelector(".dark-mode-btn")

let allCountriesData;


darkMode.addEventListener("click",()=>{
    let body = document.body
    console.log(darkMode)

    if(body.className === "dark"){
        body.classList.remove("dark")
        darkMode.innerHTML=`<p class="dark-mode-btn"><i class="fa-solid fa-sun"></i> &nbsp;&nbsp;Light Mode</p>`
    }else{
        body.classList.add("dark")
        darkMode.innerHTML=`<p class="dark-mode-btn"><i class="fa-regular fa-moon"></i> &nbsp;&nbsp; Dark Mode</p>`
    }    
})

function renderCards(data) {
    countryContainer.innerHTML = " "; // empty because of previous fetch data
    data.forEach((country) => {
        // console.log(country);
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`;

        countryCard.innerHTML = `
                <img  src= ${country.flags.svg} alt="${country.name.common
            } flag" />
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p><b>population: </b> ${country.population.toLocaleString(
                "en-IN"
            )}</p>
                    <p><b>region : </b> ${country.region}</p>
                    <p><b>capital : </b>${country.capital}</p>
                </div>
            `;

        countryContainer.append(countryCard);
    });
}


fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data)=>{
        renderCards(data) 
        allCountriesData = data
    });

searchInput.addEventListener("input",(e)=>{
    console.log(e.target.value)
    // console.log(allCountriesData)
    let searchedCountry = allCountriesData.filter((country)=>country.name.common.includes(e.target.value))
    // console.log(searchedCountry)
    renderCards(searchedCountry)
})


filterByRegion.addEventListener("change", (e) => {
    // console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) =>res.json())
    .then(renderCards);
});

