const tableNames = [
    "payments",
    "bookings",
    "vehicles",
    "vehicleSpecs",
    "fleet_management",
    "users",
    "customer_support_tickets",
    "authentication"
  ];
  
const fs = require('fs');
const path = require('path');

function createFolderAndFile(folderName, fileName, content) {
  const dirPath = path.join(__dirname, folderName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const filePath = path.join(dirPath, fileName);
  fs.writeFileSync(filePath, content);
}

function generateApiStructure(tableName, fields) {
  const capitalizedTableName = tableName.replace(/_([a-z])/g, g => g[1].toUpperCase());
  const interfaceName = `T${capitalizedTableName.charAt(0).toUpperCase() + capitalizedTableName.slice(1)}`;
  const apiName = `${capitalizedTableName}Api`;

  const apiStructure = `
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ${interfaceName} {
  ${fields.map(field => `${field.name}: ${field.type};`).join('\n  ')}
}

export const ${apiName} = createApi({
  reducerPath: '${apiName}',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/${tableName}' }),
  endpoints: (builder) => ({
    get${capitalizedTableName}: builder.query<${interfaceName}[], void>({
      query: () => ''
    }),
    add${capitalizedTableName}: builder.mutation<${interfaceName}, Partial<${interfaceName}>>({
      query: (item) => ({
        url: 'add',
        method: 'POST',
        body: item
      })
    }),
    update${capitalizedTableName}: builder.mutation<${interfaceName}, Partial<${interfaceName}>>({
      query: (item) => ({
        url: 'update',
        method: 'PUT',
        body: item
      })
    }),
    delete${capitalizedTableName}: builder.mutation<string, number>({
      query: (id) => ({
        url: \`delete/\${id.toString()}\`,
        method: 'DELETE'
      })
    })
  })
});
`;

  return apiStructure;
}

// Define table fields for each table (example, this should match your actual schema)
const tableFields = {
  locations_branches: [
    { name: "location_id", type: "number" },
    { name: "name", type: "string" },
    { name: "address", type: "string" },
    { name: "contact_phone", type: "string" }
  ],
  payments: [
    { name: "payment_id", type: "number" },
    { name: "booking_id", type: "number" },
    { name: "amount", type: "number" },
    { name: "payment_status", type: "string" },
    { name: "payment_date", type: "string" },
    { name: "payment_method", type: "string" },
    { name: "transaction_id", type: "string" }
  ],
    bookings: [
        { name: "booking_id", type: "number" },
        { name: "user_id", type: "number" },
        { name: "vehicle_id", type: "number" },
        { name: "location_id", type: "number" },
        { name: "booking_date", type: "string" },
        { name: "return_date", type: "string" },
        { name: "total_amount", type: "number" },
        { name: "booking_status", type: "string" }
    ],
    vehicles: [
        { name: "vehicle_id", type: "number" },
        { name: "vehicleSpec_id", type: "number" },
        { name: "rental_rate", type: "number" },
        { name: "availability", type: "boolean" }
    ],
    vehicleSpecs: [
        { name: "vehicleSpec_id", type: "number" },
        { name: "manufacturer", type: "string" },
        { name: "model", type: "string" },
        { name: "year", type: "number" },
        { name: "fuel_type", type: "string" },
        { name: "engine_capacity", type: "number" },
        { name: "transmission", type: "string" },
        { name: "seating_capacity", type: "number" },
        { name: "color", type: "string" },
        { name: "features", type: "string" }
    ],
    fleet_management: [
        { name: "fleet_id", type: "number" },
        { name: "vehicle_id", type: "number" },
        { name: "acquisition_date", type: "string" },
        { name: "depreciation_rate", type: "number" },
        { name: "current_value", type: "number" },
        { name: "maintenance_cost", type: "number" },
        { name: "status", type: "string" }
    ],
    users: [
        { name: "user_id", type: "number" },
        { name: "full_name", type: "string" },
        { name: "email", type: "string" },
        { name: "contact_phone", type: "string" },
        { name: "address", type: "string" }
    ],
    customer_support_tickets: [
        { name: "ticket_id", type: "number" },
        { name: "user_id", type: "number" },
        { name: "subject", type: "string" },
        { name: "description", type: "string" },
        { name: "status", type: "string" }
    ],
    authentication: [
        { name: "auth_id", type: "number" },
        { name: "user_id", type: "number" },
        { name: "username", type: "string" },
        { name: "role", type: "string" },
        { name: "password", type: "string" }
    ]
    
};

tableNames.forEach(tableName => {
  const fields = tableFields[tableName];
  if (fields) {
    const apiStructure = generateApiStructure(tableName, fields);
    createFolderAndFile('api', `${tableName}.ts`, apiStructure);
  }
});
