"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/src/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const [displayName, setDisplayName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        let displayName = user.displayName;

        if (!displayName) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            displayName = userDoc.data().displayName;
          }
        }

        setDisplayName(displayName || "Pengguna");
      }
    };

    fetchUserData();

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Selamat pagi");
    } else if (currentHour < 18) {
      setGreeting("Selamat siang");
    } else {
      setGreeting("Selamat malam");
    }
  }, []);

  console.log(displayName);

  return (
    <div>
      <h1>
        {greeting}, {displayName}!
      </h1>
    </div>
  );
}

export default Dashboard;
