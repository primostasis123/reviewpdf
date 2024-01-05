import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    fileid: string;
  };
}

export default async function page({ params }: PageProps) {
  const session = await auth();
  const { fileid } = params;

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: session?.user.id,
    },
  });

  if (!file) {
    notFound();
  }

  return <div>{fileid}</div>;
}
