import React from "react";

function AdminPanel() {
    const numberOfUsers = 100;
    const numberOfEvents = 50; 
    const numberOfReservations = 200; // Rep

    return (
        <div className="bg-gray-200 p-4">
            <h2 className="text-2xl font-bold mb-4">System Analysis</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Number of Users</h3>
                    <p className="text-3xl font-bold">{numberOfUsers}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Number of Events</h3>
                    <p className="text-3xl font-bold">{numberOfEvents}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Number of Reservations</h3>
                    <p className="text-3xl font-bold">{numberOfReservations}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold mb-2">Number of Tickets</h3>
                    <p className="text-3xl font-bold">{numberOfReservations}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
