import jwtDecode from 'jwt-decode';

/**
 * Check if a token is valid
 * @param {string} token - The JWT token to validate
 * @returns {boolean} - True if the token is valid, false otherwise
 */
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};

/**
 * Logout logic
 * Clears the token from storage and redirects to login
 */
export const logout = () => {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authToken'); // Clear token from localStorage
    }
    if (typeof window !== 'undefined') {
        window.location.href = '/login'; // Redirect to login page
    }
};