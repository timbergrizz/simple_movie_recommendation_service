import React, { useState } from 'react';
import axios from 'axios';
import Movie from "../components/Movies.js"

class Main extends React.Component {
    state = {
        userId : 1,
        isLoading : true,
        movieByAge : [],
        movieByOccp : []
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({userId : event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const data = await axios.get(`http://localhost:3003/user/${this.state.userId}`);
            console.log(data);
            const userData = data.data[0];
            console.log(userData);

            let age = userData.age / 10;
            age *= 10;

            const { data : movieByAge } = await axios.get(`http://localhost:3003/rank/age/${age}`);
            const { data : movieByOccp } = await axios.get(`http://localhost:3003/rank/occupation/${userData.occupation}`);
            console.log(movieByAge);
            console.log(movieByOccp);

            this.setState({
                movieByAge,
                movieByOccp,
                isLoading : false
            }, () =>{
                console.log(this.state);
            })
        }
        catch(err){
            console.log(err)
        }
    }



    render(){
        const {isLoading, userId} = this.state;
        return (
        <div className="main">
            <form onSubmit = {this.handleSubmit}>
                <input type="text" value={this.state.userId} onChange={this.handleChange} />
                <input type="submit" />
            </form>
            { isLoading ?
                <div>
                    Loading
                </div>
            :
                <div>
                    <Movie list={this.state.movieByAge}/>
                </div>
            }
        </div>
        )
    }
}



export default Main;
