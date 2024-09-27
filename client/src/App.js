import './App.css';
import AddDepartment from './components/AddDepartment';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="py-8 px-14">
      <div className='grid grid-cols-2 gap-4'>
        <AddDepartment />
        <AddEmployee />
      </div>
      <EmployeeList />
      <ToastContainer />
    </div>
  );
}

export default App;
