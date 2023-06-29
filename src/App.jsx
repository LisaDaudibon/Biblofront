import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';
import Profile from './pages/profile';
import Books from './pages/Books/books';
import Navbar from './components/navbar/navbar';
import './App.css';


function App() {
  const setCount = useSetAtom(bookCountAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [setError] = useState('');
  const [setSuccess] = useState('');

  useEffect(() => {
    console.log("loggedIn value:", loggedIn);

    const getcount = async () => {
      try {

        const response = await fetch('https://bibloback.fly.dev/books', {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const last = data.length
          setCount(last)
        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      }
    };
    if (loggedIn) {
    getcount() }// Call the profile function to fetch the data

  }, [loggedIn]);

  return (
    <div>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<SignUp />} />
        <Route path='/users/sign_in' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/books' element={<Books />} /> 
        {/* <Route path='/' element={}> /> */}
        {/* <Route path='/' element={}> /> */}
        {/* <Route path='/' element={}> /> */}
      </Routes>
    </BrowserRouter>

      {/* <BooksSearch> */}

      {/* </BooksSearch> */}
    </div>
)}

export default App
