import React, { useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

function App() {

    const [robots, setRobots] = useState([])
    const [ searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
                 .then(response =>response.json()
                 )
                 .then(users => {setRobots(users)})
        console.log(count)
        //wczytywanie na początku,
        // jakby było searchfield ->
        // wczytywanie wtedy kiedy zmienia się pole,
        // a robots -> to cały czas
        },[count])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    if (!robots.length) {
        return <h1> Loading </h1>
    } else {
        return (
            <div className={'tc'}>
                <h1 className={'f2'}> Robofriends</h1>
                <button onClick={()=>setCount(count+1)}> Click me! </button>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }

}

export default App;