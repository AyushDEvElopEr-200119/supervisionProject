import React from "react";
import { ArrowLeft, CalendarDays, ChevronDown, ImagePlus, Plus, Trash2, Upload } from "lucide-react";

const fields = [
  ["Product Code / SKU", "Enter product code", "text"],
  ["Product Name", "Enter product name", "text"],
  ["Product Type", "Select Type", "select"],
  ["Category", "Select Category", "select"],
  ["Sub Category", "Select Sub Category", "select"],
  ["Brand", "Select Brand", "select"],
  ["Unit", "Select Unit", "select"],
  ["HSN / SAC Code", "Enter HSN / SAC code", "text"],
  ["Barcode", "Enter barcode", "text"],
];

function Field({ label, placeholder, type }) {
  return (
    <label className="add-field">
      <span>{label}{["Product Code / SKU", "Product Name", "Category", "Unit"].includes(label) && <b>*</b>}</span>
      <div className={`add-input ${type === "select" ? "select-input" : ""}`}>
        <input placeholder={placeholder} />
        {type === "select" && <ChevronDown size={14} />}
      </div>
    </label>
  );
}

function AddSection({ number, title, children }) {
  return <section className="add-section"><h2>{number}. {title}</h2>{children}</section>;
}

export default function AddProductPage({ onBack }) {
  return (
    <section className="add-product-page">
      <div className="add-product-header">
        <div>
          <div className="breadcrumbs"><button onClick={onBack}>Home</button><span>/</span><button onClick={onBack}>Masters</button><span>/</span><span>Product Master</span><span>/</span><strong>Add Product</strong></div>
          <h1>Add Product</h1>
        </div>
        <button className="secondary-btn" onClick={onBack}><ArrowLeft size={14} /> Back to List</button>
      </div>

      <AddSection number="1" title="Basic Information">
        <div className="add-field-grid">{fields.map(([label, placeholder, type]) => <Field key={label} label={label} placeholder={placeholder} type={type} />)}</div>
        <div className="add-description-row">
          <label className="add-field"><span>Product Description</span><textarea placeholder="Enter product description" /></label>
          <Field label="Status" placeholder="Active" type="select" />
        </div>
      </AddSection>

      <AddSection number="2" title="Pricing & Tax">
        <div className="add-field-grid three-columns">
          {[["Purchase Price", "0.00"], ["Selling Price", "0.00"], ["MRP", "0.00"], ["Tax", "Select Tax"], ["Tax Percentage", "0.00 %"]].map(([label, placeholder]) => <Field key={label} label={label} placeholder={placeholder} type={label === "Tax" ? "select" : "text"} />)}
        </div>
      </AddSection>

      <AddSection number="3" title="Inventory Information">
        <div className="add-field-grid three-columns">
          <Field label="Reorder Level" placeholder="0.00" type="text" /><Field label="Opening Stock" placeholder="0.00" type="text" /><Field label="Warehouse" placeholder="Select Warehouse" type="select" />
          <label className="add-field"><span>Opening Stock Date</span><div className="add-input"><input placeholder="dd-mm-yyyy" /><CalendarDays size={14} /></div></label>
        </div>
      </AddSection>

      <AddSection number="4" title="Product Images">
        <div className="image-upload-row">
          <div className="upload-box"><ImagePlus size={24} /><strong>Drag & drop images here</strong><span>or</span><button className="primary-btn"><Upload size={13} /> Upload Images</button><small>Allowed formats: JPG, JPEG, PNG, WEBP</small></div>
          <div className="uploaded-images"><span>Uploaded Images</span><div className="image-placeholder-row">{["Primary", "", "", "", ""].map((name, index) => <div className="image-placeholder" key={index}><span>{index === 0 ? "Product" : "Image"}</span>{name && <small>{name}</small>}<button aria-label="Remove image"><Trash2 size={11} /></button></div>)}</div></div>
        </div>
      </AddSection>

      <AddSection number="5" title="Product Variants">
        <div className="variant-toolbar"><span>Has Variants?</span><label><input type="radio" name="variants" defaultChecked /> Yes</label><label><input type="radio" name="variants" /> No</label><button className="secondary-btn"><Plus size={13} /> Add Attribute</button></div>
        <div className="variant-table"><div className="variant-row variant-head"><span>Attribute</span><span>Values</span><span>Action</span></div>{["Color", "Size"].map((attribute) => <div className="variant-row" key={attribute}><div className="add-input select-input"><input value={attribute} readOnly /><ChevronDown size={13} /></div><div className="variant-values"><span>{attribute === "Color" ? "Red" : "S"}</span><span>{attribute === "Color" ? "Blue" : "M"}</span><span>{attribute === "Color" ? "Green" : "L"}</span></div><button className="remove-btn"><Trash2 size={13} /></button></div>)}</div>
      </AddSection>

      <div className="add-product-footer"><button className="secondary-btn" onClick={onBack}>Cancel</button><button className="primary-btn">Save & New</button><button className="save-btn">Save Product</button></div>
    </section>
  );
}
