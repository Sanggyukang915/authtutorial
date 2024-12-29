import { CardWrapper } from "@/components/auth/card-wrapper";
import {AlertTriangle} from "lucide-react"

export const ErrorCard =()=>{
    return (
        <CardWrapper
            headerLable="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLable="Back to login"
        >
            <div className="w-full flex justify-center items-center">
                <AlertTriangle className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}