import { useState } from 'react';

const employees = [
    { id: 1, name: 'Ravi Kumar', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Anjali Singh', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Karthik Das', image: 'https://randomuser.me/api/portraits/men/48.jpg' },
];

export const Assign = ({ onAssignmentSubmit }) => {
    const [assignRate, setAssignRate] = useState('0.00');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleAssign = (employee) => {
        setSelectedEmployee(employee);
        setDropdownOpen(false);
        console.log('Assigned to:', employee.name, 'at ₹', assignRate);
        if (onAssignmentSubmit) onAssignmentSubmit(assignRate, employee);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '700px',
            minHeight: '200px', // reduced height
            display: 'flex',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            background: '#fff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            {/* Left Image */}
            <div style={{ width: '200px', height: '160px', flexShrink: 0 }}>
                <img
                    src="https://preview.redd.it/what-precautions-should-i-take-before-buying-a-2nd-hand-v0-r5xqh8muipad1.jpeg?auto=webp&s=64dffaa36eb3b1e3c924d884d1f6ed8282865d1e"
                    alt="Product"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderBottomLeftRadius: '12px'
                    }}
                />
            </div>

            {/* Right Content */}
            <div style={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 10, color: '#1f2937' }}>
                        Professional Business Laptop
                    </div>

                    {/* Assign Rate */}
                    <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <label style={{
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            color: '#374151'
                        }}>
                            Assign Rate:
                        </label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '2px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            background: '#f9fafb'
                        }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>₹</span>
                            <input
                                type="number"
                                value={assignRate}
                                onChange={(e) => setAssignRate(e.target.value)}
                                min="0"
                                step="0.01"
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    width: '80px',
                                    marginLeft: '8px',
                                    fontWeight: 500
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{
                            backgroundColor: '#6bb38e',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        Allocate Employee
                    </button>

                    {dropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            width: '240px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            zIndex: 999
                        }}>
                            {employees.map(emp => (
                                <div
                                    key={emp.id}
                                    onClick={() => handleAssign(emp)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e5e7eb',
                                        backgroundColor: selectedEmployee?.id === emp.id ? '#f3f4f6' : 'white'
                                    }}
                                >
                                    <img
                                        src={emp.image}
                                        alt={emp.name}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            marginRight: '10px'
                                        }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#111827' }}>{emp.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};