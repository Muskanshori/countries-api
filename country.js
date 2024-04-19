const countryName = new URLSearchParams(location.search).get('name')
const countryDetails = document.querySelector(".country-details")

const backButton = document.querySelector(".back-btn")
backButton.addEventListener("click",()=>{
    history.back()
})

const darkMode = document.querySelector(".dark-mode-btn")
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





console.log(countryName)
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then((data)=>{
    // console.log(data[0])
    let country = data[0]
    countryDetails.innerHTML=`
        <img src= "${country.flags.svg}" alt="${countryName} flag">
        <div class="details-text-container">
            <h1>${countryName} </h1>
            <div class="details-text">
                <p><b>Native Name :</b> &nbsp;&nbsp;${country.name.nativeName? Object.values(country.name.nativeName)[0].common: countryName}</p>
                <p><b>population :</b>&nbsp;&nbsp; ${country.population.toLocaleString('en-IN')} </p>
                <p><b>Region:</b>&nbsp;&nbsp; ${country.region}</p>
                <p><b>Sub Region :</b>&nbsp;&nbsp; ${country.subregion}</p>
                <p><b>Capital :</b>&nbsp;&nbsp; ${country.capital}</p>
                <p><b>Top Level Domain :</b>&nbsp;&nbsp; ${country.tld}</p>
                <p><b>Currencies :</b>&nbsp;&nbsp; ${country.currencies? Object.values(country.currencies)[0].name : ""}</p>
                <p><b>Languages :</b>&nbsp;&nbsp; ${Object.values(country.languages)}</p>
            </div>
            <div class="border-countries">
                <b> Border Countries :</b>
            </div>
        </div>
    `
    
    const borderCountries = document.querySelector(".border-countries")
    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json())
            .then(([borderCountry])=>{
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href=`country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })     
        });
    }


})


