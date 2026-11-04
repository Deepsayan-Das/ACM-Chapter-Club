import { NextResponse } from "next/server";
import { sendRegistrationEmail, RegistrationData } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, acmMemberNumber, studyYear, department } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      !acmMemberNumber ||
      typeof acmMemberNumber !== "string" ||
      !acmMemberNumber.trim()
    ) {
      return NextResponse.json(
        { error: "ACM Member Number is required." },
        { status: 400 }
      );
    }

    if (!studyYear || typeof studyYear !== "string" || !studyYear.trim()) {
      return NextResponse.json(
        { error: "Year of Study is required." },
        { status: 400 }
      );
    }

    if (!department || typeof department !== "string" || !department.trim()) {
      return NextResponse.json(
        { error: "Department is required." },
        { status: 400 }
      );
    }

    const registrationData: RegistrationData = {
      name: name.trim(),
      email: email.trim(),
      acmMemberNumber: acmMemberNumber.trim(),
      studyYear: studyYear.trim(),
      department: department.trim(),
    };

    await sendRegistrationEmail(registrationData);

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully! Notification email sent.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Registration email error:", error);

    // Provide friendly error message if env is missing
    const message =
      error?.message || "Failed to process registration. Please try again later.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}

