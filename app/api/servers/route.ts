import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req : Request) {
    try {
        const body = await req.json();
        const { name, imageUrl } = body;
        const profile = await currentProfile();
        if (!profile) {
          return new NextResponse("Unauthorized user", { status: 401 });
        }
        if (!name || !imageUrl) {
          return new NextResponse("All fields are required");
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuid(),
                channels: {
                    create: [
                        { name : "general", profileId : profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId : profile.id, role : MemberRole.ADMIN }
                    ]
                }
            }
        })

        return NextResponse.json(server) 
    } catch (error:any) {
      return new NextResponse(error, { status : 500 })
    }
}