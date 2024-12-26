"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfiguration";
import { onAuthStateChanged } from "firebase/auth";

export function BusinessInfo() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch business info from Firestore
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setBusinessInfo({
            name: data.businessName || "",
            description: data.businessType || "",
            address: data.address || "",
            phone: data.phoneNumber || "",
            email: data.email || "",
            website: data.website || "",
          });
        }
      } catch (error) {
        console.error("Error fetching business info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessInfo();
  }, [userId]);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Update business info in Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("No user is signed in.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(
        userDocRef,
        {
          businessName: businessInfo.name,
          businessType: businessInfo.description,
          address: businessInfo.address,
          phoneNumber: businessInfo.phone,
          email: businessInfo.email,
          website: businessInfo.website,
        },
        { merge: true }
      );
      console.log("Business info updated successfully");
    } catch (error) {
      console.error("Error updating business info:", error);
    }
  };

  if (loading) {
    return <p>Loading business information...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Business Name</Label>
        <Input
          id="name"
          name="name"
          value={businessInfo.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={businessInfo.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={businessInfo.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={businessInfo.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={businessInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={businessInfo.website}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Update Business Info</Button>
    </form>
  );
}
