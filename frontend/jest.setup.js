// Jest setup file to handle import.meta
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:8000/api'
      }
    }
  },
  writable: true
});

// Set NODE_ENV for tests
process.env.NODE_ENV = 'test';
process.env.VITE_API_URL = 'http://localhost:8000/api';
