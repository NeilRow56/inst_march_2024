import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function LandingPage() {
  return (
    <section className="flex h-[90vh] items-center justify-center bg-background">
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 md:px-12 lg:px-16 ">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <span className="w-auto rounded-full bg-secondary px-6 py-3">
              <span className="text-sm font-medium text-primary">
                Accountants - Save time and storage costs
              </span>
            </span>
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Create working papers with ease
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-secondary-foreground lg:text-xl">
              Online accounts preparation file. Automatic comparative schedules.
              Secure cloud storage. Insert spreadsheet, pdf files etc;.
            </p>
          </div>
          <div className="-col mx-auto mt-10 flex max-w-sm flex-col justify-center space-y-4">
            <div className="mx-auto flex flex-col space-y-4">
              <p>Already Have an account?</p>
              <div className="mx-auto flex flex-col space-y-4">
                <Button asChild className="w-[120px]">
                  <Link href="/auth/sign-in">Sign in</Link>
                </Button>
                <p>Create an account?</p>
                <Button
                  variant="outline"
                  className="w-[120px] bg-slate-200 text-primary"
                  asChild
                >
                  <Link href="/auth/sign-up">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
