import { Navbar } from '@/components/Navbar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import Chatbot from '@/pages/Chatbot'
import { MessageCircle } from 'lucide-react' // For chat icon

export function Jobs() {
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidateResume: '',
  })
  const [isChatOpen, setIsChatOpen] = useState(false)

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        'https://job-portal-helper.vercel.app/api/jobs'
      )
      const data = await response.json()
      if (data.success) setJobs(data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const handleApply = async () => {
    if (!selectedJobId) return
    try {
      const response = await fetch(
        'https://job-portal-helper.vercel.app/api/applications/apply',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: selectedJobId,
            ...formData,
          }),
        }
      )
      const data = await response.json()
      if (data.success) {
        alert('Application submitted successfully!')
        setFormData({
          candidateName: '',
          candidateEmail: '',
          candidateResume: '',
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error applying for job:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="mt-36 ml-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <Card key={job._id} className="w-96">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
              <p className="text-sm text-gray-500">Salary: ₹{job.salary}</p>
              <p className="text-sm text-gray-500">
                Contact: {job.contactEmail}
              </p>
            </CardContent>
            <div className="flex justify-center p-6 pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedJobId(job._id)}>
                    Apply
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleApply()
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <Input
                        value={formData.candidateName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            candidateName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={formData.candidateEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            candidateEmail: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Resume (URL/Text)
                      </label>
                      <Textarea
                        value={formData.candidateResume}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            candidateResume: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {/* Chat Button & Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bottom-0 right-0 max-w-[500px] sm:max-w-[425px] h-[600px] p-0 mb-20 mr-4 fixed">
          <Chatbot />
        </DialogContent>
      </Dialog>
    </div>
  )
}
