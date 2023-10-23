import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        
        const profile = await currentProfile();
        const { imageUrl, name } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized")
        }

        if (!imageUrl || !name) {
            return new NextResponse("All fields are required", { status : 400 })
        }

        if (!params.serverId) {
            return new NextResponse("ServerId is required", { status : 400 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId : profile.id
            },
            data: {
                name: name,
                imageUrl : imageUrl
            }
        })

        return NextResponse.json(server)


    } catch (error) {
        return new NextResponse("Internal server error", { status : 500 })
    }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
