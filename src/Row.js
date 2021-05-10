import React,{useState, useEffect} from 'react'
import axios from './axios'


const Row = ({title, fetchUrl}) =>{

	const [movies, setMovies] = useState([])

	// on specific conditions run the func 
	// conditions is defined inside []
	useEffect(()=>{
		// this is how we use async inside useEffect()
		async function fetchData(){
			const request = await axios.get(fetchUrl) 
			setMovies(request.data.results)
			return request
		}
		fetchData()
	},[fetchUrl])

	return(
		<div>
			<h2>{title}</h2>
		</div>
	)
}

export default Row 
