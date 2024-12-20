import React, { useState } from 'react'
import axios from 'axios'

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [chatResponse, setChatResponse] = useState<string>('')

  const handleSend = async () => {
    if (!userInput.trim()) return

    try {
      const response = await axios.post(
        'https://job-portal-helper.vercel.app/api/chat',
        {
          prompt:
            userInput +
            `You are a helpful job portal assistant. Your primary responsibilities are:

1. Job Search Assistance:
- Help users find jobs based on their skills, experience, and preferences
- Guide users through available filters (location, job type, salary range, etc.)
- Suggest relevant job categories based on user's background

2. Application Process:
- Explain application requirements for specific positions
- Guide users through the application submission process
- Provide tips for creating effective applications

3. Portal Navigation:
- Help users understand different sections of the portal
- Assist with account creation and profile setup
- Explain how to save jobs and set up job alerts

4. Career Guidance:
- Suggest job roles based on user's skills
- Recommend skill improvements for desired positions
- Provide basic industry insights

When providing job listings, include:
- Job title
- Required experience
- Key responsibilities
- Required skills
- Location and job type (remote/hybrid/onsite)

Remember to:
- Always ask clarifying questions if user requirements are unclear
- Provide step-by-step guidance
- Be encouraging and professional
- Direct users to relevant portal features
- Maintain a helpful and supportive tone

If you don't have specific information about a job listing, acknowledge this and provide general guidance while suggesting the user check the portal directly.`,
        }
      )
      setChatResponse(response.data.response)
    } catch (error) {
      console.error('Error fetching AI response:', error)
      setChatResponse('Sorry, something went wrong!')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Chatbot</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {chatResponse && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">{chatResponse}</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <textarea
          className="w-full h-20 p-2 mb-2 border rounded-md resize-none"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot
