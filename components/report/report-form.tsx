"use client";

import { useState, useCallback, useRef, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type ReportType = "bug" | "data" | "feature" | "tax";

interface FieldConfig {
  name: string;
  type: "text" | "textarea" | "select";
  required: boolean;
  options?: string[];
  placeholderKey?: string;
}

const FIELDS_BY_TYPE: Record<ReportType, FieldConfig[]> = {
  bug: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "expected", type: "textarea", required: true },
    { name: "url", type: "text", required: false },
    { name: "device", type: "select", required: false, options: ["Desktop", "Mobile", "Tablet"] },
    { name: "browser", type: "text", required: false },
  ],
  data: [
    { name: "title", type: "text", required: true },
    { name: "location", type: "text", required: true },
    { name: "current_value", type: "textarea", required: true },
    { name: "correct_value", type: "textarea", required: true },
    { name: "sources", type: "textarea", required: true },
  ],
  feature: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "motivation", type: "textarea", required: false },
  ],
  tax: [
    { name: "title", type: "text", required: true },
    { name: "tax_name", type: "text", required: true },
    { name: "description", type: "textarea", required: true, placeholderKey: "placeholder_tax_description" },
    { name: "sources", type: "textarea", required: true },
  ],
};

const REPORT_TYPES: ReportType[] = ["bug", "data", "feature", "tax"];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ReportForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations("report");
  const [reportType, setReportType] = useState<ReportType>("bug");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const fields = FIELDS_BY_TYPE[reportType];

  const handleTypeChange = useCallback((type: ReportType) => {
    setReportType(type);
    setFormData({});
    setStatus("idle");
  }, []);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isEmailValid = useCallback((value: string) => {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isEmailValid(email)) return;

      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (!webhookUrl) {
        setStatus("error");
        setErrorMessage(t("errorNoWebhook"));
        return;
      }

      const title = formData.title || "";
      const fieldsPayload: Record<string, string> = {};
      for (const field of fields) {
        if (field.name === "title") continue;
        const value = formData[field.name] || "";
        if (value) fieldsPayload[field.name] = value;
      }

      const payload = {
        type: reportType,
        title,
        email: email || undefined,
        fields: fieldsPayload,
      };

      setStatus("submitting");
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage(t("errorGeneric"));
      }
    },
    [reportType, formData, email, fields, isEmailValid, t],
  );

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-favorable/30 bg-favorable/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-favorable" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-mono text-sm text-favorable">{t("successTitle")}</p>
        <p className="text-xs text-gray-400">{t("successDesc")}</p>
        <button
          onClick={onClose}
          className="mt-2 rounded border border-gray-700 px-4 py-1.5 font-mono text-xs text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
        >
          {t("close")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="font-heading text-lg uppercase tracking-wider text-white">{t("title")}</h2>
        <p className="mt-1 text-xs text-gray-400">{t("subtitle")}</p>
      </div>

      {/* Type selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {REPORT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeChange(type)}
            className={`rounded border px-3 py-2 font-mono text-xs transition-colors ${
              reportType === type
                ? "border-info/50 bg-info/10 text-info"
                : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
            }`}
          >
            {t(`type_${type}`)}
          </button>
        ))}
      </div>

      {/* Type description — punchline */}
      <p className="text-xs italic text-gray-500">{t(`desc_${reportType}`)}</p>

      {/* Dynamic fields */}
      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <FieldInput
            key={`${reportType}-${field.name}`}
            field={field}
            value={formData[field.name] || ""}
            onChange={(v) => handleFieldChange(field.name, v)}
            label={t(`field_${field.name}`)}
            placeholder={t(field.placeholderKey ?? `placeholder_${field.name}`)}
            required={field.required}
            options={field.options?.map((o) => ({ value: o, label: t(`option_${o.toLowerCase()}`) }))}
          />
        ))}

        {/* Email (always shown) */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-xs text-gray-300">
            {t("field_email")}
            <span className="ml-1 text-gray-600">{t("optional")}</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder_email")}
            className="rounded border border-gray-700 bg-background px-3 py-2 font-mono text-sm text-white placeholder:text-gray-600 focus:border-info/50 focus:outline-none"
          />
          {email && !isEmailValid(email) && (
            <span className="text-xs text-danger">{t("invalidEmail")}</span>
          )}
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded border border-danger/30 bg-danger/10 px-3 py-2">
          <span className="text-xs text-danger">{errorMessage}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto font-mono text-xs text-danger underline hover:text-white"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-info/50 bg-info/10 px-4 py-2.5 font-mono text-sm text-info transition-colors hover:bg-info/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

interface FieldInputProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

function FieldInput({ field, value, onChange, label, placeholder, required, options }: FieldInputProps) {
  const t = useTranslations("report");
  const baseClass =
    "rounded border border-gray-700 bg-background px-3 py-2 font-mono text-sm text-white placeholder:text-gray-600 focus:border-info/50 focus:outline-none";

  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-xs text-gray-300">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
        {!required && <span className="ml-1 text-gray-600">{t("optional")}</span>}
      </label>
      {field.type === "text" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
      {field.type === "textarea" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`${baseClass} resize-y`}
        />
      )}
      {field.type === "select" && options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
