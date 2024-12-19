import axios from "axios";

// Define interfaces for the API response structure
interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: GeminiPart[];
    };
  }[];
}

// Function to get AI response from Google API
export const getAIResponse = async (prompt: string): Promise<string> => {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCTkELgCcEFOjs2bLSSzeqgd3E3lNZ76QE`;

  try {
    // Make the API request
    const response = await axios.post<GeminiResponse>(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Debug: Log the response to understand the structure
    console.log("API Response:", JSON.stringify(response.data, null, 2));

    // Validate response structure
    if (!response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected API response structure:", response.data);
      throw new Error("Invalid response structure from AI API");
    }

    // Extract and return the AI's response
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error?.message ||
          "Failed to connect to Gemini API"
      );
    }

    // Handle other types of errors
    console.error("Error in getAIResponse:", error);
    throw new Error("Unexpected error while getting AI response");
  }
};

// Handler for chat requests
export const handleChatRequest = async (prompt: string) => {
  try {
    const response = await getAIResponse(prompt);
    return {
      success: true,
      response: response,
    };
  } catch (error) {
    console.error("Error in handleChatRequest:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
