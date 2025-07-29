import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthentication } from "../authentication/useAuthentication";
import { db } from "../firebase/conection";

export function useAdminCheck() {
  const { auth } = useAuthentication();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().isAdmin === true);
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, [auth]);

  return { isAdmin, loading };
}