import React, { Component } from 'react';
//import { robots } from './robots';
import './App.css';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({
                    robots: users
                });
            })

    }

    onSearchChange = (event) => { 
        this.setState({
            searchfield: event.target.value
        });

    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) 
                //|| robot.email.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if (!this.state.robots.length) {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <h3>Loading Robots...</h3>
                </div>
            )
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />                    
                    </Scroll>
                </div>
            );  
        }

    }
}

export default App;