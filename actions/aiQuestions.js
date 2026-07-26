"use server";

import { GoogleGenAI } from "@google/genai";
import { currentUser } from "@clerk/nextjs/server";

const CATEGORY_PROMPTS = {
  FRONTEND: "React, JavaScript, CSS, performance, accessibility, browser APIs",
  BACKEND:
    "Node.js, REST APIs, databases, authentication, caching, scalability",
  FULLSTACK:
    "full-stack architecture, API design, state management, deployment",
  DSA: "data structures, algorithms, time complexity, problem solving",
  SYSTEM_DESIGN:
    "distributed systems, scalability, databases, microservices, caching",
  BEHAVIORAL:
    "leadership, teamwork, conflict resolution, career growth, STAR method",
  DEVOPS: "CI/CD, Docker, Kubernetes, cloud infrastructure, monitoring",
  MOBILE:
    "React Native, iOS/Android, performance, offline support, app lifecycle",
};

export const generateInterviewQuestions = async ({ category }) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!category || !CATEGORY_PROMPTS[category])
    throw new Error("Invalid category");

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `You are an expert technical interviewer. Generate 6 interview questions for a ${category} role covering: ${CATEGORY_PROMPTS[category]}.
For each question, provide a concise but complete answer (2-4 sentences) that an interviewer can use to evaluate responses.
Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation. Example format:
[{"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}]`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  const text = result.text.trim();
  const clean = text.replace(/^```json|^```|```$/gm, "").trim();
  const questions = JSON.parse(clean);

  return { questions };
};