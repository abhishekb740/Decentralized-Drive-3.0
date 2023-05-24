import FileUpload from "./FileUpload"
import Display from "./display"

const Home = () => {
    return (
        <div style={{
            backgroundImage: 'url("./src/assets/Vector_2646.jpg")', minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
            <FileUpload />
            <Display />
        </div >

    )
}

export default Home