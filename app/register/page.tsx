"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { studyyearOptions } from "@/data/studyYearOptions";
import { departmentList } from "@/data/departmentList";
import { Benefits } from "@/components/Benefits";

interface RegistrationFormData {
  name: string;
  email: string;
  acmMemberNumber: string;
  studyYear: string;
  department: string;
}

export default function RegisterPage() {
  const initialFormData: RegistrationFormData = {
    name: "",
    email: "",
    acmMemberNumber: "",
    studyYear: studyyearOptions[0]?.value || "UG1",
    department: departmentList[0]?.value || "IT",
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration.");
      }

      setFeedback({
        type: "success",
        message: "Registration submitted successfully! Confirmation email has been sent.",
      });

      // Reset form fields
      setFormData(initialFormData);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message:
          err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-8 py-10 bg-slate-50 grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white rounded-md p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 w-full text-center pb-6">
          Register
        </h2>

        {/* Status feedback message */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-md text-sm font-medium ${
              feedback.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          {/* Name Field */}
          <TextField
            title="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />

          {/* Email Field */}
          <TextField
            title="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            required
          />

          {/* ACM Member Number Field */}
          <TextField
            title="ACM Member Number"
            name="acmMemberNumber"
            value={formData.acmMemberNumber}
            onChange={handleChange}
            placeholder="e.g. 1234567"
            required
          />

          {/* Study Year Field */}
          <OptionField
            opdata={studyyearOptions}
            title="Year of Study"
            name="studyYear"
            value={formData.studyYear}
            onChange={handleChange}
          />

          {/* Department Field */}
          <OptionField
            opdata={departmentList}
            title="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>

        {/* ACM Member Subscription Link */}
        <a
          href="https://services.acm.org/public/qj/quickjoin/qj_control.cfm?promo=PWEBTOP&form_type=Student"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-sm underline text-blue-600 visited:text-purple-600 text-center hover:text-blue-800"
        >
          Register yourself as an ACM student member
        </a>
      </form>

      <Benefits />
    </section>
  );
}

/*
 Generic Text Field for Registration Form
*/
function TextField({
  title,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-900"
      >
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

/*
 Generic Option Field for Registration Form
*/
function OptionField({
  opdata,
  title,
  name,
  value,
  onChange,
}: {
  opdata: OptionData[];
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {opdata.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
