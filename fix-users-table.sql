-- Fix existing users table by adding proper defaults and constraints
ALTER TABLE users 
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- Update existing null values
UPDATE users SET 
  "createdAt" = CURRENT_TIMESTAMP WHERE "createdAt" IS NULL,
  "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;

-- Make columns NOT NULL after fixing null values
ALTER TABLE users 
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- Verify the fix
SELECT 
  column_name, 
  is_nullable, 
  column_default,
  data_type
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('createdAt', 'updatedAt');
