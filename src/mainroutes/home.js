// src/pages/MainLogicPage.js
import React, { useState } from 'react';

const labels = ['Username', 'Email', 'Address', 'Phone', 'Status'];
const dbKeys = ['user_id', 'email_id', 'addr_key', 'phone_num', 'status_code'];

// Dummy relationship images URLs or placeholders
const dummyImages = {
    Username: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=Username+DB+Relations',
    Email: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=Email+DB+Relations',
    Address: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=Address+DB+Relations',
    Phone: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=Phone+DB+Relations',
    Status: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=Status+DB+Relations',
    user_id: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=user_id+DB+Relations',
    email_id: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=email_id+DB+Relations',
    addr_key: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=addr_key+DB+Relations',
    phone_num: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=phone_num+DB+Relations',
    status_code: 'https://dummyimage.com/400x200/1e3a8a/ffffff&text=status_code+DB+Relations',
  };
  

// Dummy associated tables data
const dummyTables = {
  Username: [
    { table: 'Users', usage: 'Primary username field' },
    { table: 'Orders', usage: 'User identification' },
    { table: 'Profiles', usage: 'Linked user profile name' },
  ],
  Email: [
    { table: 'Users', usage: 'User email address' },
    { table: 'Subscriptions', usage: 'Email for newsletters' },
  ],
  Address: [
    { table: 'Users', usage: 'User mailing address' },
    { table: 'Shipments', usage: 'Shipping destination' },
  ],
  Phone: [
    { table: 'Users', usage: 'Contact phone number' },
    { table: 'SupportTickets', usage: 'Contact phone for support' },
  ],
  Status: [
    { table: 'Orders', usage: 'Order status code' },
    { table: 'Users', usage: 'Account status' },
  ],
  user_id: [
    { table: 'Users', usage: 'Primary key' },
    { table: 'Orders', usage: 'Foreign key to Users' },
    { table: 'Payments', usage: 'User payment info' },
  ],
  email_id: [
    { table: 'Users', usage: 'Email key' },
    { table: 'Marketing', usage: 'Email campaigns' },
  ],
  addr_key: [
    { table: 'Addresses', usage: 'Primary key' },
    { table: 'Orders', usage: 'Shipping address' },
  ],
  phone_num: [
    { table: 'Users', usage: 'Contact number' },
  ],
  status_code: [
    { table: 'Orders', usage: 'Status enumeration' },
  ],
};

const Home = () => {
  const [searchType, setSearchType] = useState('label'); // radio selection
  const [selectedValue, setSelectedValue] = useState(''); // dropdown selection
  const [activeTab, setActiveTab] = useState('dbImage'); // 'dbImage' or 'assocTables'

  // Options depend on searchType
  const options = searchType === 'label' ? labels : dbKeys;

  return (
    <div className="p-3">
      <h2>Field Mapper</h2>

      {/* Radio buttons */}
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchType" 
            id="byLabel"
            value="label"
            checked={searchType === 'label'}
            onChange={() => {
              setSearchType('label');
              setSelectedValue('');
            }}
          />
          <label className="form-check-label" htmlFor="byLabel">
            By Label Name
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchType"
            id="byKey"
            value="key"
            checked={searchType === 'key'}
            onChange={() => {
              setSearchType('key');
              setSelectedValue('');
            }}
          />
          <label className="form-check-label" htmlFor="byKey">
            By Key Name
          </label>
        </div>
      </div>

      {/* Dropdown */}
      <select
        className="form-select mb-3"
        aria-label="Select option"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="">Select {searchType === 'label' ? 'label name' : 'key name'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Tabs */}
      {selectedValue && (
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'dbImage' ? 'active' : ''}`}
                onClick={() => setActiveTab('dbImage')}
              >
                DB Image
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'assocTables' ? 'active' : ''}`}
                onClick={() => setActiveTab('assocTables')}
              >
                Associated Tables
              </button>
            </li>
          </ul>

          <div className="tab-content border p-3">
            {activeTab === 'dbImage' && (
              <div className="tab-pane active">
                <img
                  src={dummyImages[selectedValue]}
                  alt={`${selectedValue} DB Relations`}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )}

            {activeTab === 'assocTables' && (
              <div className="tab-pane active">
                <h5>Related Tables and Usage for {selectedValue}:</h5>
                <ul>
                  {dummyTables[selectedValue]?.map((item, index) => (
                    <li key={index}>
                      <strong>{item.table}</strong>: {item.usage}
                    </li>
                  )) || <p>No data available.</p>}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
