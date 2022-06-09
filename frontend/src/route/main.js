import React, { useState } from 'react';
import axios from 'axios';
import Movie from "../components/Movies.js"
import "../css/main.css"

class Main extends React.Component {
    state = {
        userId : 1,
        isLoading : true,
        isSubmit : false,
        movieByAge : [],
        movieByOccp : [],
        isRanking : true
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

    handleButton = async(event) => {
        event.preventDefault()
        this.setState({isRanking : !this.state.isRanking});
    }


    render(){
        const {isRanking, isSubmit, isLoading, userId} = this.state;
        return (
        <div className="main">
            { isLoading ?
                <div className="userIdForm">
                    <form onSubmit = {this.handleSubmit}>
                        <input type="text" value={this.state.userId} onChange={this.handleChange} />
                        <input type="submit" />
                    </form>
                </div>
            :
                <article className="movieList">
                    <div className="buttons">
                        <button type="button" onClick={this.handleButton}> Ranking / Recommend </button>
                    </div>
                {
                    isRanking ?
                    <div>
                        <h1> Movie Ranking </h1>
                        <div className="movieRank">
                            <div>
                                <h2> Movie Ranking By Age </h2>
                                <Movie list={this.state.movieByAge} type="Average"/>
                            </div>
                            <div>
                                <h2> Movie Ranking By Occupation </h2>
                                <Movie list={this.state.movieByOccp} type="Average"/>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="movieRecommend">
                        <h1>
                            Movie Recommendation
                        </h1>
                        <Movie list={this.state.movieByOccp} type="Expected" />
                    </div>
                }

                </article>
            }
        </div>
        )
    }
}



export default Main;
