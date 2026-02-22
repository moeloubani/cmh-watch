"use client";
import { useState } from "react";

export function SubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("There was an error submitting your story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-green-800">Thank you</h3>
        <p className="mt-2 text-green-700">
          Your submission has been received. It will be reviewed before
          publishing. If you provided contact information, we may reach out for
          follow-up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="story"
          className="block text-sm font-medium text-gray-700"
        >
          Your experience *
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={8}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
          placeholder="Describe what happened. Include as much detail as you're comfortable sharing."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="incidentDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date(s) of incident
          </label>
          <input
            type="text"
            id="incidentDate"
            name="incidentDate"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
            placeholder="e.g., March 2025, or Jan-Feb 2025"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department / area of hospital
          </label>
          <select
            id="department"
            name="department"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
          >
            <option value="">Select if applicable</option>
            <option value="Emergency">Emergency Department</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Obstetrics">Obstetrics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Hospital Medicine">Hospital Medicine</option>
            <option value="Laboratory">Laboratory</option>
            <option value="Patient Relations">Patient Relations</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="staffInvolved"
          className="block text-sm font-medium text-gray-700"
        >
          Names of staff involved (optional, held privately)
        </label>
        <input
          type="text"
          id="staffInvolved"
          name="staffInvolved"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
          placeholder="These names will NOT be published without verification"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-gray-700">
          How would you like to be identified? *
        </legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="identityPreference"
              value="named"
              required
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Use my full name publicly
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="identityPreference"
              value="first-name"
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Use my first name only
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="identityPreference"
              value="anonymous-identified"
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Anonymous publicly, but I'll share my identity with CMH Watch for
              verification
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="identityPreference"
              value="anonymous"
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Fully anonymous</span>
          </label>
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your name (optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Email or phone for follow-up (optional)
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-navy focus:ring-1 focus:ring-navy"
          />
        </div>
      </div>

      <div>
        <label className="flex items-start">
          <input type="checkbox" name="consent" required className="mr-2 mt-1" />
          <span className="text-sm text-gray-700">
            I understand my submission will be reviewed before publishing. I
            consent to my story being published on CMH Watch according to my
            identity preference selected above. I confirm this account is
            truthful to the best of my knowledge.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy-light transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Your Story"}
      </button>
    </form>
  );
}
