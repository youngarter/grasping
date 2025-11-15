import UserLayout from "@/components/users/user-layout";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function LayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  let userName = "Guest";
  let role = "user";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role, first_name")
      .eq("id", user.id)
      .single();

    if (!error && profile) {
      userName = profile.first_name || "Guest";
      role = profile.role ?? "user";
    } else {
      userName = "Guest";
      role = "user";
    }
  }

  return (
    <>
      <UserLayout userName={userName} role={role}>
        {children}
      </UserLayout>
    </>
  );
}
