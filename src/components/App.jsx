import { useEffect } from 'react';
import '../css/App.css';
import { Outlet } from 'react-router-dom';

function App() {
  // Change document title
  useEffect(() => {
    document.title = "Blog Project";
  },[]);

  return (
    <>
      <h1>My Blog</h1>
      <Outlet />
    </>
  )
}

export default App