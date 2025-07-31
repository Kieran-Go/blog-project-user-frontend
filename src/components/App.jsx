import { useEffect } from 'react';
import '../css/App.css';

function App() {
  // Change document title
  useEffect(() => {
    document.title = "Blog Project";
  },[]);


  return (
    <>
      <h1>Hello, World!</h1>
    </>
  )
}

export default App