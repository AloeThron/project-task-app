"use client";

import React from "react";

import { UserButton, auth, currentUser, useAuth, useUser } from "@clerk/nextjs";

type Props = {};

export default function ProtectedPage({}: Props) {
  // const user = await currentUser()
  // const {userId} = auth()

  const { user } = useUser();
  const { userId } = useAuth();

  return (
    <div>
      user: {user?.firstName}
      <br />
      userId: {userId}
      <br />
      <UserButton />
    </div>
  );
}
