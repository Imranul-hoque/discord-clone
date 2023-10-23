import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const profile = await currentProfile();
        const body = await req.json();
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId");
        const { name, type } = body;

        if (!profile) {
            return new NextResponse("Unauthorized user", { status : 400 });
        }

        if (!serverId) {
            return new NextResponse("serverid is required", { status : 400 })
        }

        if (name === "general") {
            return new NextResponse("Channel name can not be 'general'")
        }

        const channel = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId : profile.id
                    }
                }
            },
            data: {
                channels: {
                    create: [
                        { profileId : profile.id, name : name, type : type }
                    ]
                }
            }
        })

        return NextResponse.json(channel)

    } catch (error) {
        return new NextResponse("internal server error", { status : 500 })
    }
}