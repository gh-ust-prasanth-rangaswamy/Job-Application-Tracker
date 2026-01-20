import ApplicationItem from "./ApplicationItem";

//function ApplicationList({ applications, refresh, search, statusFilter }) {
function ApplicationList({ applications, refresh }) {

    // const filteredApps = applications.filter(app => {
    //     const nameMatch = app.candidateName
    //         .toLowerCase()
    //         .includes(search.toLowerCase());
    //
    //     const statusMatch =
    //         statusFilter === "All" || app.status === statusFilter;
    //
    //     return nameMatch && statusMatch;
    // });

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Candidate</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th width="120">Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center text-muted">
                            No matching applications
                        </td>
                    </tr>
                ) : (
                    applications.map(app => (
                        <ApplicationItem
                            key={app.id}
                            application={app}
                            refresh={refresh}
                        />
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicationList;
