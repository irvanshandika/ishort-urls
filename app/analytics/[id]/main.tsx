"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { auth, db } from "@/src/config/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface ShortUrlData {
  createdAt: { seconds: number };
  visitorCount: number;
}

const Analytics = () => {
  const [user] = useAuthState(auth);
  const [chartData, setChartData] = useState<{ date: string; visitorCount: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, "shorturls"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => {
          const urlData = doc.data() as ShortUrlData;
          return {
            date: new Date(urlData.createdAt.seconds * 1000).toLocaleDateString(),
            visitorCount: urlData.visitorCount || 0,
          };
        });

        setChartData(data);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">URL Analytics</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitorCount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
