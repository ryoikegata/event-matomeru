import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabase";
import { User } from "@supabase/supabase-js";

const useCheckSession = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionUser } = await supabase.auth.getUser();
      setUser(sessionUser.user);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.push("/login");
        } else {
          setUser(session.user); // セッション更新時にユーザー情報を更新
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return user; // フックからユーザー情報を返す
};

export default useCheckSession;
