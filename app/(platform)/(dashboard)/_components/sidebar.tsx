"use client";

import React from "react";
import Link from "next/link";

import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { NavItem, Organization } from "./nav-item";

type Props = {
  storageKey?: string;
};

// Record<string, any> ตัวแปรทั้งสองสามารถเก็บค่าข้อมูลที่เป็นอาร์เรย์ของ key-value โดย key ต้องเป็นสตริง และ value สามารถเป็นประเภทใดก็ได้
export default function Sidebar({ storageKey = "sidebar-state" }: Props) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // ใช้ฟังก์ชัน Object.keys() เพื่อรับคีย์ทั้งหมดของวัตถุ expanded จากนั้นโค้ดจะเรียกใช้ฟังก์ชัน reduce() เพื่อวนซ้ำผ่านคีย์ทั้งหมดของวัตถุ expanded ฟังก์ชัน reduce() จะได้รับอาร์เรย์ว่างเป็นค่าเริ่มต้นสำหรับตัวแปร acc และจะเพิ่มคีย์ key ใน expanded ลงในอาร์เรย์ acc
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      // {"item1": true, "item2": false} => ["item1", "item2"]
      return acc;
    },
    []
  );

  // {"item1": true} => {"item1": false}
  function onExpand(id: string) {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
}
