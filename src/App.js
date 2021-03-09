import SideBar from './components/SideBar';
import DashBoard from './pages/Login/DashBoard/DashBoard';
import './App.scss';
import Login from './pages/Login/Login';

function App() {
  return (
    <div id="page-top" className="App">
      <div id="wrapper">
        <SideBar />
        <DashBoard />
      </div>
      {/* <Login /> */}
    </div >
  );
}

export default App;
