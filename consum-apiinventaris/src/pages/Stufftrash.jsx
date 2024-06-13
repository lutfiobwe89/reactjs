import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function StuffTrash() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

   
    useEffect(() => {
            axios.get('http://localhost:8000/stuffs/trash', {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                }
            })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "name" : null,
        "category" : null,
        "stuffstock": "total_available",
        "stuffstock*": "total_defec",
    }

        const button = [
            "restore",
            "permanent-delete"
        ]
        

        const endpoints = {
            "retore" : "http://localhost:2222/restore/trash/{/id}",
            "permanent-delete" : "http://localhost:2222/stuff/trash/permanent-delete/{/id}",
        }

            
        const judulModalEdit = ''

        const inputData = {}
    
    
    return(
        <>
            <Navbar />
            <Table 
            dataTh={dataThParent} 
            dataTd={stuffs} 
            coloumDB={coloumDataBase} 
            buttonData={button} 
            endpoints={endpoints} 
            judulModalEdit={judulModalEdit} 
            inputData={inputData}>
            </Table>
        </>
    )
}