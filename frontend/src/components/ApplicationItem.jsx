import { deleteApplication, updateApplication } from "../services/applicationService";

function ApplicationItem({ application, refresh, onEdit}) {

    const handleStatusChange = async (e) => {
        const updated = { ...application, status: e.target.value };
        await updateApplication(application.id, updated);
        refresh();
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            await deleteApplication(application.id);
            refresh();
        }
    };

    const statusColor =
        application.status === "Applied"
            ? "warning"
            : application.status === "Interview"
                ? "success"
                : "danger";

    return (
        <tr>
            <td>{application.candidateName}</td>
            <td>{application.company}</td>
            <td>{application.role}</td>
            <td>{application.Description}</td>
            <td>
                <select
                    className={`form-select border-${statusColor}`}
                    value={application.status}
                    onChange={handleStatusChange}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </td>
            <td className="text-center" style={{ width: "140px" }}>
                <div className="d-flex justify-content-center gap-2">
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => onEdit(application)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(application.id)}
                    >
                        Delete
                    </button>
                </div>
            </td>

        </tr>
    );
}

export default ApplicationItem;
