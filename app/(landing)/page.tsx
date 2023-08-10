import Companies from "@/components/landing/Companies"
import Features from "@/components/landing/Features"
import { Footer } from "@/components/landing/Footer"
import { Hero } from "@/components/landing/Hero"
import Navbar from "@/components/landing/Navbar"
import Pricing from "@/components/landing/Pricing"
import Team from "@/components/landing/Team"
import Testimonials from "@/components/landing/Testimonials"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Companies />
        <Features />
        <Pricing />
        <Testimonials />
        <Team />
        <Footer />
        {/* <div>
            <Link href={"/sign-in"}>
                <Button>
                    Login
                </Button>
            </Link>
            <Link href={"/sign-up"}>
                <Button>
                    register
                </Button>
            </Link>
        </div> */}
    </div>
  )
}

export default LandingPage