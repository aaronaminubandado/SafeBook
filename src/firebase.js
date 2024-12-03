import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firestore instance

async function addBooking() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      User_ID: "3",
      UserType: "Customer",
      Name:"Latifa",
      Email: "queenlatifa@gmail.com",
      Password: "queen123"
    });
    console.log("User added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding booking: ", e);
  }
}
