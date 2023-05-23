import { Card, Box, Button } from "@mui/material"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from "react";
import { useStateContext } from "../context/context"

const Display = () => {
    const [address, setAddress] = useState("");
    const { accountAddr, contract } = useStateContext();
    const [data, setData] = useState("")
    const getData = async (e) => {
        e.preventDefault
        let dataArray;
        try {
            if (address) {
                dataArray = await contract.display(address)
            }
            else {
                dataArray = await contract.display(accountAddr)
            }
        } catch (err) {
            alert("You don't have Access!");
        }
        const isEmpty = Object.keys(dataArray).length == 0;
        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",")
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank" rel="noreferrer">
                        <img height={500} width={600} key={i} src={item}></img>
                    </a>
                )
            });
            setData(images)
        }
        else {
            alert("No Image to Display!")
        }
    }
    const inputChangeHandler = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', width: '100%' }} >
                    <input style={{ width: '50%' }} placeholder="Enter Address" onChange={inputChangeHandler}>
                    </input>
                    <Button onClick={getData} startIcon={<ManageSearchIcon />} sx={{ bgcolor: 'lightblue' }}>
                    </Button>
                </Box>

                <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', backgroundColor: 'transparent' }} >
                    {data}
                </Card>
            </Box>
        </div >
    )
}

export default Display