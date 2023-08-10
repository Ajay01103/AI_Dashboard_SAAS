import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

import { IncreaseApiLimit, checkApiLimit } from "@/lib/ApiLimit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const opeai = new OpenAIApi(configuration);

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are Required", { status: 400})
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free Trial Expired", { status: 403 });
        }

        const response = await opeai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        if(!isPro) {
            await IncreaseApiLimit();
        }

        return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]" ,error);
        return new NextResponse("Internal error", { status: 500 });
    }
}