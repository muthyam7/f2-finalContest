const cityArray=[];
async function getdata(url){
  try{
    
    let response=await fetch(url)
     let data =await response.json();

    // console.log(data)
     showdata(data)
  }
  catch(error){
    window.alert("city not found")
    throw error

  }
}


let element=document.getElementById("inputss")
element.addEventListener("click",()=>{    

    let input=document.getElementById("inner")
    
    input.focus()
})


const addbtn=document.getElementById("btn")
 addbtn.addEventListener("click", async (event)=>{
  event.preventDefault();
    // console.log("entered")
     const inputElement = document.getElementById('inner');
         var inputValue = inputElement.value.trim();
         let url=`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=b819b0c5e7a853a6d272db9a6f04b4d5`;
        // console.log(url)
        inputValue=inputValue.toLowerCase();
        if(inputValue=="" || undefined){
        window.alert("enter city name")
        return;
        }
        if(cityArray.indexOf(inputValue)==-1 ){
          for(let i=0;i<cityArray.length;i++){
            if(cityArray[i].includes(inputValue)){
            window.alert("this city already added")
            return;
            }
            
          }
      await getdata(url)
      // Sort the cityArray based on temperature after adding the city
    cityArray.sort((city1, city2) => {
      //console.log(city1,"city1")
      //console.log(city2,"city1")
      const temp1 = getTemperatureByCityName(city1);
      const temp2 = getTemperatureByCityName(city2);
      return temp1 - temp2;
    });
    //console.log(cityArray,"cityArray")
    // // Display the sorted city cards based on the updated cityArray
    // //displaySortedCityCards();
   // removeAllCityCards();
  //   // // Display the sorted city cards based on the updated cityArray
    cityArray.forEach((cityName) => {
      //console.log(cityName,"sorted cities")
      const cardElement = document.getElementById(cityName);
      const cardsContainer = document.querySelector('.cards');
      if (cardElement) {
        cardsContainer.appendChild(cardElement);
      }
    });
        }
       else{
       window.alert("this city already added")
    inputElement.value = ''; // Clear the input field after submission
}
}
        
)




function showdata(data){
    const cityName = data.name.toLowerCase();
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
   // console.log(cityName,temperature)
   
    const card = document.createElement('div');
    card.className = 'card';
    card.id=cityName;

    const leftSection = document.createElement('div');
    leftSection.className = 'left';

    const temperatureHeader = document.createElement('h1');
    temperatureHeader.textContent = `${temperature}`

    const temperatureData = document.createElement('div');
    temperatureData.className='left-data'
    temperatureData.innerHTML = `
      <span>H:${data.main.temp_max}</span>
      <span>L:${data.main.temp_min}</span>
    `;

    const locationData = document.createElement('div');
    locationData.className = 'location';
    locationData.innerHTML = `
      <span>${cityName}</span>
      <span>${data.sys.country}</span>
    `;

    leftSection.appendChild(temperatureHeader);
    leftSection.appendChild(temperatureData);
    leftSection.appendChild(locationData);

    const rightSection = document.createElement('div');
    rightSection.className = 'right';

    const weatherImage = document.createElement('img');
    // weatherImage.src = data.imageUrl;
    // weatherImage.alt = data.climate;

    const climateData = document.createElement('div');
    climateData.textContent = data.weather[0].main;
    let type=climateData.textContent
    console.log("type" ,type)
    if(type.includes("Cloud") || type.includes("Haze"))
    weatherImage.src="cloud.png"
    else if(type.includes("Rain") || type.includes("Clear"))
    weatherImage.src="rain.png"
    else if(type.includes("wind") || type.includes("Mist"))
    weatherImage.src="Tornado.png"

    rightSection.appendChild(weatherImage);
    rightSection.appendChild(climateData);

    card.appendChild(leftSection);
    card.appendChild(rightSection);

    const cardsContainer = document.querySelector('.cards');
    cardsContainer.appendChild(card);
    cityArray.push(cityName.toLowerCase());
    
    
    
  }
  function getTemperatureByCityName(cityName) {
    //console.log(cityName,"cityybullllllshitttt")
    const cardElement = document.getElementById(cityName);
    //console.log(cardElement,"cardElement")
    if (!cardElement) return undefined;
    
  
    const temperatureHeader = cardElement.querySelector('.left h1');
   // console.log(temperatureHeader,"tttttttttttttttteeeeemmmmpppp")
    if (!temperatureHeader) return undefined;
  
    return parseFloat(temperatureHeader.textContent);
  }
//   function displaySortedCityCards() {
//     const cardsContainer = document.querySelector('.cards');
//     cardsContainer.innerHTML = ''; // Clear the existing cards
  
//     cityArray.forEach((cityName) => {
//       const cardElement = document.getElementById(cityName);
//       if (cardElement) {
//         cardsContainer.appendChild(cardElement);
//       }
//     });
//   }
  function removeAllCityCards() {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';
 }



