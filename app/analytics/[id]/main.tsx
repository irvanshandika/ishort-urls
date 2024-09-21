"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/src/config/FirebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/src/config/FirebaseConfig";
import { Spinner, Button } from "@nextui-org/react";

interface VisitorData {
  date: string;
  count: number;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<VisitorData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
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
          const createdAt = docData.createdAt ? docData.createdAt.toDate() : null;
          const visitDate = createdAt ? moment(createdAt).format("YYYY-MM-DD") : null;
          const visitorCount = docData.visitorCount || 0;

          if (visitDate) {
            // Add up the visitor count for each date
            if (visitorMap[visitDate]) {
              visitorMap[visitDate] += visitorCount;
            } else {
              visitorMap[visitDate] = visitorCount;
            }
          }
        });

        // Format the visitor map into a usable data array
        const formattedData: VisitorData[] = Object.keys(visitorMap).map((date) => ({
          date,
          count: visitorMap[date],
        }));

        setData(formattedData);
        setLoadingData(false);
      });

      return () => unsubscribe();
    };

    fetchVisitorData();
  }, []);

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Visitor Analytics</h1>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" barSize={20} fill="#007bff" />
            <Line type="monotone" dataKey="count" stroke="#00c853" />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-medium">No visitors data available yet.</p>
          <Button color="primary" onClick={() => router.push("/")}>
            Create Short URL
          </Button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
