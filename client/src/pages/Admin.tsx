import { AddJobs } from '@/components/AddJob'
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
import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Job {
  _id: string
  title: string
  description: string
  location: string
  salary: number
}

export function Admin() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [editJob, setEditJob] = useState<Job | null>(null) // Job to edit
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  })

  useEffect(() => {
    // Fetch jobs from the backend
    fetch('http://localhost:5001/api/jobs')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setJobs(data.jobs)
      })
      .catch((error) => console.error('Error fetching jobs:', error))
  }, [])

  const fetchApplications = async (jobId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/applications/${jobId}`
      )
      const data = await response.json()
      if (data.success) setApplications(data.applications)
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/jobs/${id}`, {
          method: 'DELETE',
        })
        const data = await response.json()
        if (data.success) {
          setJobs(jobs.filter((job: any) => job._id !== id))
        } else {
          alert(data.message || 'Error deleting job')
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/jobs/${editJob?._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editData),
        }
      )
      const data = await response.json()
      if (data.success) {
        setJobs(jobs.map((job) => (job._id === editJob?._id ? data.job : job)))
        setEditJob(null) // Close the dialog
      } else {
        alert(data.message || 'Error updating job')
      }
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">List of all active jobs</h1>
            <AddJobs />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: any) => (
              <Card key={job._id} className="w-full">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                  <p className="text-sm text-gray-500">Salary: ₹{job.salary}</p>
                </CardContent>
                <div className="flex justify-between p-6 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      {/* <Button onClick={() => setEditJob(job)}>Update</Button> */}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Job</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleUpdate()
                        }}
                      >
                        <div className="space-y-4">
                          <Input
                            placeholder="Title"
                            value={editData.title}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                title: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Description"
                            value={editData.description}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                description: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Location"
                            value={editData.location}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                location: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Salary"
                            type="number"
                            value={editData.salary}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                salary: e.target.value,
                              })
                            }
                          />
                          <div className="flex justify-end gap-4">
                            <Button
                              type="button"
                              onClick={() => setEditJob(null)}
                              variant="secondary"
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                          </div>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  {/* <Button
                  variant="destructive"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedJobId(job._id)
                          fetchApplications(job._id)
                        }}
                      >
                        View Applications
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Applications for {job.title}</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Applied At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {applications.map((app: any) => (
                            <TableRow key={app._id}>
                              <TableCell>{app.candidateName}</TableCell>
                              <TableCell>{app.candidateEmail}</TableCell>
                              <TableCell>
                                <a
                                  href={app.candidateResume}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View Resume
                                </a>
                              </TableCell>
                              <TableCell>
                                {new Date(app.appliedAt).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
