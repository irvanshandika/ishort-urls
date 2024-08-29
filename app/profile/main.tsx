"use client";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/src/config/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ErrorAlert from "@/src/components/ErrorAlert";
import SuccessAlert2 from "@/src/components/SuccessAlert2";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import SideBar from "@/src/components/Sidebar";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // For image preview
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/forbidden");
    } else if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      setPhotoURL(user.photoURL || "");
      setPhotoPreview(user.photoURL || ""); // Set initial preview to existing photoURL
    }
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string); // Preview the selected image
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage("File size exceeds 10MB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        let newPhotoURL = photoURL;

        if (photoPreview && photoPreview !== user.photoURL) {
          // Upload new profile photo if there's a change
          const file = (document.getElementById("photo") as HTMLInputElement).files?.[0];
          if (file) {
            const storageRef = ref(storage, `profileImages/${user.uid}`);
            await uploadBytes(storageRef, file);
            newPhotoURL = await getDownloadURL(storageRef);
          }
        }

        // Update Firestore document
        await updateDoc(doc(db, "users", user.uid), {
          displayName,
          email,
          photoURL: newPhotoURL,
        });

        setSuccessMessage("Profile updated successfully.");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload();
        }, 3000);
      } catch (err) {
        setErrorMessage("Error updating profile. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Loading" color="primary" labelColor="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={`Error: ${error.message}`} />;
  }

  return (
    <SideBar>
      <div className="flex flex-col items-center px-4 py-2">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        {successMessage && <SuccessAlert2 message={successMessage} />}
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700">
              Name
            </label>
            <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1 p-2 w-full border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700">
              Profile Photo
            </label>
            <input type="file" id="photo" accept="image/*" onChange={handleFileChange} className="mt-1 p-2 w-full border rounded" />
            {photoPreview && (
              <div className="mt-4">
                <p className="text-gray-700">Image Preview:</p>
                <Image src={photoPreview} alt="Profile Preview" className="rounded-full w-32 h-32 object-cover" width={100} height={100} />
              </div>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </div>
    </SideBar>
  );
}

export default ProfilePage;
