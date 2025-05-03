"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "@/utils/supabase/client";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.push("/auth");
    })();
  }, []);

  return <>{children}</>;
};

export default ProtectedLayout;
