import { promises as fs } from 'fs'
import crypto from 'crypto'
import path from 'path'

// Generate a secure random JWT secret key
function generateSecretKey() {
  return crypto.randomBytes(64).toString('hex') // secret
}

// Path to .env
const dotEnvPath = path.join(process.cwd(), '.env')

const updateEnvFile = async () => {
  try {
    // Check if .env exists, if not - create it
    try {
      const fileContent = await fs.readFile(dotEnvPath, 'utf8')
    } catch (err) {
      if (err.code !== 'ENOENT') throw err // Ignore "file not found" errors
    }

    // Generate a new JWT secret
    const JWT_SECRET = generateSecretKey()

    // Write the updated .env file
    await fs.writeFile(dotEnvPath, `JWT_SECRET=${JWT_SECRET}`)

    console.log('JWT secret key has been successfully written to .env')
  } catch (error) {
    console.error('Error processing .env:', error)
  }
}

updateEnvFile()
