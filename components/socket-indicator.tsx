"use client";


import { useSocket } from "@/provider/socket-provider";
import { Badge } from "./ui/badge";

const SocketIndicator = () => {
    
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant={"outline"} className="bg-yellow-500 text-white border-0">
                Fallback : polling every 1s 
            </Badge>
        )
    }

    return (
        <Badge
        variant={"outline"}
        className="bg-emerald-500 text-white border-0"
        >
        Live : Real time updates
        </Badge>
    );
}
 
export default SocketIndicator;