import fs from 'fs';
import path from 'path';

/**
 * Logs debug information to a file for troubleshooting
 * @param type The type of log entry
 * @param data The data to log
 */
export function debugLog(type: string, data: any) {
  try {
    const logDir = path.join(process.cwd(), 'logs');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, 'debug.log');
    const timestamp = new Date().toISOString();
    
    // Format the data
    let dataStr = '';
    try {
      dataStr = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
    } catch (err) {
      dataStr = `[Error serializing data: ${err}]`;
    }
    
    // Create log entry
    const logEntry = `[${timestamp}] [${type}] ${dataStr}\n\n`;
    
    // Append to log file
    fs.appendFileSync(logFile, logEntry);
  } catch (err) {
    console.error('Failed to write debug log:', err);
  }
}
