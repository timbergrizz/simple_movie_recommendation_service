import react, { useState } from 'react'

function Movie(props){
    console.log(12356)
    console.log(props.list)
    const list = props.list
    return (
        <div>
        {list.map((elem) => {
            return (
                <div>
                    {elem.movieTitle}
                </div>
            )
        })}
        </div>
    )
}

export default Movie;
