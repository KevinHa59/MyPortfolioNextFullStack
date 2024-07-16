export const errorMapping = {
  P1000: {
    statusCode: 401,
    message: "Authentication failed due to invalid database credentials.",
  },
  P1001: {
    statusCode: 401,
    message: "Failed to reach the database server.",
  },
  P1002: {
    statusCode: 401,
    message: "Connection to the database server timed out.",
  },
  P1003: {
    statusCode: 404,
    message: "Database does not exist at the specified path.",
  },
  P1008: {
    statusCode: 408,
    message: "Operation timed out.",
  },
  P1009: {
    statusCode: 409,
    message: "Database already exists.",
  },
  P1010: {
    statusCode: 403,
    message: "Access denied for the database user.",
  },
  P1011: {
    statusCode: 500,
    message: "Error opening a TLS connection.",
  },
  P1012: {
    statusCode: 400,
    message: "Various errors related to schema validation.",
  },
  P1013: {
    statusCode: 400,
    message: "Invalid database connection string.",
  },
  P1014: {
    statusCode: 400,
    message: "Underlying data type does not exist for the model.",
  },
  P1015: {
    statusCode: 400,
    message:
      "Database schema features not supported for the current database version.",
  },
  P1016: {
    statusCode: 400,
    message: "Incorrect number of parameters in raw query.",
  },
  P1017: {
    statusCode: 500,
    message: "Server closed the connection.",
  },
  P2000: {
    statusCode: 400,
    message: "Column value exceeds maximum length.",
  },
  P2001: {
    statusCode: 404,
    message: "Record not found based on search criteria.",
  },
  P2002: {
    statusCode: 400,
    message: "Failed due to unique constraint violation.",
  },
  P2003: {
    statusCode: 400,
    message: "Foreign key constraint violation.",
  },
  P2004: {
    statusCode: 400,
    message: "Database constraint failed.",
  },
  P2005: {
    statusCode: 400,
    message: "Invalid value stored in the database.",
  },
  P2006: {
    statusCode: 400,
    message: "Provided value is not valid for the field.",
  },
  P2007: {
    statusCode: 400,
    message: "Data validation error.",
  },
  P2008: {
    statusCode: 400,
    message: "Failed to parse the query.",
  },
  P2009: {
    statusCode: 400,
    message: "Failed to validate the query.",
  },
  P2010: {
    statusCode: 400,
    message: "Raw query execution failed.",
  },
  P2011: {
    statusCode: 400,
    message: "Null constraint violation.",
  },
  P2012: {
    statusCode: 400,
    message: "Missing a required value.",
  },
  P2013: {
    statusCode: 400,
    message: "Missing required argument for field.",
  },
  P2014: {
    statusCode: 409,
    message: "Deletion would violate a required relation.",
  },
  P2015: {
    statusCode: 404,
    message: "Related record not found.",
  },
  P2016: {
    statusCode: 400,
    message: "Query interpretation error.",
  },
  P2017: {
    statusCode: 400,
    message: "Records for relation are not connected.",
  },
  P2018: {
    statusCode: 400,
    message: "Required connected records not found.",
  },
  P2019: {
    statusCode: 400,
    message: "Input error.",
  },
  P2020: {
    statusCode: 400,
    message: "Value out of range for the type.",
  },
  P2021: {
    statusCode: 404,
    message: "Table does not exist in the current database.",
  },
  P2022: {
    statusCode: 404,
    message: "Column does not exist in the current database.",
  },
  P2023: {
    statusCode: 400,
    message: "Inconsistent column data.",
  },
  P2024: {
    statusCode: 408,
    message: "Timed out fetching a new connection from the connection pool.",
  },
  P2025: {
    statusCode: 400,
    message: "Operation failed due to missing required records.",
  },
  P2026: {
    statusCode: 400,
    message: "Database provider does not support the query feature.",
  },
  P2027: {
    statusCode: 500,
    message: "Multiple errors occurred during query execution.",
  },
  P3000: {
    statusCode: 500,
    message: "Failed to create database.",
  },
  P3001: {
    statusCode: 400,
    message:
      "Migration possible with destructive changes and possible data loss.",
  },
  P3002: {
    statusCode: 500,
    message: "Migration was rolled back.",
  },
  P3003: {
    statusCode: 400,
    message:
      "Format of migrations changed, saved migrations are no longer valid.",
  },
  P3004: {
    statusCode: 400,
    message: "System database cannot be altered with Prisma migrate.",
  },
  P3005: {
    statusCode: 400,
    message:
      "Database schema is not empty, cannot baseline an existing production database.",
  },
  P3006: {
    statusCode: 500,
    message: "Migration failed to apply cleanly to the shadow database.",
  },
  P3007: {
    statusCode: 400,
    message: "Preview features are not allowed in schema engine.",
  },
  P3008: {
    statusCode: 400,
    message: "Migration is already recorded as applied in the database.",
  },
  P3009: {
    statusCode: 400,
    message: "Failed migrations found in the target database.",
  },
  P3010: {
    statusCode: 400,
    message: "Migration name exceeds maximum length.",
  },
  P3011: {
    statusCode: 400,
    message: "Migration cannot be rolled back because it was never applied.",
  },
  P3012: {
    statusCode: 400,
    message:
      "Migration cannot be rolled back because it is not in a failed state.",
  },
  P3013: {
    statusCode: 400,
    message: "Datasource provider arrays are no longer supported in migrate.",
  },
  P3014: {
    statusCode: 500,
    message: "Failed to create the shadow database.",
  },
  P3015: {
    statusCode: 404,
    message: "Could not find the migration file.",
  },
  P3016: {
    statusCode: 500,
    message: "Fallback method for database resets failed.",
  },
  P3017: {
    statusCode: 404,
    message: "Migration could not be found.",
  },
  P3018: {
    statusCode: 400,
    message: "Migration failed to apply, new migrations cannot be applied.",
  },
  P3019: {
    statusCode: 400,
    message:
      "Datasource provider specified in schema does not match the migration lock.",
  },
  P3020: {
    statusCode: 400,
    message: "Automatic creation of shadow databases is disabled on Azure SQL.",
  },
  P3021: {
    statusCode: 400,
    message: "Foreign keys cannot be created on this database.",
  },
  P3022: {
    statusCode: 400,
    message:
      "Direct execution of DDL SQL statements is disabled on this database.",
  },
  P4000: {
    statusCode: 500,
    message: "Introspection operation failed to produce a schema file.",
  },
  P4001: {
    statusCode: 404,
    message: "Introspected database was empty.",
  },
  P4002: {
    statusCode: 400,
    message: "Schema of introspected database was inconsistent.",
  },
  P6000: {
    statusCode: 500,
    message: "Generic server error occurred in Prisma Accelerate.",
  },
  P6100: {
    statusCode: 500,
    message: "Unexpected server error occurred in Prisma Pulse.",
  },
};
