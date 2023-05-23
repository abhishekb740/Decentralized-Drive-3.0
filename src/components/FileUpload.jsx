import { Box, Button, Modal, Typography } from "@mui/material";
import { useStateContext } from "../context/context"
import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const { accountAddr, contract } = useStateContext();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null);

    const FileChangeHandler = (e) => {
        console.log(e);
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        console.log(file);
        e.preventDefault();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file)
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: '1df265f526d7fef0e9f5',
                        pinata_secret_api_key: '6e6a5c06bf4b99125c0a5899a9bdff0b70d0bc6bae15fc20ae5a0b527642c28c',
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

                await contract.add(accountAddr, ImgHash);
                alert("Successfully Image Uploaded")
                setFile(null);
            } catch (err) {
                alert(err)
            }
        }
    }
    return (
        <div>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', paddingTop: '2rem' }}>
                <Button sx={{ border: '1px solid black', color: 'black' }} onClick={() => setOpen(true)}>Upload Image</Button>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box width="50%" height="25%" bgcolor="white" p={3} borderRadius={5} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
                        <Typography variant="h6" color="gray" textAlign='center'>Upload Image to IPFS</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Your Account Address: {accountAddr ? accountAddr : "Account not connected to Metamask!"}
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '2rem', alignItems: 'center' }}>
                            <input disabled={!accountAddr} name="data" type="file" onChange={FileChangeHandler} ></input>
                            <Button sx={{ border: '1px solid black' }} onClick={handleSubmit} disabled={!file}>
                                {file ? "Upload Image" : "Please choose Image"}
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </div >

    )
}

export default FileUpload