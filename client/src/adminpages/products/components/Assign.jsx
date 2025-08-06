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
            maxWidth: '600px',
            minHeight: '160px', // reduced height
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
      <div
        style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          position: 'relative', // needed for absolute dropdown positioning
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.2rem',
              marginBottom: 12,
              color: '#1e293b',
              letterSpacing: '-0.025em',
            }}
          >
            Professional Business Laptop
          </div>

          {/* Assign Rate */}
          <div
            style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <label
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#475569',
              }}
              htmlFor="assignRate"
            >
              Assign Rate:
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 12px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  fontWeight: 600,
                  marginRight: '4px',
                }}
              >
                ₹
              </span>
              <input
                id="assignRate"
                type="number"
                value={assignRate}
                onChange={(e) => setAssignRate(e.target.value)}
                min="0"
                step="0.01"
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '1rem',
                  width: '80px',
                  fontWeight: 600,
                  color: '#1e293b',
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
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3), 0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              letterSpacing: '0.025em',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow =
                '0 6px 16px rgba(16, 185, 129, 0.4), 0 4px 8px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow =
                '0 4px 12px rgba(16, 185, 129, 0.3), 0 2px 4px rgba(0,0,0,0.1)';
            }}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            Allocate Employee
          </button>

          {dropdownOpen && (
            <div
              role="listbox"
              tabIndex={-1}
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: 0,
                width: '260px',
                backgroundColor: '#fff',
                boxShadow: '0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)',
                borderRadius: '16px',
                overflow: 'hidden',
                zIndex: 999,
                border: '1px solid #e2e8f0',
              }}
            >
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => handleAssign(emp)}
                  role="option"
                  aria-selected={selectedEmployee?.id === emp.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAssign(emp);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor:
                      selectedEmployee?.id === emp.id ? '#f0fdf4' : 'white',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEmployee?.id !== emp.id) {
                      e.target.style.backgroundColor = '#f8fafc';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEmployee?.id !== emp.id) {
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <img
                    src={emp.image}
                    alt={emp.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      marginRight: '12px',
                      border: '2px solid #e2e8f0',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.95rem',
                      color: '#1e293b',
                      fontWeight: 500,
                    }}
                  >
                    {emp.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
