"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/database";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { decreaseAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const isPro = await checkSubscription();

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decreaseAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
}

export const deleteBoard = createSafeAction(DeleteBoard, handler);