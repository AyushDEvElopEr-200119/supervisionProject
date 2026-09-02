import React, { useState } from "react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function ActionMenu({ itemName = "item", onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const run = (action) => { setOpen(false); action?.(); };
  return <div className="action-menu"><button className="action-trigger" onClick={() => setOpen((value) => !value)} aria-label={`Actions for ${itemName}`} aria-expanded={open} aria-haspopup="menu"><MoreHorizontal size={16} /></button>{open && <div className="action-popover" role="menu"><button onClick={() => run(onView)} role="menuitem"><Eye size={14} /> View</button><button onClick={() => run(onEdit)} role="menuitem"><Pencil size={14} /> Edit</button><button className="danger" onClick={() => run(onDelete)} role="menuitem"><Trash2 size={14} /> Delete</button></div>}</div>;
}
