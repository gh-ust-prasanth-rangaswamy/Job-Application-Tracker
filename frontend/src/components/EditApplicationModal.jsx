import { useState, useEffect } from "react";
import { updateApplication } from "../services/applicationService";

function EditApplicationModal({ application, closeModal, refresh }) {
    const [form, setForm] = useState({
        id: "",
        candidateName: "",
        company: "",
        role: "",
        Description: "",
        status: "Applied"
    });

    useEffect(() => {
        if (application) {
            setForm({
                id: application.id,
                candidateName: application.candidateName || "",
                company: application.company || "",
                role: application.role || "",
                Description: application.Description || "",
                status: application.status || "Applied"
            });
        }
    }, [application]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await updateApplication(form.id, form);
        refresh();
        closeModal();
    };

    return (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-4">

                    <h4>Edit Application</h4>

                    <input
                        className="form-control mb-2"
                        name="candidateName"
                        value={form.candidateName}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-2"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-2"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-2"
                        name="Description"
                        value={form.Description}
                        onChange={handleChange}
                    />

                    <select
                        className="form-select mb-3"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditApplicationModal;
