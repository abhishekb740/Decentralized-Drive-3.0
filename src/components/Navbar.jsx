import { AppBar, Avatar, Toolbar, Typography, Box, Menu, MenuItem, Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStateContext } from '../context/context';

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const { accountAddr, contract } = useStateContext();
    const [enteredAddress, setEnteredAddress] = useState("");
    const [addressAccessList, setAddressAccessList] = useState([{
        address: "",
        access: ""
    }])
    const [enteredAddressDisAllow, setEnteredAddressDisAllow] = useState("")

    useEffect(() => {
        const accessList = async () => {
            const addressList = await contract.shareAccess();
            const options = addressList;
            console.log(options);
            for (let i = 0; i < options.length; i++) {
                setAddressAccessList((data) => [
                    ...data, {
                        address: options[i].user,
                        access: `${options[i].access}`
                    }
                ])
                console.log(addressAccessList);
            }
            console.log(addressAccessList);
        };
        contract && accessList();
    }, [contract]);

    const inputChangeHandler = async (e) => {
        e.preventDefault()
        setEnteredAddress(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let accessGiven = await contract.allow(enteredAddress);
        if (accessGiven) {
            alert(`Access Given to the Address ${enteredAddress}`)
        }
        else {
            alert("Something went wrong!")
        }

    }
    const inputChangeHandlerDisallow = (e) => {
        e.preventDefault()
        setEnteredAddressDisAllow(e.target.value)
    }
    const handleSubmitDisallow = async (e) => {
        e.preventDefault()
        let success = await contract.disallow(enteredAddressDisAllow)
        if (success) {
            alert(`Access Removed from the Address ${enteredAddressDisAllow}`)
        }
        else {
            alert("Something went wrong!")
        }
        setAddressAccessList([])
    }
    const modalCloseHandler = (e) => {
        e.preventDefault();
        setOpenModal(false);
        setEnteredAddress("");
    }
    return (
        <AppBar position='sticky' sx={{ backgroundImage: 'linear-gradient(to right, #fc5c7d, #8e2de2);' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: { xs: '15px', sm: '20px' } }}>
                    Decentralized Drive 3.0
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }} >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }} >
                        <Button sx={{ color: 'white', textAlign: 'center' }} onClick={() => setOpenModal(true)} >Share</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }} >
                        Account Details: <Avatar onClick={() => setOpen(true)} sx={{ width: 30, height: 30 }} />
                    </Box>
                </Box>
            </Toolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem>{accountAddr ? accountAddr : "Not connected to Metamask!"}</MenuItem>
            </Menu>
            <Modal
                open={openModal}
                onClose={modalCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box width="50%" height="55%" bgcolor="white" p={3} borderRadius={5} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
                    <Typography variant="h6" color="gray" textAlign='center'>Share your Images with</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', width: '100%' }} >
                        <input style={{ width: '50%' }} placeholder="Enter Address" onChange={inputChangeHandler}>
                        </input>
                    </Box>
                    <label>
                        People With Access
                    </label>
                    <select id="selectNumber">
                        < option>People With Access</option>
                        {addressAccessList.map((addr, i) => (
                            < option key={i}> {addr.address},{addr.access}</option>
                        ))}
                    </select>
                    <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
                        <Button sx={{ border: '1px solid black' }} onClick={handleSubmit} disabled={enteredAddress.length != 42}>
                            Share
                        </Button>
                    </Box>
                    <Typography variant="h6" color="gray" textAlign='center'>Disallow Sharing of Images with</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', width: '100%' }} >
                        <input style={{ width: '50%' }} placeholder="Enter Address" onChange={inputChangeHandlerDisallow}>
                        </input>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
                        <Button sx={{ border: '1px solid black' }} onClick={handleSubmitDisallow} disabled={enteredAddressDisAllow.length != 42}>
                            Disallow
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </AppBar >
    )
}

export default Navbar