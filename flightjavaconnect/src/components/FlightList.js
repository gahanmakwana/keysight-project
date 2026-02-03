import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
 
const FlightList = () =>{
 
    const [flights, setFlight] = useState([]);
 
    useEffect(()=>{
        loadFlights();
    },[]);
 
    const loadFlights = async () =>{
        const res = await fetch("http://localhost:8080/flights/getAll");
        const data = await res.json();
        setFlight(data);
    }
 
    const deleteFlight = async (id) =>{
        await fetch(`http://localhost:8080/flights/${id}`, { method: "DELETE" });
        loadFlights(); // refresh
    }   
 
    return(
        <div>
            <h3> Available Flights Below</h3>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Flight Name</th>
                        <th> Source</th>
                        <th> Destination</th>
                        <th> Actions</th>
                    </tr>
                </thead>
 
                    <tbody>
                        {
                            flights.map(f =>(
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{f.flightName}</td>
                                    <td>{f.source}</td>
                                    <td>{f.destination}</td>
                                    <td>
                                        <Link to={`/edit/${f.id}`}> Edit </Link>
                                        <button onClick={()=> deleteFlight(f.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
        </div>
    )
}
 
export default FlightList;