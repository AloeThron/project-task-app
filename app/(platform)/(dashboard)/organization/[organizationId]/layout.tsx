// import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

import { OrgControl } from "./_components/org-control";

type Props = {
  children: React.ReactNode;
};

// export async function generateMetadata() {
//   const { orgSlug } = auth();

//   return {
//     title: startCase(orgSlug || "organization"),
//   };
// }

const OrganizationIdLayout = ({ children }: Props) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
