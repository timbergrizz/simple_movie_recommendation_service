import react, { useState } from 'react'

function Movie(props){
    console.log(12356)
    console.log(props.list)
    const list = props.list
    const type = props.type
    return (
        <div className="movieLists" >
        {list.map((elem) => {
            return (
                <div>
                    <h4> {elem.movieTitle}  </h4>
                    <p>
                        {type} Rate : {elem.avgRate}
                    </p>
                </div>
            )
        })}
        </div>
    )
}

export default Movie;
