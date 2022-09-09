import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
class App extends Component {
  
  //constructor first initialize the state
  //render runs next
 
  constructor(){
    super();

    this.state = {
      monsters:[],
      searchField: '',
    }
  }
  
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
        return response.json();  
    })
    .then((users)=>{
      this.setState(()=>{
        return {monsters: users}
      },()=>{
        console.log(this.state)
      });
    })
  }

  onSearchChange = (event) =>{   
    this.setState(()=>{
      const searchField = event.target.value.toLocaleLowerCase();
      return {
        searchField 
      }
    })
  };

  render(){
    const {searchField , monsters } = this.state ;
    const {onSearchChange} = this;

    const filterMonsters = monsters.filter((a)=>{
      return a.name.toLocaleLowerCase().includes(searchField);
    });
    
    return (
      <div className="App">
      <h1 className="app-title">Monsters Roledex</h1>  
      <SearchBox onChangeHandler={onSearchChange}
      className={`search-box ${this.props.className}`}
      placeholder={"Search Monster"}/>
      <CardList monsters={filterMonsters} /> 
      </div>
    )
  }
  
}

export default App;
