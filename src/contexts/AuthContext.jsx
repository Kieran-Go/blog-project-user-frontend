import { useState, useEffect, createContext } from 'react';

// Create a React Context for data associated with authentication
export const AuthContext = createContext(null);

// This component provides auth state (user info, loading status) to the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // State that holds the currently authenticated user (or null if not logged in)
  const [loading, setLoading] = useState(true); // Track whether currently checking auth status

  useEffect(() => {
    console.log("CHECKING TOKEN.....");
    // Get token from local storage
    const token = localStorage.getItem('token');

    // If no token, stop loading and user remains null (not logged in)
    if (!token) {
      setLoading(false);
      return; // Exit early
    }

    // If token exists, validate it by calling the backend /auth endpoint
    fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => res.json()) // Parse JSON response
    .then(data => {
        // If backend says token is valid, update user state with user info
        if (data.valid) setUser(data.user);

        // If token is invalid, remove it from localStorage
        else localStorage.removeItem('token');
    })
    // Log any fetch or network errors
    .catch(err => console.error(err))

    // Stop loading
    .finally(() => setLoading(false));
  },[]); // Empty dependency array means this useEffect runs only once on mount

  // Provide the user info, setter and loading state to all child components of AuthContext
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}