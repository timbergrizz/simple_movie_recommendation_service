import React, { useState } from 'react';
import axios from 'axios';
import Movie from "../components/Movies.js"

class Main extends React.Component {
    state = {
        userId : 1,
        isLoading : true,
        isSubmit : false,
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
        const {isSubmit, isLoading, userId} = this.state;
        return (
        <div className="main">
            { isLoading ?
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input type="text" value={this.state.userId} onChange={this.handleChange} />
                        <input type="submit" />
                    </form>
                </div>
            :
                <div>
                    <h1>
                        Movie Ranking
                    </h1>
                    <h2>
                        Movie Ranking By Age
                    </h2>
                    <Movie list={this.state.movieByAge}/>
                    <h2>
                        Movie Ranking By Occupation
                    </h2>
                    <Movie list={this.state.movieByOccp}/>
                </div>
            }
        </div>
        )
    }
}



export default Main;
