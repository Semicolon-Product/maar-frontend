import React from 'react'

const TeacherDetails = () => {
    return (
        <div>
            <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Teacher Information
                </h2>
                <div className="space-y-2 text-gray-700">
                    <p>
                        <strong>Name:</strong> Mr. Sekhar Ghosh
                    </p>
                    <p>
                        <strong>Email:</strong> sekhar.ghosh@school.edu
                    </p>
                    <p>
                        <strong>Department:</strong> Computer Science
                    </p>
                    <p>
                        <strong>Subjects:</strong> Data Structures, Web Development,
                        Algorithms
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TeacherDetails
