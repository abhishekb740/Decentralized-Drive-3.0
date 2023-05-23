import FileUpload from "./FileUpload"
import Display from "./display"

const Home = () => {
    return (
        <div style={{ backgroundImage: 'url("./src/assets/pawel.jpg")' }}>
            <FileUpload />
            <Display />
        </div >

    )
}

export default Home