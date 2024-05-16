// src/contexts/UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get the user from local storage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signIn = async (username, password) => {
    try {
      const response = await fetch(
        "http://localhost/hospital-triage-services/auth/signIn.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (data.success && data.username) {
        const userData = {
          username: data.username,
          userType: data.userType,
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          position: data.position,
          password: data.password
        };
        setUser(userData); // Update user context with signed-in user's data
        localStorage.setItem("user", JSON.stringify(userData)); // Persist user data for session management
      } else {
        throw new Error(
          data.error || "Sign in failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error; // Rethrow to handle in UI components
    }
  };

  const signOut = () => {
    setUser(null); // Clear user context
    localStorage.removeItem("user"); // Clear persisted user data
  };

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
