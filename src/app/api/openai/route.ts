import OpenAI from "openai";
import { NextResponse } from'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(request: Request) {
  // try {
    // Extract the `messages` from the body of the request
		const body = await request.json();
  	const { city } = body;
	
		// Ask OpenAI for a streaming chat completion given the prompt
		const response = await client.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: getMessages(city),
			temperature: 0.8,
			max_tokens: 64,
			top_p: 1
		});

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  // } catch (error) {
  //   return NextResponse.json(
  //     { success: false },
  //     { status: 400 }
  //   );
  // }
}

const getMessages = (cityToTravel: string): Array<OpenAIMessage> => {
	return [
		{
			"role": "system",
			"content": "You will be provided with a city, and your task is to generate a list of 10 places to visit in that city."
		},
		{
			"role": "user",
			"content": cityToTravel
		}
	]
}