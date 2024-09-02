"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/src/config/FirebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/src/config/FirebaseConfig";

interface VisitorData {
  date: string;
  count: number;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<VisitorData[]>([]);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/forbidden");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchVisitorData = async () => {
      const q = query(collection(db, "shorturls"), orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let visitorMap: { [key: string]: number } = {};

        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          const visitors: { date: string }[] = docData.visitors || [];

          visitors.forEach((visitor) => {
            const visitDate = moment(visitor.date).format("YYYY-MM-DD");
            if (visitorMap[visitDate]) {
              visitorMap[visitDate] += 1;
            } else {
              visitorMap[visitDate] = 1;
            }
          });
        });

        const formattedData: VisitorData[] = Object.keys(visitorMap).map((date) => ({
          date,
          count: visitorMap[date],
        }));

        setData(formattedData);
      });

      return () => unsubscribe();
    };

    fetchVisitorData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="count" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
