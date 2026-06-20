import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-lg text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button size="lg" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Go to Home
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="w-full border-border/50">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
