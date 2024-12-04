import { ToggleTheme } from "@/components/theme/ToggleTheme"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Menu, User } from "lucide-react"
import Link from "next/link"

export default function LandingPageNavbar(){
    return <div className="flex justify-between items-center px-2 md:px-8 lg:px-20 mt-2">
        {/* left side of landing navbar */}
        <div className="flex justify-center items-center">
            <Menu />
            <h1> Opal </h1>
        </div>
        {/* right side of landing navbar */}
        <div className="flex justify-between items-center gap-5 ">
            {/* links */}
            <div className="flex gap-2">
                <Link href={'/'}> Home </Link>
                <Link href={'/dashboard'} > Dashboard </Link>
                <Link href={'/pricing'} > Pricing </Link>
                <Link href={'/contacts'} > Contact </Link>
            </div>
            {/* important buttons */}
            <div className="flex justify-center items-center gap-2 px-2">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <div className="flex justify-center items-center border-2 px-2">
                        <User className="h-5"/>
                        <SignInButton />
                    </div>
                </SignedOut>

                <ToggleTheme />
           </div>
        </div>
    </div>
}