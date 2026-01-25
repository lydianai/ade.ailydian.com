-- ADE PostgreSQL Initialization Script
-- This script runs automatically when the container is first created

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant all privileges to ade_user
GRANT ALL PRIVILEGES ON DATABASE ade_db TO ade_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO ade_user;
ALTER SCHEMA public OWNER TO ade_user;

-- Ensure ade_user has superuser role (for Prisma)
ALTER USER ade_user WITH SUPERUSER;

-- Log successful initialization
DO $$
BEGIN
  RAISE NOTICE 'ADE Database initialized successfully';
  RAISE NOTICE 'User: ade_user (SUPERUSER)';
  RAISE NOTICE 'Database: ade_db';
  RAISE NOTICE 'Schema: public (owned by ade_user)';
END $$;
