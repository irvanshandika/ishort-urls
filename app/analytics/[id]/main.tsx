"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/src/config/FirebaseConfig";
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";

interface ShortUrlData {
  createdAt: Date;
  visitorCount: number;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<ShortUrlData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "shorturls"), orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const formattedData: ShortUrlData[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            createdAt: data.createdAt.toDate(),
            visitorCount: data.visitorCount || 0,
          };
        });
        setData(formattedData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const chartData = data.map((item) => ({
    name: moment(item.createdAt).format("YYYY-MM-DD"),
    visitorCount: item.visitorCount,
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitorCount" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="visitorCount" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
