import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import Banner from './components/banner/Banner'
import About from './components/about/About'

function App() {

  return (
    <div className='app'>
      <NavBar />
      <Banner />
      <About />
    </div>
  )
}

export default App
