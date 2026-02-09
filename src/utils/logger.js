// src/utils/logger.js - 一个简单的文件日志工具
const fs = require('fs');
const path = require('path');
import { app } from "electron";

let logPath;

// 获取日志文件路径
function getLogPath() {
  if (!logPath) {
    const userData = app.getPath('userData');
    logPath = path.join(userData, 'app.log');
  }
  return logPath;
}

// 写入日志
export function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFile(getLogPath(), logMessage, (err) => {
    if (err) {
      // 如果写文件失败，尝试输出到标准错误（可能显示在命令行）
      console.error('Failed to write log:', err);
    }
  });
}
