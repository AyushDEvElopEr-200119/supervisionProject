import React, { useState } from "react";
import { ChevronDown, X, ShieldAlert, Check } from "lucide-react";

function SelectField({ label, value, options, onChange, hint }) {
  return (
    <label className="content-modal-field">
      <span>{label}</span>
      <div className="content-modal-input">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={14} />
      </div>
      {hint && <small>{hint}</small>}
    </label>
  );
}

export default function CMSContentModal({ mode, item, onClose }) {
  const isCreate = mode === "create";
  const isPolicy = item.toLowerCase().includes("policy") || item.toLowerCase().includes("terms");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [template, setTemplate] = useState(
    isPolicy ? "Standard Legal Document" : "Standard Page"
  );
  const [status, setStatus] = useState("Draft");
  const [error, setError] = useState("");
  const [defaultStatus, setDefaultStatus] = useState("Draft");
  const [defaultTemplate, setDefaultTemplate] = useState(
    isPolicy ? "Standard Legal Document" : "Standard Page"
  );
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const entityName = isPolicy
    ? item
    : item === "Pages"
    ? "Page"
    : item.replace(/s$/, "");

  const submitCreate = (event) => {
    event.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setError(
        `${isPolicy ? "Policy document title" : "Title"} and URL slug are required.`
      );
      return;
    }
    onClose();
  };

  const templateOptions = isPolicy
    ? [
        "Standard Legal Document",
        "GDPR & CCPA Compliant Clause",
        "Global Consumer Terms",
        "Custom Policy Draft",
      ]
    : ["Standard Page", "Landing Page", "Blank Page", "Embedded Template"];

  return (
    <div
      className="content-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`content-modal ${isCreate ? "create-modal" : "config-modal"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="content-modal-title"
      >
        <div className="content-modal-heading">
          <div>
            <h2 id="content-modal-title">
              {isCreate
                ? `Create New ${entityName}`
                : `${item} Configuration`}
            </h2>
            <p>
              {isCreate
                ? isPolicy
                  ? `Publish or draft a legally binding ${item.toLowerCase()} revision`
                  : `Add a new ${entityName.toLowerCase()} to your workspace`
                : `Customize how ${item.toLowerCase()} are displayed and managed`}
            </p>
          </div>
          {isCreate && (
            <button
              className="content-modal-close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={19} />
            </button>
          )}
        </div>

        {isCreate ? (
          <form onSubmit={submitCreate}>
            <div className="content-modal-form">
              <label className="content-modal-field wide">
                <span>
                  {isPolicy ? "Policy Title & Version" : `${entityName} Title`} <b>*</b>
                </span>
                <div className="content-modal-input">
                  <input
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      setError("");
                    }}
                    placeholder={
                      isPolicy
                        ? `e.g. ${item} — 2026 Revision (v2.5)`
                        : `Enter ${entityName.toLowerCase()} title`
                    }
                  />
                </div>
              </label>

              <label className="content-modal-field wide">
                <span>
                  URL Slug <b>*</b>
                </span>
                <div className="content-modal-input slug-input">
                  <i>/</i>
                  <input
                    value={slug}
                    onChange={(event) => {
                      setSlug(event.target.value);
                      setError("");
                    }}
                    placeholder={
                      isPolicy
                        ? `policies/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
                        : "enter-url-slug"
                    }
                  />
                </div>
                <small>
                  {isPolicy
                    ? "Permanent canonical link for legal terms"
                    : "This will be the URL of your page"}
                </small>
              </label>

              <SelectField
                label={isPolicy ? "Policy Format Template" : "Template"}
                value={template}
                options={templateOptions}
                onChange={setTemplate}
              />

              <SelectField
                label={isPolicy ? "Enforcement Status" : "Status"}
                value={status}
                options={["Draft", "Published", "Scheduled"]}
                onChange={setStatus}
                hint="You can review and change the status later"
              />

              <label className="content-modal-field wide">
                <span>Meta Title (SEO)</span>
                <div className="content-modal-input">
                  <input placeholder="Enter meta title (optional)" />
                </div>
                <small>Shown in search engine results</small>
              </label>

              <label className="content-modal-field wide">
                <span>Meta Description (SEO)</span>
                <div className="content-modal-input">
                  <input placeholder="Enter meta description (optional)" />
                </div>
                <small>Brief summary description for legal compliance search</small>
              </label>
            </div>

            {error && (
              <p className="content-modal-error" role="alert">
                <ShieldAlert size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "6px" }} />
                {error}
              </p>
            )}

            <div className="content-modal-actions">
              <button type="button" className="secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                {isPolicy ? "Save Policy Document" : `Create ${entityName}`}
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="config-section-title">
              {isPolicy ? "Policy Default Preferences" : "Default Page Settings"}
            </h3>
            <div className="content-modal-form">
              <SelectField
                label={isPolicy ? "Default Enforcement Status" : "Default Status"}
                value={defaultStatus}
                options={["Draft", "Published", "Scheduled"]}
                onChange={setDefaultStatus}
                hint="Choose the default initial status for new entries"
              />
              <SelectField
                label={isPolicy ? "Legal Clause Template" : "Default Template"}
                value={defaultTemplate}
                options={templateOptions}
                onChange={setDefaultTemplate}
                hint="Choose standard preset template"
              />
            </div>

            <h3 className="config-section-title">Listing & Display Settings</h3>
            <div className="content-modal-form">
              <SelectField
                label="Items Per Page"
                value={itemsPerPage}
                options={["10", "25", "50"]}
                onChange={setItemsPerPage}
                hint="Set how many records to display per page"
              />
              <SelectField
                label="Default Sort By"
                value="Last Updated (Newest)"
                options={["Last Updated (Newest)", "Name (A-Z)", "Created Date"]}
                onChange={() => {}}
                hint="Default sorting order for this workspace"
              />
            </div>

            <div className="config-toggles">
              {[
                ["Show Item Status", "Display status badges in the records list"],
                ["Show Last Updated", "Display revision timestamp column"],
                ["Enable Live Search", "Allow instant filtering and searching in list"],
              ].map(([label, desc]) => (
                <label key={label}>
                  <span>
                    <strong>{label}</strong>
                    <small>{desc}</small>
                  </span>
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>

            <div className="content-modal-actions">
              <button className="secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button className="primary-btn" onClick={onClose}>
                Save Changes
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
