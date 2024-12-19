import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,

  CardContent,
} from '@/components/ui/card'

export function Jobs() {
  return (
    <div>
      <Navbar />
      <Card className="w-96 mt-36 ml-6">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <div className="flex justify-center p-6 pt-0">
          <Button>Apply</Button>
        </div>
      </Card>
    </div>
  )
}
