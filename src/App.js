import React from 'react';
import Weather from './component/weatherapp';
import Form from './component/form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

import './App.css';


const API_key="5b050a079847dc70cb6ebad5d59df1d2";

class App extends React.Component{
constructor(){
  super();
  this.state={
    city: undefined,
    country: undefined,
    icon:undefined,
    celcius:undefined,
    temp_min:undefined,
    temp_max:undefined,
    description:"",
    error:false
  };


  this.weatherIcon={
    Thunderstorm:"wi-thunderstorm",
    Drizzle:"wi-drizzle",
    Rain:"wi-rain",
    Snow:"wi-snow",
    Clear:"wi-day-sunny",
    Clouds:"wi-day-fog"
  };
}

get_WeatherIcon(icons,rangeID){
switch (true){
  case rangeID>=200&&rangeID<=232:
  this.setState({icon:this.weatherIcon.Thunderstorm});

  break;
  case rangeID>=300&&rangeID<=321:
  this.setState({icon:this.weatherIcon.Drizzle});
  break;
  case rangeID>=500&&rangeID<=531:
  this.setState({icon:this.weatherIcon.Rain});
  break;
  case rangeID>=600&&rangeID<=622:
  this.setState({icon:this.weatherIcon.Snow});
  break;
  case rangeID>=701&&rangeID<=781:
  this.setState({icon:this.weatherIcon.Atmosphere});
  break;
  case rangeID>=801&&rangeID<=804:
  this.setState({icon:this.weatherIcon.Clouds});
  break;
  default:
  this.setState({icon:this.weatherIcon.Clouds});
}
}


calCelcius(temp){
  let cell=Math.floor(temp-273.15);
  return cell;
}
getWeather=async(e)=>{
  e.preventDefault();
  const city=e.target.elements.city.value;
  const country=e.target.elements.country.value;
  if(city&&country){
    const api_call= await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
    );
  
    const response= await api_call.json();
    console.log(response);
    this.setState({
      city: `${response.name},${response.sys.country}`,
      celcius:this.calCelcius(response.main.temp),
      temp_min:this.calCelcius(response.main.temp_min),
      temp_max:this.calCelcius(response.main.temp_max),
      description:response.weather[0].description
    });
  
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
  }
  else{
    this.setState({error:true});
  }
};


   render(){
     return(
      <div className="App">
      <Form loadweather={this.getWeather}error={this.state.error}/>

        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celcius={this.state.celcius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description}
        weatherIcon={this.state.icon}/>
      </div>
    );
   }
}


export default App;
