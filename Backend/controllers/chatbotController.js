import axios from "axios";

/**
 * Chatbot Controller for Prescripto
 * Handles patient queries, specializations, and appointment guidance.
 */
export const chatbotReply = async (req, res) => {
  try {
    const { message, language } = req.body;

    // 1. Validation
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "System Configuration Error: API key is missing."
      });
    }

    if (!message || message.trim() === "") {
      return res.json({ reply: "Hello! Please type your health concern or question." });
    }

    // 2. Prepare the Request for Gemini 2.5 Flash
    // Note: v1beta is used for the latest 2026 features
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const systemPrompt = `
      You are the official AI Assistant for Prescripto, a modern Doctor Appointment & Healthcare Management System.
      
      Website Details:
      - Name: Prescripto
      - Purpose: Simplify healthcare by connecting Patients, Doctors, and Admins.
      - Features: Role-based dashboards, JWT security, easy booking, profile management.

      Strict Chatbot Rules:
      1. Role: AI Healthcare Assistant.
      2. Tone: Professional, empathetic, and helpful.
      3. Medical Safety: Do NOT diagnose diseases or prescribe medication.
      4. Specialization: If a user describes symptoms, suggest the correct doctor specialization (e.g., for heart pain, suggest a Cardiologist).
      5. Website Support: Explain how to book appointments, log in, or update profiles on Prescripto.
      6. Language: You MUST reply in ${language === "hi" ? "Hindi (हिन्दी)" : "English"}.
      7. Mandatory Disclaimer: Every response must end with: "Disclaimer: I am an AI, not a doctor. For emergencies, please call local medical services or visit a hospital immediately."
    `;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7, // Balanced creativity and accuracy
        maxOutputTokens: 800
      }
    };

    // 3. API Call
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" }
    });

    // 4. Response Parsing
    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("Invalid response format from Gemini API");
    }

    res.status(200).json({
      success: true,
      reply: aiResponse
    });

  } catch (error) {
    // 5. Advanced Error Logging
    console.error("Prescripto AI Error:", error.response?.data || error.message);

    const errorMessage = language === "hi" 
      ? "क्षमा करें, AI सेवा वर्तमान में अनुपलब्ध है। कृपया बाद में प्रयास करें।" 
      : "Sorry, the AI service is temporarily unavailable. Please try again later.";

    res.status(500).json({
      success: false,
      reply: errorMessage
    });
  }
};